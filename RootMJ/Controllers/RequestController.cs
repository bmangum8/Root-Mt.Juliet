using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RootMJ.Repositories;
using RootMJ.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace RootMJ.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestRepository _requestRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public RequestController(IRequestRepository requestRepository, IUserProfileRepository userProfileRepository)
        {
            _requestRepository = requestRepository;
            _userProfileRepository = userProfileRepository;
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

        [HttpGet("GetRequestByUserId")]
        public IActionResult GetRequestByUserId()
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.IsAdmin == false)
            {
                return Ok(_requestRepository.GetRequestByUserId(currentUserProfile.Id));
            }
            else
            {
                return Ok(_requestRepository.GetAllRequests());
            }
        }

        [HttpPost]
        public IActionResult Post(Request request)
        {
            request.DateCreated = DateTime.Now;
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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    
        
    }
}



