using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChattyCathy.Hubs.Clients;
using Microsoft.AspNetCore.SignalR;

namespace ChattyCathy.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
    }
}
