using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.TeacherRepositories;

internal class TeacherRepository : ITeacherRepository
{
    private readonly ApplicationDbContext _context;

    public TeacherRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<Teacher>> GetAllAsync()
    {
        var taskTeacherEntities = _context.Teachers
            .AsNoTracking()
            .OrderByDescending(_ => _.Id)
            .ToListAsync();

        return taskTeacherEntities;
    }

    public async Task<Teacher> InsertAsync(Teacher entity)
    {
        var createdTeacherEntity = _context.Teachers.Add(entity).Entity;
        await _context.SaveChangesAsync();

        return createdTeacherEntity;
    }

    public async Task<bool> UpdateAsync(Teacher entity)
    {
        var existingEntity = await _context.Teachers
            .FirstOrDefaultAsync(_ => _.Id == entity.Id);

        if (existingEntity is null)
        {
            return false;
        }

        _context.Entry(existingEntity).CurrentValues.SetValues(entity);

        var affectedEntities = await _context.SaveChangesAsync();
        return affectedEntities > 0;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        _context.Teachers.Remove(new Teacher { Id = id });
        var affectedEntities = await _context.SaveChangesAsync();
        return affectedEntities > 0;
    }

    public async Task<bool> UpdateTeacherWorkingDaysAsync(Guid teacherId, IEnumerable<DateTime> dates)
    {
        var teacherEntity = await _context.Teachers
            .Include(_ => _.WorkingDays)
            .FirstOrDefaultAsync(_ => _.Id == teacherId);

        if (teacherEntity is null)
        {
            return false;
        }

        teacherEntity.WorkingDays = dates
            .Select(_ => new WorkingDay { Date = _ })
            .ToList();

        var affectedRows = await _context.SaveChangesAsync();
        return affectedRows > 0;
    }

    public Task<List<Teacher>> GetAllByWorkingDayDateWithoutExamAsync(DateTime date)
    {
        var taskTeacherEntities = _context.Teachers
            .AsNoTracking()
            .Where(_ => _.WorkingDays
                .Any(day => day.Date == date && day.Exam == null))
            .ToListAsync();

        return taskTeacherEntities;
    }
}