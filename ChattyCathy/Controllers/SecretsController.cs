using System;
using ChattyCathy.Data;
using ChattyCathy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ChattyCathy.Controllers
{
    [Route("chatroom/secrets")]
    [ApiController]
    public class SecretsController : ControllerBase
    {
        SecretsRepository _repo;

        public SecretsController(SecretsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var allSecrets = _repo.GetSecrets();

            return Ok(allSecrets);
        }



        [HttpGet("{id}")]
        public IActionResult GetSecretById(int id)
        {
            var secret = _repo.GetSecretById(id);

            if (secret == null) return NotFound("No user with that Id was found");

            return Ok(secret);
        }

    }
}
