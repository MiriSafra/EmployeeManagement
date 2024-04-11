using AutoMapper;
using EmployeesManagementServer.API.Models;
using EmployeesManagementServer.Core.DTOs;
using EmployeesManagementServer.Core.Models;
using EmployeesManagementServer.Core.Services;
using EmployeesManagementServer.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesManagementServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
    private readonly IEmployeeService _employeeService;
    private readonly IPositionEmployeeService _positionEmployeeService;
    private readonly IMapper _mapper;
    public EmployeesController(IEmployeeService employeeService, IPositionEmployeeService positionEmployeeService, IMapper mapper)
    {
        _employeeService = employeeService;
        _positionEmployeeService = positionEmployeeService;
        _mapper = mapper;

    }
    // GET: api/<EmployeesController>
    [HttpGet]
    public async Task<ActionResult> Get()
    {
        var employees = await _employeeService.GetEmployeesAsync();
        return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
    }

    // GET api/<EmployeesController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult> Get(int id)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee==null)
            {
                return BadRequest("employee not exist");
            }
        return Ok(_mapper.Map<EmployeeDto>(employee));
    }

    // POST api/<EmployeesController>
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
    {
        var newEmployee = await _employeeService.AddEmployeeAsync(_mapper.Map<Employee>(employee));
        return Ok(_mapper.Map<EmployeeDto>(newEmployee));
    }

    // PUT api/<EmployeesController>/5
    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
    {
        var updateEmployee = await _employeeService.UpdateEmployeeAsync(id, _mapper.Map<Employee>(employee));
        return Ok(_mapper.Map<EmployeeDto>(updateEmployee));
    }

    // DELETE api/<EmployeesController>/5
    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _employeeService.DeleteEmployeeAsync(id);
    }
    //position
    [HttpGet("{employeeId}/positions")]
    public async Task<ActionResult> GetEmployeePositions(int employeeId)
    {
        var positionsEmployee = await _positionEmployeeService.GetEmployeePositionsAsync(employeeId);
        if (positionsEmployee == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<IEnumerable<PositionEmployeeDto>>(positionsEmployee));
    }
    [HttpGet("{employeeId}/position/{positionId}")]
    public async Task<ActionResult> Get(int employeeId, int positionId)
    {
        var employeePosition = await _positionEmployeeService.GetEmployeePositionsByIdAsync(employeeId, positionId);
        return Ok(_mapper.Map<PositionEmployeeDto>(employeePosition));
    }

    // POST api/<EmployeesController>
    [HttpPost("{employeeId}/position")]

    public async Task<ActionResult<PositionEmployee>> AddPosition(int employeeId, [FromBody] PositionEmployeePostModel employeePosition)
    {
        var newEmployeePosition = await _positionEmployeeService.AddPositionToEmployeeAsync(employeeId, _mapper.Map<PositionEmployee>(employeePosition));
        if (newEmployeePosition == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<PositionEmployeeDto>(newEmployeePosition));
    }

    // PUT api/<EmployeesController>/5
    [HttpPut("{employeeId}/position/{positionId}")]
    public async Task<ActionResult> Put(int employeeId, int positionId, [FromBody] PositionEmployeePostModel PositionEmployee)
    {
        var updateEmployeePosition = await _positionEmployeeService.UpdatePositionToEmployeeAsync(employeeId, positionId, _mapper.Map<PositionEmployee>(PositionEmployee));
        if (updateEmployeePosition == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<PositionEmployeeDto>(updateEmployeePosition));
    }
    [HttpDelete("{employeeId}/position/{positionId}")]

    public async Task<IActionResult> DeletePosition(int employeeId, int positionId)
    {
        var result = await _positionEmployeeService.DeletePositionOfEmployeeAsync(employeeId, positionId);
        if (!result)
        {
            return NotFound();
        }
        return Ok(result);
    }
}
}
