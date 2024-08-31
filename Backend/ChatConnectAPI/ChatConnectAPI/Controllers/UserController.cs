using ChatConnectAPI.Data;
using ChatConnectAPI.Domain.Entities;
using ChatConnectAPI.Dtos;
using ChatConnectAPI.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace ChatConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Entities _entities;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserController(Entities entities, PasswordHasher<User> passwordHasher)
        {
            _entities = entities;
            _passwordHasher = passwordHasher;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(UserDto dto)
        {
            var existingUser = _entities.Users.FirstOrDefault(u => u.username == dto.username || u.email == dto.email);

            if(existingUser != null)
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
            return CreatedAtAction(nameof(Find), "User", new { username = dto.username, password = dto.password }, dto);
        }

        [HttpGet("{username}/{password}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<UserRm> Find(String username, String password)
        {
            var user = _entities.Users.FirstOrDefault(u => u.username == username);

            if(user == null || _passwordHasher.VerifyHashedPassword(user, user.password, password) != PasswordVerificationResult.Success)
            {
                return NotFound("Invalid username, email, or password.");
            }

            var rm = new UserRm(
                user.username,
                user.email,
                user.password
                );
            return Ok(rm);
        }
    }
}
