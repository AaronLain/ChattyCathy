using System.Threading.Tasks;
using ChattyCathy.Hubs.Clients;
using ChattyCathy.Hubs;
using ChattyCathy.Models;
using ChattyCathy.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChattyCathy.Controllers
{
    [ApiController]
    [Route("chatroom/messages")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        ChatMessageRepository _repo;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, ChatMessageRepository repo)
        {
            _chatHub = chatHub;

            _repo = repo;

        }

        [HttpGet]
        public IActionResult GetMessages()
        {
            var allMessages = _repo.GetMessages();

            return Ok(allMessages);
        }

        [HttpGet("{fBuid}")]
        public IActionResult GetMessagesByUserId(string fBuid)
        {
            var userMessages = _repo.GetMessageByUserId(fBuid);

            return Ok(userMessages);
        }


        [HttpPost]
        public async Task Post(ChatMessage message)
        {
            if(message.UserId != "1010010100")
            {
                message.Sentiment = _repo.SentimentScore(message.Content);
            }
            
            _repo.Add(message);

            await _chatHub.Clients.All.ReceiveMessage(message);

        }
    }
}
