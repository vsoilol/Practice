using Project.Domain.DTOs;
using Project.Domain.Requests.Exam;

namespace Project.BusinessLayer.Services.ExamServices;

public interface IExamService
{
    Task<IReadOnlyCollection<ExamDto>> GetAllExamsAsync();
    
    Task<ExamDto> CreateExamAsync(CreateExamRequest request);
    
    Task<bool> UpdateExamAsync(UpdateExamRequest request);

    Task<bool> DeleteExamAsync(Guid id);
}