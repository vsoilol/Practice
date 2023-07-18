using AutoMapper;
using Project.BusinessLayer.Validation.Services;
using Project.DataAccessLayer.Repositories.ExamRepositories;
using Project.DataAccessLayer.Repositories.WorkingDayRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Exceptions;
using Project.Domain.Requests.Exam;

namespace Project.BusinessLayer.Services.ExamServices;

public class ExamService : IExamService
{
    private readonly IMapper _mapper;
    private readonly IExamRepository _examRepository;
    private readonly IWorkingDayRepository _workingDayRepository;
    private readonly IValidationService _validationService;

    public ExamService(IMapper mapper, IExamRepository examRepository, IWorkingDayRepository workingDayRepository,
        IValidationService validationService)
    {
        _mapper = mapper;
        _examRepository = examRepository;
        _workingDayRepository = workingDayRepository;
        _validationService = validationService;
    }

    public async Task<IReadOnlyCollection<ExamDto>> GetAllExamsAsync()
    {
        var examEntities = await _examRepository.GetAllAsync();

        var mappedExams = _mapper
            .Map<IReadOnlyCollection<ExamDto>>(examEntities);

        return mappedExams;
    }

    public async Task<ExamDto> CreateExamAsync(CreateExamRequest request)
    {
        await _validationService.ValidateAsync(request);

        var teacherWorkingDayId = await GetWorkingDayIdByTeacherIdAndDateAsync(request.TeacherId, request.Date);

        var examEntity = _mapper.Map<Exam>(request);
        examEntity.TeacherWorkingDayId = teacherWorkingDayId;
        
        var createdExamEntity = await _examRepository.InsertAsync(examEntity);

        return _mapper.Map<ExamDto>(createdExamEntity);
    }

    public async Task<bool> UpdateExamAsync(UpdateExamRequest request)
    {
        await _validationService.ValidateAsync(request);
        
        var teacherWorkingDayId = await GetWorkingDayIdByTeacherIdAndDateAsync(request.TeacherId, request.Date);

        var examEntity = _mapper.Map<Exam>(request);
        examEntity.TeacherWorkingDayId = teacherWorkingDayId;

        return await _examRepository.UpdateWithStudentsAsync(examEntity);
    }

    public Task<bool> DeleteExamAsync(Guid id)
    {
        return _examRepository.DeleteAsync(id);
    }

    private async Task<Guid> GetWorkingDayIdByTeacherIdAndDateAsync(Guid teacherId, DateTime date)
    {
        var workingDay = await _workingDayRepository.GetByTeacherIdAndDateAsync(teacherId, date);

        if (workingDay is null)
        {
            throw new EntityNotFoundException(typeof(WorkingDay));
        }

        return workingDay.Id;
    }
}