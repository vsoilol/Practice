using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.StudentRepositories;

internal class StudentRepository : IStudentRepository
{
    private readonly ApplicationDbContext _context;

    public StudentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<Student>> GetAllAsync()
    {
        var taskStudentEntities = _context.Students
            .AsNoTracking()
            .ToListAsync();

        return taskStudentEntities;
    }

    public async Task<Student> InsertAsync(Student entity)
    {
        var createdStudentEntity = _context.Students.Add(entity).Entity;
        await _context.SaveChangesAsync();

        return createdStudentEntity;
    }

    public async Task<bool> UpdateAsync(Student entity)
    {
        var existingEntity = await _context.Students
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
        _context.Students.Remove(new Student { Id = id });
        var affectedEntities = await _context.SaveChangesAsync();
        return affectedEntities > 0;
    }

    public Task<List<Student>> GetAllByExamIdAsync(Guid examId)
    {
        var taskStudentEntities = _context.Students
            .AsNoTracking()
            .Where(_ => _.ExamStudents
                .Any(examStudent => examStudent.ExamId == examId))
            .ToListAsync();

        return taskStudentEntities;
    }
}