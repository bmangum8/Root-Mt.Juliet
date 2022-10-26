using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RootMJ.Repositories;
using System;
using RootMJ.Models;
using Microsoft.AspNetCore.Authorization;

namespace RootMJ.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TreeController : ControllerBase
    {
        private readonly ITreeRepository _treeRepository;

        public TreeController(ITreeRepository treeRepository)
        {
            _treeRepository = treeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_treeRepository.GetAllTrees());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tree = _treeRepository.GetTreeById(id);
            if (tree == null)
            {
                return NotFound();
            }
            return Ok(tree);
        }

        [HttpPost]
        public IActionResult Post(Tree tree)
        {
            _treeRepository.AddTree(tree);
            return CreatedAtAction("Get", new { id = tree.Id }, tree);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tree tree)
        {
            if (id != tree.Id)
            {
                return BadRequest();
            }

            _treeRepository.UpdateTree(tree);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _treeRepository.DeleteTree(id);
            return NoContent();
        }
    }
}
