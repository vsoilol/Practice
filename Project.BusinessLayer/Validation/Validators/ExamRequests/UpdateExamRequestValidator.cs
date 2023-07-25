using Project.BusinessLayer.Validation.Models;
using Project.DataAccessLayer.Repositories.ExamRepositories;
using Project.Domain.Requests.Exam;

namespace Project.BusinessLayer.Validation.Validators.ExamRequests;

public class UpdateExamRequestValidator : IValidator<UpdateExamRequest>
{
    private readonly IExamRepository _examRepository;

    public UpdateExamRequestValidator(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<ValidationResult> IsInstanceValidAsync(UpdateExamRequest instance)
    {
        var doesAnotherExamNotExist = await DoesAnotherExamWithTeacherIdAndDateNotExist(instance);
        var areStudentIdsUnique = AreStudentIdsUnique(instance.StudentIds);

        if (doesAnotherExamNotExist && areStudentIdsUnique)
        {
            return new ValidationResult { IsValid = true };
        }

        var result = new ValidationResult { IsValid = false, Errors = new List<string>() };

        if (!doesAnotherExamNotExist)
        {
            result.Errors.Add("Exam with this teacher and date already exists");
        }

        if (!areStudentIdsUnique)
        {
            result.Errors.Add("Student ids should be unique");
        }

        return result;
    }

    private async Task<bool> DoesAnotherExamWithTeacherIdAndDateNotExist(UpdateExamRequest instance)
    {
        var existingExam = await _examRepository.GetByTeacherIdAndDateAsync(instance.TeacherId, instance.Date);

        return existingExam is null || existingExam.Id == instance.Id;
    }

    private bool AreStudentIdsUnique(Guid[] studentIds)
    {
        var distinctIds = studentIds.Distinct();
        return distinctIds.Count() == studentIds.Count();
    }
}