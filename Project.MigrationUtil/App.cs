using FluentMigrator.Runner;
using Microsoft.Extensions.Configuration;

namespace Project.MigrationUtil;

public class App
{
    private readonly IMigrationRunner _migrationRunner;
    private readonly IConfiguration _configuration;

    public App(IMigrationRunner migrationRunner, IConfiguration configuration)
    {
        _migrationRunner = migrationRunner;
        _configuration = configuration;
    }

    public Task ExecuteAsync(CancellationToken stoppingToken = default)
    {
        var isDowngrade = bool.Parse(_configuration["isDowngrade"]!);
        var version = long.Parse(_configuration["version"]!);
        
        _migrationRunner.ListMigrations();

        if (isDowngrade)
        {
            _migrationRunner.MigrateDown(version != -1 ? version : 0);
            return Task.CompletedTask;
        }

        if (version == -1)
        {
            _migrationRunner.MigrateUp();
        }
        else
        {
            _migrationRunner.MigrateUp(version);
        }

        return Task.CompletedTask;
    }
}