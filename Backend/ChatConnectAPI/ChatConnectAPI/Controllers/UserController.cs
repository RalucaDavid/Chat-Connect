using ChatConnectAPI.Data;
using ChatConnectAPI.Domain.Entities;
using ChatConnectAPI.Dtos;
using ChatConnectAPI.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace ChatConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Entities _entities;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public UserController(Entities entities, PasswordHasher<User> passwordHasher, IConfiguration configuration)
        {
            _entities = entities;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        [HttpPost("register")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(UserDto dto)
        {
            var existingUser = _entities.Users.FirstOrDefault(u => u.username == dto.username || u.email == dto.email);

            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            var hashedPassword = _passwordHasher.HashPassword(null, dto.password);

            _entities.Users.Add(new User(
                dto.username,
                dto.email,
                hashedPassword
            ));
            _entities.SaveChanges();
            return CreatedAtAction(nameof(Find), "User", new { username = dto.username }, dto);
        }

        [HttpGet("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public IActionResult Login([FromQuery] string username, [FromQuery] string password)
        {
            var user = _entities.Users.FirstOrDefault(u => u.username == username);

            if (user == null || _passwordHasher.VerifyHashedPassword(user, user.password, password) != PasswordVerificationResult.Success)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        [HttpGet("{username}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [Authorize] 
        public ActionResult<UserRm> Find(string username)
        {
            var user = _entities.Users.FirstOrDefault(u => u.username == username);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var rm = new UserRm(
                user.username,
                user.email,
                user.password
            );
            return Ok(rm);
        }

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var securityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpireMinutes"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
