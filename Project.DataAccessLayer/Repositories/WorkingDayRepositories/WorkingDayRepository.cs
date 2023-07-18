using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.WorkingDayRepositories;

internal class WorkingDayRepository : IWorkingDayRepository
{
    private readonly ApplicationDbContext _context;

    public WorkingDayRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<WorkingDay>> GetAllByTeacherIdAsync(Guid teacherId)
    {
        var taskWorkingDateEntities = _context.WorkingDays
            .Where(_ => _.TeacherId == teacherId)
            .ToListAsync();

        return taskWorkingDateEntities;
    }

    public Task<WorkingDay?> GetByTeacherIdAndDateAsync(Guid teacherId, DateTime date)
    {
        var workingDateEntity = _context.WorkingDays
            .Where(_ => _.TeacherId == teacherId && _.Date == date)
            .FirstOrDefaultAsync();

        return workingDateEntity;
    }
}