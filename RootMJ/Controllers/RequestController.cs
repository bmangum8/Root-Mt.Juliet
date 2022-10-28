using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RootMJ.Repositories;
using RootMJ.Models;
using System;

namespace RootMJ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestRepository _requestRepository;
        public RequestController(IRequestRepository requestRepository)
        {
            _requestRepository = requestRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_requestRepository.GetAllRequests());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var request = _requestRepository.GetRequestById(id);
            if (request == null)
            {
                return NotFound();
            }
            return Ok(request);
        }

        [HttpPost]
        public IActionResult Post(Request request)
        {
            request.DateCreated = DateTime.Now;
            //for now--fix later
           request.DateCompleted = null;

            _requestRepository.AddRequest(request);
            return CreatedAtAction("Get", new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Request request)
        {

            _requestRepository.UpdateRequest(request);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _requestRepository.DeleteRequest(id);
            return NoContent();
        }

    }
}
