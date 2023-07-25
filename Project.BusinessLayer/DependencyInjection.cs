using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Project.BusinessLayer.Services.ExamServices;
using Project.BusinessLayer.Services.StudentServices;
using Project.BusinessLayer.Services.SubjectServices;
using Project.BusinessLayer.Services.TeacherServices;
using Project.BusinessLayer.Services.UserServices;
using Project.BusinessLayer.Services.WorkingDayServices;
using Project.BusinessLayer.Validation.Services;
using Project.BusinessLayer.Validation.Validators;

namespace Project.BusinessLayer;

public static class DependencyInjection
{
    public static void RegisterBusinessLayer(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        RegisterValidators(services);
        services.AddScoped<IValidationService, ValidationService>();

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<ISubjectService, SubjectService>();
        services.AddScoped<ITeacherService, TeacherService>();
        services.AddScoped<IExamService, ExamService>();
        services.AddScoped<IWorkingDayService, WorkingDayService>();
    }

    private static void RegisterValidators(IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var validatorTypes = assembly
            .GetTypes()
            .Where(type => type.IsClass &&
                           type.GetInterfaces().Any(i =>
                               i.IsGenericType &&
                               i.GetGenericTypeDefinition() == typeof(IValidator<>)));

        foreach (var validatorType in validatorTypes)
        {
            var validatorInterface = validatorType.GetInterfaces()
                .FirstOrDefault(interfaceType => interfaceType.IsGenericType &&
                                                 interfaceType.GetGenericTypeDefinition() == typeof(IValidator<>));

            if (validatorInterface is not null)
            {
                services.AddScoped(validatorInterface, validatorType);
            }
        }
    }
}