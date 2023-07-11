using AutoMapper;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Student;

namespace Project.BusinessLayer.Mappings;

public class StudentProfile : Profile
{
    public StudentProfile()
    {
        CreateMap<Student, StudentDto>()
            .ForMember(dto => dto.UserId,
                entity => entity
                    .MapFrom(s => s.ModifiedById ?? s.CreatedById));

        CreateMap<CreateStudentRequest, Student>()
            .ForMember(entity => entity.CreatedById,
                memberOptions =>
                    memberOptions.MapFrom(request => request.UserId));
        CreateMap<UpdateStudentRequest, Student>()
            .ForMember(entity => entity.ModifiedById,
                memberOptions =>
                    memberOptions.MapFrom(request => request.UserId));
    }
}