using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.ExamRepositories;

internal class ExamRepository : IExamRepository
{
    private readonly ApplicationDbContext _context;

    public ExamRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<Exam>> GetAllAsync()
    {
        var taskExamEntities = _context.Exams
            .AsNoTracking()
            .Include(_ => _.TeacherWorkingDay.Teacher)
            .Include(_ => _.Subject)
            .OrderByDescending(_ => _.Id)
            .ToListAsync();

        return taskExamEntities;
    }

    public Task<Exam?> GetByIdAsync(Guid id)
    {
        return _context.Exams.AsNoTracking()
            .Include(_ => _.TeacherWorkingDay.Teacher)
            .Include(_ => _.Subject)
            .FirstOrDefaultAsync(_ => _.Id == id);
    }

    public async Task<Exam> InsertAsync(Exam entity)
    {
        var createdExamEntity = _context.Exams.Add(entity).Entity;
        await _context.SaveChangesAsync();

        return (await GetByIdAsync(createdExamEntity.Id))!;
    }

    public async Task<bool> UpdateWithStudentsAsync(Exam entity)
    {
        var existingEntity = await _context.Exams
            .Include(_ => _.ExamStudents)
            .FirstOrDefaultAsync(_ => _.Id == entity.Id);

        if (existingEntity is null)
        {
            return false;
        }

        _context.Entry(existingEntity).CurrentValues.SetValues(entity);
        existingEntity.ExamStudents = entity.ExamStudents;

        var affectedEntities = await _context.SaveChangesAsync();
        return affectedEntities > 0;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        _context.Exams.Remove(new Exam { Id = id });
        var affectedEntities = await _context.SaveChangesAsync();
        return affectedEntities > 0;
    }

    public Task<Exam?> GetByTeacherIdAndDateAsync(Guid teacherId, DateTime date)
    {
        return _context.Exams.AsNoTracking()
            .FirstOrDefaultAsync(_ => _.TeacherWorkingDay.TeacherId == teacherId
                                      && _.TeacherWorkingDay.Date == date);
    }
}