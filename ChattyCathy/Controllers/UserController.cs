using ChattyCathy.Data;
using ChattyCathy.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;



namespace ChattyCathy.Controllers
{
    [Route("chatroom/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _repo;

        ChatMessageRepository _mRepo;

        public UserController(UserRepository repo, ChatMessageRepository mRepo)
        {
            _repo = repo;
            _mRepo = mRepo;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var allUsers = _repo.GetUsers();

            return Ok(allUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _repo.GetUserById(id);

            if (user == null) return NotFound("No user with that Id was found");

            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {

            var updatedUser = _repo.Update(id, user);

            return Ok(updatedUser);
        }

        [HttpPut("user/{id}")]
        public IActionResult UpdateUserSentiment(int id, float sentiment)
        {
            var user = _repo.GetUserById(id);

            var messages = _mRepo.GetMessageByUserId(user.FBuid);

            bool isEmpty = !messages.Any();
            if (isEmpty)
            {
                var updatedSentiment = 0;

                var updatedUser = _repo.UpdateSentiment(id, updatedSentiment);

                return Ok(updatedUser);

            }
            else
            {
                var updatedSentiment = _repo.GetUserSentimentScoreByUserId(user.FBuid);

                var updatedUser = _repo.UpdateSentiment(id, updatedSentiment);

                return Ok(updatedUser);
            }
            
            
        }

        [HttpGet("user/{fBuid}")]
        public IActionResult GetUserSentimentByFBuid(string fBuid)
        {
            var user = _repo.GetUserByFBuid(fBuid);

            if (user == null) return NotFound("No user with that Id was found");

            return Ok(user.Sentiment);

        }


        [HttpPost]
        public IActionResult CreateUser(User user)
        {

            _repo.Add(user);

            return Created($"/chatroom/users/{user.UserId}", user);
        }

    }
}
