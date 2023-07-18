using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.SubjectRepositories;

public interface ISubjectRepository
{
    Task<List<Subject>> GetAllAsync();
    
    Task<Subject> InsertAsync(Subject entity);
    
    Task<bool> UpdateAsync(Subject entity);

    Task<bool> DeleteAsync(Guid id);
}