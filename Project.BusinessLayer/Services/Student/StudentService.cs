using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.DTOs;
using Project.Domain.Requests.Student;

namespace Project.BusinessLayer.Services.Student;

public class StudentService : IStudentService
{
    private readonly IMapper _mapper;
    private readonly IDbContext _context;

    public StudentService(IMapper mapper, IDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<IReadOnlyCollection<StudentDto>> GetAllStudentsAsync()
    {
        var studentEntities = await _context.Students
            .AsNoTracking()
            .ToListAsync();

        var mappedStudents = _mapper
            .Map<IReadOnlyCollection<StudentDto>>(studentEntities);

        return mappedStudents;
    }

    public async Task<StudentDto> CreateStudentAsync(CreateStudentRequest request)
    {
        var studentEntity = _mapper.Map<Domain.Entities.Student>(request);

        var createdStudentEntity = _context.Students.Add(studentEntity).Entity;
        await _context.SaveChangesAuditableEntitiesAsync(request.UserId);

        return _mapper.Map<StudentDto>(createdStudentEntity);
    }

    public async Task<bool> UpdateStudentAsync(UpdateStudentRequest request)
    {
        var studentEntity = await _context.Students
            .FirstOrDefaultAsync(_ => _.Id == request.Id);

        if (studentEntity is null)
        {
            return false;
        }
        
        _mapper.Map(request, studentEntity);

        var affectedEntities = await _context.SaveChangesAuditableEntitiesAsync(request.UserId);
        return affectedEntities > 0;
    }

    public async Task<bool> DeleteStudentAsync(Guid id)
    {
        _context.Students.Remove(new Domain.Entities.Student { Id = id });
        var affectedEntities = await _context.SaveChangesAsync();
        return affectedEntities > 0;
    }
}