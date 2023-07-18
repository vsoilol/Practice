using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.SubjectRepositories;

internal class SubjectRepository : ISubjectRepository
{
    private readonly ApplicationDbContext _context;

    public SubjectRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<Subject>> GetAllAsync()
    {
        var taskSubjectEntities = _context.Subjects
            .AsNoTracking()
            .ToListAsync();

        return taskSubjectEntities;
    }

    public async Task<Subject> InsertAsync(Subject entity)
    {
        var createdSubjectEntity = _context.Subjects.Add(entity).Entity;
        await _context.SaveChangesAsync();

        return createdSubjectEntity;
    }

    public async Task<bool> UpdateAsync(Subject entity)
    {
        var existingEntity = await _context.Subjects
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
        _context.Subjects.Remove(new Subject { Id = id });
        var affectedEntities = await _context.SaveChangesAsync();
        return affectedEntities > 0;
    }
}