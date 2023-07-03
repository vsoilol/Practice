using FluentMigrator;

namespace Project.DataAccessLayer.Migrations;

[Migration(202307030003)]
public class _202307030003_InsertDataToUserAndRoleTables : Migration
{
    public override void Up()
    {
        var userId = new Guid("1068ca01-057d-4cd3-8473-3e709f35d8bd");
        var roleId = new Guid("d754b7d0-b81c-401f-bcf2-012249a6a8ee");
        
        Insert.IntoTable("User")
            .Row(new
            {
                Id = userId,
                FirstName = "John",
                LastName = "Doe",
                MiddleName = "Smith",
                Age = 30
            });

        Insert.IntoTable("Role")
            .Row(new
            {
                Id = roleId,
                Name = "Admin",
                NormalizedName = "ADMIN"
            });
        
        Insert.IntoTable("RoleUser")
            .Row(new
            {
                RolesId = roleId,
                UsersId = userId
            });
    }

    public override void Down()
    {
        var userId = new Guid("1068ca01-057d-4cd3-8473-3e709f35d8bd");
        var roleId = new Guid("d754b7d0-b81c-401f-bcf2-012249a6a8ee");
        
        Delete.FromTable("User")
            .Row(new
            {
                Id = userId,
                FirstName = "John",
                LastName = "Doe",
                MiddleName = "Smith",
                Age = 30
            });

        Delete.FromTable("Role")
            .Row(new
            {
                Id = roleId,
                Name = "Admin",
                NormalizedName = "ADMIN"
            });
        
        Delete.FromTable("RoleUser")
            .Row(new
            {
                RolesId = roleId,
                UsersId = userId
            });
    }
}