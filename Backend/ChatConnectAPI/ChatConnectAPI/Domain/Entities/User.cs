namespace ChatConnectAPI.Domain.Entities
{
    public record User(
        String username,
        String email,
        String password
        );
}
