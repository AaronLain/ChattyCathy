using System;
using System.Web;
using ChattyCathy.Hubs.Clients;
using Microsoft.AspNetCore.SignalR;

namespace ChattyCathy.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
