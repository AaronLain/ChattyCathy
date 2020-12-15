using System;
using System.Collections.Generic;
using System.Linq;
using ChattyCathy.Data;
using ChattyCathy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ChattyCathy.Controllers
{
    [Route("chatroom/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _repo;

        public UserController(UserRepository repo)
        {
            _repo = repo;
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

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            _repo.Add(user);

            return Created($"/chatroom/users/{user.UserId}", user);
        }

    }
}
