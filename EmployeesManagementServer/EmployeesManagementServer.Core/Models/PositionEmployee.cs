using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Emit;

namespace EmployeesManagementServer.Core.Models
{
    public class PositionEmployee
    {
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
        public bool StatusActive { get; set; }
        public PositionEmployee()
        {
            StatusActive = true;
        }
    }
  
}
