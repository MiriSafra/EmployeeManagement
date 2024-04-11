using AutoMapper;
using EmployeesManagementServer.API.Models;
using EmployeesManagementServer.Core.DTOs;
using EmployeesManagementServer.Core.Models;
using EmployeesManagementServer.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesManagementServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {    private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public PositionsController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }
        // GET: api/<PositionsController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var positions = await _positionService.GetPositionsAsync();
            return Ok(_mapper.Map<IEnumerable<PositionDto>>(positions));
        }

        //POST api/<PositionsController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel position)
        {
            var newPosition = await _positionService.AddPositionAsync(_mapper.Map<Position>(position));
            return Ok(_mapper.Map<PositionDto>(newPosition));
        }

    }
}