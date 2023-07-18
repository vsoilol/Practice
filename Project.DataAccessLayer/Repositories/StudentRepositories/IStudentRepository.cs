using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.StudentRepositories;

public interface IStudentRepository
{
    Task<List<Student>> GetAllAsync();
    
    Task<Student> InsertAsync(Student entity);
    
    Task<bool> UpdateAsync(Student entity);

    Task<bool> DeleteAsync(Guid id);
    
    Task<List<Student>> GetAllByExamIdAsync(Guid examId);
}