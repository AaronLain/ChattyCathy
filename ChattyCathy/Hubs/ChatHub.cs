using System;
using System.Threading.Tasks;
using ChattyCathy.Hubs.Clients;
using ChattyCathy.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChattyCathy.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
       
    }
}
