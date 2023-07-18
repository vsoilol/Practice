using FluentMigrator.Runner;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Project.DataAccessLayer.DataAccess;
using Project.DataAccessLayer.Repositories.ExamRepositories;
using Project.DataAccessLayer.Repositories.StudentRepositories;
using Project.DataAccessLayer.Repositories.SubjectRepositories;
using Project.DataAccessLayer.Repositories.TeacherRepositories;
using Project.DataAccessLayer.Repositories.UserRepositories;
using Project.DataAccessLayer.Repositories.WorkingDayRepositories;
using Project.Migrations;

namespace Project.DataAccessLayer;

public static class DependencyInjection
{
    public static void RegisterDataAccessLayer(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

        services
            .AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                .AddSqlServer()
                .WithGlobalConnectionString(connectionString)
                .ScanIn(typeof(_202307030001_InitialTables).Assembly).For.Migrations());
        
        services.AddScoped<IStudentRepository, StudentRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ISubjectRepository, SubjectRepository>();
        services.AddScoped<ITeacherRepository, TeacherRepository>();
        services.AddScoped<IExamRepository, ExamRepository>();
        services.AddScoped<IWorkingDayRepository, WorkingDayRepository>();
    }
}