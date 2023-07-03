using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Project.BusinessLayer.Services.User;

namespace Project.BusinessLayer;

public static class DependencyInjection
{
    public static void RegisterBusinessLayer(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.AddScoped<IUserService, UserService>();
    }
}