using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Project.BusinessLayer.Services.ExamServices;
using Project.BusinessLayer.Services.StudentServices;
using Project.BusinessLayer.Services.SubjectServices;
using Project.BusinessLayer.Services.TeacherServices;
using Project.BusinessLayer.Services.UserServices;
using Project.BusinessLayer.Services.WorkingDayServices;

namespace Project.BusinessLayer;

public static class DependencyInjection
{
    public static void RegisterBusinessLayer(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<ISubjectService, SubjectService>();
        services.AddScoped<ITeacherService, TeacherService>();
        services.AddScoped<IExamService, ExamService>();
        services.AddScoped<IWorkingDayService, WorkingDayService>();
    }
}