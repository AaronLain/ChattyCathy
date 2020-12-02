using System.Threading.Tasks;
using ChattyCathy.Models;

namespace ChattyCathy.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}
