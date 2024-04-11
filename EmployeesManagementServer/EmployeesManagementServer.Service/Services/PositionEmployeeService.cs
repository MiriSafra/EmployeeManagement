using EmployeesManagementServer.Core.Models;
using EmployeesManagementServer.Core.Repositories;
using EmployeesManagementServer.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagementServer.Service.Services
{
    public class PositionEmployeeService : IPositionEmployeeService
    {
        private readonly IPositionEmployeeRepository _positionEmployeeRepository;
        private readonly IEmployeeRepository _employeeRepository;
        public PositionEmployeeService(IPositionEmployeeRepository positionEmployeeRepository, IEmployeeRepository employeeRepository)
        {
            _positionEmployeeRepository = positionEmployeeRepository;
            _employeeRepository = employeeRepository;
        }
        public async Task<PositionEmployee> AddPositionToEmployeeAsync(int employeeId, PositionEmployee positionEmployee)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(employeeId);
            if (positionEmployee.EntryDate < employee.EntryDate)
                return null;
            positionEmployee.EmployeeId = employeeId;
            return await _positionEmployeeRepository.AddPositionToEmployeeAsync(positionEmployee);
        }
        public async Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId)
        {
            return await _positionEmployeeRepository.DeletePositionOfEmployeeAsync(employeeId, positionId);
        }
        public async Task<IEnumerable<PositionEmployee>> GetEmployeePositionsAsync(int employeeId)
        {
            return await _positionEmployeeRepository.GetEmployeePositionsAsync(employeeId);
        }
        public async Task<PositionEmployee> UpdatePositionToEmployeeAsync(int employeeId, int positionId, PositionEmployee positionEmployee)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(employeeId);
            if (positionEmployee.EntryDate < employee.EntryDate)
                return null;
            return await _positionEmployeeRepository.UpdatePositionToEmployeeAsync(employeeId, positionId, positionEmployee);
        }
        public async Task<PositionEmployee> GetEmployeePositionsByIdAsync(int employeeId, int positionId)
        {
            return await _positionEmployeeRepository.GetEmployeePositionsByIdAsync(employeeId, positionId);
        }

    }
}