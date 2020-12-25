using ChattyCathy.Data;
using ChattyCathy.Models;
using Microsoft.AspNetCore.Mvc;


namespace ChattyCathy.Controllers
{
    [Route("chatroom/burns")]
    [ApiController]
    public class SickBurnController : ControllerBase
    {
        SickBurnRepository _repo;

        public SickBurnController(SickBurnRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetSickBurns()
        {
            var allSickBurns = _repo.GetSickBurns();

            return Ok(allSickBurns);
        }

        [HttpGet("{id}")]
        public IActionResult GetSickBurnContentById(int id)
        {
            var content = _repo.GetSickBurnContentById(id);

            if (content == null) return NotFound("No burn with that Id was found");

            return Ok(content);
        }
    }
}
