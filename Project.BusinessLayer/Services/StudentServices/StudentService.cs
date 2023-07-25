using AutoMapper;
using Project.DataAccessLayer.Repositories.StudentRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Student;

namespace Project.BusinessLayer.Services.StudentServices;

public class StudentService : IStudentService
{
    private readonly IMapper _mapper;
    private readonly IStudentRepository _studentRepository;

    public StudentService(IMapper mapper, IStudentRepository studentRepository)
    {
        _mapper = mapper;
        _studentRepository = studentRepository;
    }

    public async Task<IReadOnlyCollection<StudentDto>> GetAllStudentsAsync()
    {
        var studentEntities = await _studentRepository.GetAllAsync();

        var mappedStudents = _mapper
            .Map<IReadOnlyCollection<StudentDto>>(studentEntities);

        return mappedStudents;
    }

    public async Task<StudentDto> CreateStudentAsync(CreateStudentRequest request)
    {
        var studentEntity = _mapper.Map<Student>(request);

        var createdStudentEntity = await _studentRepository.InsertAsync(studentEntity);

        return _mapper.Map<StudentDto>(createdStudentEntity);
    }

    public Task<bool> UpdateStudentAsync(UpdateStudentRequest request)
    {
        var studentEntity = _mapper.Map<Student>(request);
        return _studentRepository.UpdateAsync(studentEntity);
    }

    public Task<bool> DeleteStudentAsync(Guid id)
    {
        return _studentRepository.DeleteAsync(id);
    }

    public async Task<IReadOnlyCollection<StudentDto>> GetAllStudentsByExamIdAsync(Guid examId)
    {
        var studentEntities = await _studentRepository.GetAllByExamIdAsync(examId);

        var mappedStudents = _mapper
            .Map<IReadOnlyCollection<StudentDto>>(studentEntities);

        return mappedStudents;
    }
}