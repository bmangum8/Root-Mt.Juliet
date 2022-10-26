using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RootMJ.Repositories;
using RootMJ.Models;

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

        [HttpPost]
        public IActionResult Post(Request request)
        {
            _requestRepository.AddRequest(request);
            return CreatedAtAction("Get", new { id = request.Id }, request);
        }
    }
}
