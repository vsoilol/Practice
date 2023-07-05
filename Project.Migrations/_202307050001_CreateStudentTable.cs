using FluentMigrator;

namespace Project.Migrations;

[Migration(202307050001)]
public class _202307050001_CreateStudentTable : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("Student")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("FirstName").AsString(50).NotNullable()
            .WithColumn("LastName").AsString(50).NotNullable()
            .WithColumn("MiddleName").AsString(50).NotNullable()
            .WithColumn("Age").AsInt32().NotNullable()
            .WithColumn("Group").AsString(10).NotNullable()
            .WithColumn("CreatedAt").AsDateTime2().NotNullable()
            .WithColumn("CreatedById").AsGuid().NotNullable()
            .WithColumn("ModifiedAt").AsDateTime2().Nullable()
            .WithColumn("ModifiedById").AsGuid().Nullable();

        Create.ForeignKey("FK_Student_User_CreatedById")
            .FromTable("Student").ForeignColumn("CreatedById")
            .ToTable("User").PrimaryColumn("Id")
            .OnDeleteOrUpdate(System.Data.Rule.Cascade);

        Create.ForeignKey("FK_Student_User_ModifiedById")
            .FromTable("Student").ForeignColumn("ModifiedById")
            .ToTable("User").PrimaryColumn("Id");
    }
}