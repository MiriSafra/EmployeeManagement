using EmployeesManagementServer.Core.Models;
using EmployeesManagementServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagementServer.Core.Services
{
    public interface IPositionService
    {
       

        Task<IEnumerable<Position>> GetPositionsAsync();
        Task<Position> AddPositionAsync(Position position);

    }
}
