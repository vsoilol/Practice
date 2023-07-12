using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Project.BusinessLayer.Services.StudentServices;
using Project.BusinessLayer.Services.UserServices;

namespace Project.BusinessLayer;

public static class DependencyInjection
{
    public static void RegisterBusinessLayer(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IStudentService, StudentService>();
    }
}