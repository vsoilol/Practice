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
        entity.CreatedAt = DateTime.Now;
        var createdStudentEntity = _context.Students.Add(entity).Entity;
        await _context.SaveChangesAsync();

        return createdStudentEntity;
    }

    public async Task<bool> UpdateAsync(Student entity)
    {
        var existingEntity = await _context.Students
            .FirstOrDefaultAsync(_ => _.Id == entity.Id);

        if (existingEntity is null || !entity.ModifiedById.HasValue)
        {
            return false;
        }

        entity.CreatedById = existingEntity.CreatedById;
        entity.ModifiedAt = DateTime.Now;
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
}