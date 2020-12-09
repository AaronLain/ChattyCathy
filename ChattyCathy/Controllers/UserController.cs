using System;
using System.Collections.Generic;
using System.Linq;
using ChattyCathy.Data;
using ChattyCathy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ChattyCathy.Controllers
{
    [Route("users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _repo;

        public UserController(UserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var allCustomers = _repo.GetUsers();

            return Ok(allCustomers);
        }



        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var customer = _repo.GetUserById(id);

            if (customer == null) return NotFound("No user with that Id was found");

            return Ok(customer);
        }

    }
}
