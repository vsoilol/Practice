using FluentMigrator;

namespace Project.Migrations;

[Migration(202307120003)]
public class _202307120003_AddIndexes : AutoReversingMigration
{
    public override void Up()
    {
        Create.Index("IX_AuditLog_UserId")
            .OnTable("AuditLog")
            .OnColumn("UserId").Ascending();
        
        Create.Index("IX_RoleUser_UsersId")
            .OnTable("RoleUser")
            .OnColumn("UsersId").Ascending();
    }
}