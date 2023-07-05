using FluentMigrator.Runner;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Project.Migrations;
using Project.MigrationUtil;

var configuration = ConfigureConfigurationBuilder(args).Build();

var connectionString = GetConnectionString(configuration);

using IHost host = CreateHostBuilder(args, configuration, connectionString).Build();
using var scope = host.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    await services.GetRequiredService<App>().ExecuteAsync();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

static IHostBuilder CreateHostBuilder(string[] args, IConfiguration? configuration, string connectionString)
{
    return Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration(builder =>
        {
            builder.Sources.Clear();
            builder.AddConfiguration(configuration!);
        })
        .ConfigureServices((_, services) =>
        {
            services.AddSingleton<App>();
            services.AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(connectionString)
                    .ScanIn(typeof(_202307030001_InitialTables).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole());
        });
}

static string GetConnectionString(IConfiguration configuration, string sectionName = "ProdConnection")
{
    var password = configuration["Password"];
    var user = configuration["User"];

    var prodConnectionString = configuration.GetConnectionString(sectionName)!
        .Replace("{password}", password)
        .Replace("{user}", user);

    return prodConnectionString;
}

static IConfigurationBuilder ConfigureConfigurationBuilder(string[] args,
    IConfigurationBuilder? configurationBuilder = null)
{
    configurationBuilder ??= new ConfigurationBuilder();

    configurationBuilder
        .AddEnvironmentVariables()
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
        .AddCommandLine(args);

    return configurationBuilder;
}