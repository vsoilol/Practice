using AutoMapper;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Student;

namespace Project.BusinessLayer.Mappings;

public class StudentProfile : Profile
{
    public StudentProfile()
    {
        CreateMap<Student, StudentDto>();

        CreateMap<CreateStudentRequest, Student>();
        CreateMap<UpdateStudentRequest, Student>();
    }
}