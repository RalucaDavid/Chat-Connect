using System.ComponentModel.DataAnnotations;

namespace ChatConnectAPI.Dtos
{
    public record UserDto(
        [Required][MinLength(2)][MaxLength(35)] String username,
        [Required][EmailAddress][StringLength(100, MinimumLength = 3)] String email,
        [Required][StringLength(100, MinimumLength = 3)] String password
        );
}
