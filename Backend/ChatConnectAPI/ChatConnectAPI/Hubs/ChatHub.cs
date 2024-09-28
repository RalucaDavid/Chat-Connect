using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatConnectAPI.Hubs
{
    public class ChatHub : Hub
    {
        private static List<string> connectedUsers = new List<string>();
        private static Dictionary<string, string> pairedUsers = new Dictionary<string, string>();
        private Dictionary<string, string> usernamesList = new Dictionary<string, string>();

        public async Task Connect(string username)
        {
            usernamesList[Context.ConnectionId] = username;

            connectedUsers.Add(Context.ConnectionId);

            if (connectedUsers.Count >= 2)
            {
                string user1 = connectedUsers[0];
                string user2 = connectedUsers[1];

                string username1 = usernamesList[user1];
                string username2 = usernamesList[user2];

                pairedUsers.Add(user1, user2);
                pairedUsers.Add(user2, user1);

                await Clients.Client(user1).SendAsync("PairFound", username2);
                await Clients.Client(user2).SendAsync("PairFound", username1);

                connectedUsers.RemoveAt(0);
                connectedUsers.RemoveAt(0);
            }
            else
            {
                await Clients.Client(Context.ConnectionId).SendAsync("WaitingForPair");
            }
        }

        public async Task Disconnect()
        {
            var connectionId = Context.ConnectionId;

            if (pairedUsers.ContainsKey(connectionId))
            {
                var pairConnectionId = pairedUsers[connectionId];

                await Clients.Client(pairConnectionId).SendAsync("Disconnected", connectionId);
                await Clients.Client(connectionId).SendAsync("Disconnected", pairConnectionId);

                pairedUsers.Remove(connectionId);
                pairedUsers.Remove(pairConnectionId);

                if (!connectedUsers.Contains(connectionId))
                {
                    connectedUsers.Add(connectionId);
                }

                if (!connectedUsers.Contains(pairConnectionId))
                {
                    connectedUsers.Add(pairConnectionId);
                }
            }

        }

        public async Task SendMessage(string username, string message)
        {
            if (pairedUsers.ContainsKey(Context.ConnectionId))
            {
                string otherUser = pairedUsers[Context.ConnectionId];
                await Clients.Client(otherUser).SendAsync("ReceiveMessage", username, message);
            }
        }
    }

}
