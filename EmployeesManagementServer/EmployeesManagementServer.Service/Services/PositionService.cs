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
    public class PositionService:IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        public PositionService(IPositionRepository positionRepository) 
        { 
            _positionRepository=positionRepository;

        }
        public async Task<Position> AddPositionAsync(Position position)
        {
            return await _positionRepository.AddEmployeeAsync(position);
        }
        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _positionRepository.GetPositionsAsync();
        }
    }
}
