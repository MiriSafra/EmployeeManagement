using EmployeesManagementServer.Core.Models;
using EmployeesManagementServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EmployeesManagementServer.Data.Repositories
{
    public class PositionEmployeeRepository : IPositionEmployeeRepository
    {
        private readonly DataContext _context;
        public PositionEmployeeRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<PositionEmployee> AddPositionToEmployeeAsync(PositionEmployee positionEmployee)
        {
            // בדיקה האם התפקיד כבר קיים בטבלה והשדה IsActive הוא false
            var existingPosition = await _context.PositionsEmployee
                .FirstOrDefaultAsync(ep => ep.EmployeeId == positionEmployee.EmployeeId
                                          && ep.PositionId == positionEmployee.PositionId
                                          && ep.StatusActive == false);

            if (existingPosition != null)
            {
                // אם התפקיד כבר קיים והשדה IsActive הוא false, נשנה אותו לtrue
                existingPosition.StatusActive = true;
                var update = await UpdatePositionToEmployeeAsync(existingPosition.EmployeeId, existingPosition.PositionId, positionEmployee);
                await _context.SaveChangesAsync();
                return update;
            }

            // אם התפקיד אינו קיים בטבלה או שהוא כבר פעיל, נוסיף אותו בצורה רגילה
            await _context.PositionsEmployee.AddAsync(positionEmployee);
            await _context.SaveChangesAsync();

            return positionEmployee;

        }
        public async Task<PositionEmployee> UpdatePositionToEmployeeAsync(int empoyeeId, int positionId, PositionEmployee positionEmployee)
        {
            var position = await _context.PositionsEmployee.FirstOrDefaultAsync(e => e.PositionId == positionId && e.EmployeeId == empoyeeId);
            if (position == null)
            {
                return null;
            }
            position.IsManagement = positionEmployee.IsManagement;
            position.EntryDate = positionEmployee.EntryDate;
            await _context.SaveChangesAsync();
            return position;
        }

        public async Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId)
        {
            var positionEmployee = await _context.PositionsEmployee.FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.PositionId == positionId);

            if (positionEmployee != null)
            {

               _context.PositionsEmployee.Remove(positionEmployee);
              // positionEmployee.StatusActive = false;
              //  positionEmployee.delet
                 await _context.SaveChangesAsync();
                return true; // המחיקה והעדכון בוצעו בהצלחה
            }

            return false; // העובד לא נמצא במסד הנתונים
        }
        public async Task<IEnumerable<PositionEmployee>> GetEmployeePositionsAsync(int employeeId)
        {
            return await _context.PositionsEmployee.Where(e => e.EmployeeId == employeeId && e.StatusActive).Where(ep => ep.StatusActive).Include(ep => ep.Position).ToListAsync();
        }

        public async Task<PositionEmployee> GetEmployeePositionsByIdAsync(int employeeId, int positionId)
        {
            return await _context.PositionsEmployee.FirstOrDefaultAsync(emp => emp.EmployeeId == employeeId && emp.PositionId == positionId);

        }

    }
}