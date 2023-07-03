using FluentMigrator;

namespace Project.DataAccessLayer.Migrations;

[Migration(202307030002)]
public class _202307030002_CreateRoleTable : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("Role")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("Name").AsString(50).NotNullable()
            .WithColumn("NormalizedName").AsString(50).NotNullable();
        
        Create.Table("RoleUser")
            .WithColumn("RolesId").AsGuid().NotNullable()
            .WithColumn("UsersId").AsGuid().NotNullable();
        
        Create.PrimaryKey("PK_RoleUser")
            .OnTable("RoleUser")
            .Columns("RolesId", "UsersId");

        Create.ForeignKey("FK_RoleUser_Role_RolesId")
            .FromTable("RoleUser").ForeignColumn("RolesId")
            .ToTable("Role").PrimaryColumn("Id")
            .OnDeleteOrUpdate(System.Data.Rule.Cascade);

        Create.ForeignKey("FK_RoleUser_Users_UsersId")
            .FromTable("RoleUser").ForeignColumn("UsersId")
            .ToTable("User").PrimaryColumn("Id")
            .OnDeleteOrUpdate(System.Data.Rule.Cascade);
    }
}