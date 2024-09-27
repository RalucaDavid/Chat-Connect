using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatConnectAPI.Hubs
{
    public class ChatHub : Hub
    {
        private static List<string> connectedUsers = new List<string>();
        private static Dictionary<string, string> pairedUsers = new Dictionary<string, string>();

        public override Task OnConnectedAsync()
        {
            connectedUsers.Add(Context.ConnectionId);
            if (connectedUsers.Count >= 2)
            {
                string user1 = connectedUsers[0];
                string user2 = connectedUsers[1];

                pairedUsers.Add(user1, user2);
                pairedUsers.Add(user2, user1);

                Clients.Client(user1).SendAsync("Paired", "You are now chatting with another user.");
                Clients.Client(user2).SendAsync("Paired", "You are now chatting with another user.");

                connectedUsers.RemoveAt(0);
                connectedUsers.RemoveAt(0);
            }

            return base.OnConnectedAsync();
        }

        public async Task SendMessage(string username, string message)
        {
            if (pairedUsers.ContainsKey(Context.ConnectionId))
            {
                string otherUser = pairedUsers[Context.ConnectionId];
                await Clients.Client(otherUser).SendAsync("ReceiveMessage", username, message);
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            connectedUsers.Remove(Context.ConnectionId);
            pairedUsers.Remove(Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }
    }

}
