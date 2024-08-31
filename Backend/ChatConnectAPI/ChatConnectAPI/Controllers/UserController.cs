using ChatConnectAPI.Data;
using ChatConnectAPI.Domain.Entities;
using ChatConnectAPI.Dtos;
using ChatConnectAPI.ReadModels;
using Microsoft.AspNetCore.Mvc;

namespace ChatConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Entities _entities;

        public UserController(Entities entities)
        {
            _entities = entities;
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
                return BadRequest();
            }

            _entities.Users.Add(new User(
                dto.username,
                dto.email,
                dto.password
                ));
            _entities.SaveChanges();
            return CreatedAtAction(nameof(Find), "User", new { username = dto.username, email = dto.email, password = dto.password }, dto);
        }

        [HttpGet("{username}/{email}/{password}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<UserRm> Find(String username, String email, String password)
        {
            var user = _entities.Users.FirstOrDefault(u =>
                            u.username == username &&
                            u.email == email &&
                            u.password == password);

            if(user == null)
            {
                return NotFound();
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
