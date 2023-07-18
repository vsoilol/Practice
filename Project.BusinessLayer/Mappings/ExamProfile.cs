using AutoMapper;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Exam;

namespace Project.BusinessLayer.Mappings;

public class ExamProfile : Profile
{
    public ExamProfile()
    {
        CreateMap<Exam, ExamDto>()
            .ForMember(dto => dto.Teacher,
                memberOptions => memberOptions
                    .MapFrom(entity => entity.TeacherWorkingDay.Teacher))
            .ForMember(dto => dto.Date,
                memberOptions => memberOptions
                    .MapFrom(entity => entity.TeacherWorkingDay.Date));

        CreateMap<CreateExamRequest, Exam>()
            .ForMember(entity => entity.ExamStudents,
                memberOptions => memberOptions
                    .MapFrom(request => request.StudentIds
                        .Select(_ => new ExamStudent { StudentId = _ })));

        CreateMap<UpdateExamRequest, Exam>()
            .ForMember(entity => entity.ExamStudents,
                memberOptions => memberOptions
                    .MapFrom(request => request.StudentIds
                        .Select(_ => new ExamStudent { StudentId = _ })));
    }
}