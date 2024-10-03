using ChatConnectAPI.Domain.Entities;
using ChatConnectAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ChatConnectAPI.Hubs
{
    public class ChatHub : Hub
    {
        private static List<string> waitingUsers = new List<string>();
        private static Dictionary<string, string> pairedUsers = new Dictionary<string, string>();
        private static Dictionary<string, string> usernamesList = new Dictionary<string, string>();

        private RandomIndex randomIndex = new RandomIndex();

        public async Task Connect(string username)
        {
            usernamesList[Context.ConnectionId] = username;
            waitingUsers.Add(Context.ConnectionId);

            await Clients.Caller.SendAsync("WaitingForPair");
            await SearchForPair();
        }

        public async Task SearchForPair()
        {
            if (waitingUsers.Count >= 2 && !pairedUsers.ContainsKey(Context.ConnectionId))
            {
                int indexUser1, indexUser2;
                do
                {
                    indexUser1 = randomIndex.GetRandomIndex(waitingUsers.Count());
                    indexUser2 = randomIndex.GetRandomIndex(waitingUsers.Count());
                } 
                while (indexUser1 == indexUser2);

                string user1 = waitingUsers[indexUser1];
                string user2 = waitingUsers[indexUser2];

                pairedUsers.Add(user1, user2);
                pairedUsers.Add(user2, user1);

                await Clients.Client(user1).SendAsync("Paired", usernamesList[user2]);
                await Clients.Client(user2).SendAsync("Paired", usernamesList[user1]);

                waitingUsers.RemoveAt(Math.Max(indexUser1, indexUser2));
                waitingUsers.RemoveAt(Math.Min(indexUser1, indexUser2));
            }
            else
            {
                await Clients.Caller.SendAsync("WaitingForPair");
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

        public async Task Disconnect()
        {
            if (pairedUsers.ContainsKey(Context.ConnectionId))
            {
                string otherUser = pairedUsers[Context.ConnectionId];

                pairedUsers.Remove(Context.ConnectionId);
                pairedUsers.Remove(otherUser);

                await Clients.Client(otherUser).SendAsync("WaitingForPair");
                await Clients.Caller.SendAsync("WaitingForPair");

                waitingUsers.Add(otherUser);
                waitingUsers.Add(Context.ConnectionId);

                await SearchForPair();
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            waitingUsers.Remove(Context.ConnectionId);
            usernamesList.Remove(Context.ConnectionId);

            if (pairedUsers.ContainsKey(Context.ConnectionId))
            {
                string otherUser = pairedUsers[Context.ConnectionId];
                pairedUsers.Remove(otherUser);
                pairedUsers.Remove(Context.ConnectionId);

                waitingUsers.Add(otherUser);
                await Clients.Client(otherUser).SendAsync("WaitingForPair");

                await SearchForPair();
            }

            await base.OnDisconnectedAsync(exception);
        }
    }

}
