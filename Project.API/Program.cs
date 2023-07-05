using FluentMigrator.Runner;
using Project.BusinessLayer;
using Project.DataAccessLayer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;

builder.Services.RegisterDataAccessLayer(connectionString);

builder.Services.RegisterBusinessLayer();

var app = builder.Build();

var isDevelopment = app.Environment.IsDevelopment();
var isProduction = app.Environment.IsProduction();

if (isDevelopment)
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;

    var runner = services.GetRequiredService<IMigrationRunner>();
    runner.MigrateUp();
}

if (isDevelopment)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (isProduction)
{
    app.UseStaticFiles();
    app.MapFallbackToFile("index.html");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();