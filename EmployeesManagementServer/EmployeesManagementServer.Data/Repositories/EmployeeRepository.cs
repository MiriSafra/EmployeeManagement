using EmployeesManagementServer.Core.Models;
using EmployeesManagementServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagementServer.Data.Repositories
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        public async Task<bool> DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);

            if (employee != null)
            {
                employee.StatusActive = false;
                await _context.SaveChangesAsync();
                return true; // המחיקה והעדכון בוצעו בהצלחה
            }

            return false; // העובד לא נמצא במסד הנתונים
        }
        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.FirstOrDefaultAsync(emp => emp.EmployeeId == id);
        
               
        }
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.Where(e=>e.StatusActive==true).ToListAsync();
        }
        public async Task<Employee> UpdateEmployeeAsync(int id, Employee updatedEmployee)
        {
            // מציאת העובד לפי ה־id
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == id);
            if (employee == null)
            {
                return null;
            }
            employee.FirstName = updatedEmployee.FirstName;
            employee.LastName = updatedEmployee.LastName;
            employee.Identity = updatedEmployee.Identity;
            employee.Gender = updatedEmployee.Gender;
            employee.BirthDate = updatedEmployee.BirthDate;
            employee.EntryDate = updatedEmployee.EntryDate;

            await _context.SaveChangesAsync();

            return employee;
        }
       
    }

}
