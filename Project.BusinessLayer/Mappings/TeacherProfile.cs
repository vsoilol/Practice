using AutoMapper;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Teacher;

namespace Project.BusinessLayer.Mappings;

public class TeacherProfile : Profile
{
    public TeacherProfile()
    {
        CreateMap<Teacher, TeacherDto>();
        
        CreateMap<CreateTeacherRequest, Teacher>();
        CreateMap<UpdateTeacherRequest, Teacher>();
    }
}