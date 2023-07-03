using FluentMigrator.Runner;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Project.DataAccessLayer.DataAccess;
using Project.DataAccessLayer.Migrations;

namespace Project.DataAccessLayer;

public static class DependencyInjection
{
    public static void RegisterDataAccessLayer(this IServiceCollection services, string connectionString)
    {
        services.AddScoped<IDbContext, ApplicationDbContext>();
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

        services
            .AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                .AddSqlServer()
                .WithGlobalConnectionString(connectionString)
                .ScanIn(typeof(_202307030001_InitialTables).Assembly).For.Migrations());
    }
}