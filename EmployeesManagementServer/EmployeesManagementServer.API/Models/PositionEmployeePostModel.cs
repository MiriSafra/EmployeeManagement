using EmployeesManagementServer.Core.DTOs;

namespace EmployeesManagementServer.API.Models
{
    public class PositionEmployeePostModel
    {
        public int PositionId { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }  
    }
}
