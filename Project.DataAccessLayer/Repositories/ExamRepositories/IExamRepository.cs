using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.ExamRepositories;

public interface IExamRepository
{
    Task<List<Exam>> GetAllAsync();
    
    Task<Exam?> GetByIdAsync(Guid id);
    
    Task<Exam> InsertAsync(Exam entity);
    
    Task<bool> UpdateWithStudentsAsync(Exam entity);

    Task<bool> DeleteAsync(Guid id);
    
    Task<Exam?> GetByTeacherIdAndDateAsync(Guid teacherId, DateTime date);
}