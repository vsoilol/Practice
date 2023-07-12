using FluentMigrator;

namespace Project.Migrations;

[Migration(202307120001)]
public class _202307120001_AddAuditLogTableAndFixStudentTable : Migration
{
    public override void Up()
    {
        Delete
            .ForeignKey("FK_Student_User_CreatedById")
            .OnTable("Student");

        Delete
            .ForeignKey("FK_Student_User_ModifiedById")
            .OnTable("Student");

        Delete
            .Column("CreatedAt")
            .FromTable("Student");

        Delete
            .Column("CreatedById")
            .FromTable("Student");

        Delete
            .Column("ModifiedAt")
            .FromTable("Student");

        Delete
            .Column("ModifiedById")
            .FromTable("Student");

        Create.Table("AuditLog")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("UserId").AsGuid().Nullable()
            .WithColumn("AuditType").AsString().NotNullable()
            .WithColumn("TableName").AsString().NotNullable()
            .WithColumn("DateTime").AsDateTime2().NotNullable()
            .WithColumn("OldValues").AsString().Nullable()
            .WithColumn("NewValues").AsString().Nullable()
            .WithColumn("AffectedColumns").AsString().Nullable()
            .WithColumn("PrimaryKey").AsString().Nullable();

        Create.ForeignKey("FK_AuditLog_User_UserId")
            .FromTable("AuditLog").ForeignColumn("UserId")
            .ToTable("User").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.None);
    }

    public override void Down()
    {
        Create
            .Column("CreatedAt")
            .OnTable("Student")
            .AsDateTime2().NotNullable();

        Create
            .Column("CreatedById")
            .OnTable("Student")
            .AsGuid().NotNullable();
        
        Create
            .Column("ModifiedAt")
            .OnTable("Student")
            .AsDateTime2().Nullable();
        
        Create
            .Column("ModifiedById")
            .OnTable("Student")
            .AsGuid().Nullable();
        
        Create.ForeignKey("FK_Student_User_CreatedById")
            .FromTable("Student").ForeignColumn("CreatedById")
            .ToTable("User").PrimaryColumn("Id")
            .OnDeleteOrUpdate(System.Data.Rule.Cascade);
        
        Create.ForeignKey("FK_Student_User_ModifiedById")
            .FromTable("Student").ForeignColumn("ModifiedById")
            .ToTable("User").PrimaryColumn("Id");

        Delete.ForeignKey("FK_AuditLog_User_UserId").OnTable("AuditLog");
        Delete.Table("AuditLog");
    }
}