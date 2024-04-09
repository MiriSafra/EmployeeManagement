using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagementServer.Core.DTOs
{
    public class PositionEmployeeDto
    {
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public PositionDto Position { get; set; }

        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
    }
}
