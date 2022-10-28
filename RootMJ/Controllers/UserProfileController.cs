using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using RootMJ.Models;
using RootMJ.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace RootMJ.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;

        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUsers());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        
        [HttpGet("GetCurrentUser")]
        public IActionResult GetCurrentUser()
        {
            var currentProfile = GetCurrentUserProfile();
            return Ok(currentProfile);
        }
        

        [HttpGet("GetByFirebaseId/{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

    

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {

            //var currentUserProfile = GetCurrentUserProfile();
            //_userProfileRepository.Update(currentUserProfile);
            _userProfileRepository.Update(userProfile);
            return NoContent();
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Delete(id);
            return NoContent();
        }


        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
            userProfile.IsAdmin = false;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = userProfile.FirebaseUserId }, userProfile);
        }

        [HttpGet("IsUserAdmin")]
        public IActionResult IsUserAdmin()
        {
            var userProfile = GetCurrentUserProfile();

            return userProfile.IsAdmin == true ? Ok(true) : Ok(false);
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

        }

    }
}
