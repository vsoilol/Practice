using FluentMigrator;

namespace Project.Migrations;

[Migration(202307120002)]
public class _202307120002_CreateExamTables : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("Exam")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("SubjectId").AsGuid().NotNullable()
            .WithColumn("TeacherWorkingDayId").AsGuid().NotNullable();

        Create.Table("ExamStudent")
            .WithColumn("ExamId").AsGuid().NotNullable()
            .WithColumn("StudentId").AsGuid().NotNullable();

        Create.PrimaryKey("PK_ExamStudent")
            .OnTable("ExamStudent")
            .Columns("ExamId", "StudentId");

        Create.Table("Subject")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("Title").AsString(30).NotNullable()
            .WithColumn("Description").AsString(int.MaxValue).Nullable();

        Create.Table("Teacher")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("FirstName").AsString(50).NotNullable()
            .WithColumn("LastName").AsString(50).NotNullable()
            .WithColumn("MiddleName").AsString(50).NotNullable();
        
        Create.Table("WorkingDay")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("Date").AsDateTime2().NotNullable()
            .WithColumn("TeacherId").AsGuid().NotNullable();

        Create.Index("IX_Exam_SubjectId")
            .OnTable("Exam")
            .OnColumn("SubjectId").Ascending();

        Create.Index("IX_Exam_TeacherWorkingDayId")
            .OnTable("Exam")
            .WithOptions().Unique()
            .OnColumn("TeacherWorkingDayId").Ascending();

        Create
            .Index("IX_ExamStudent_StudentId")
            .OnTable("ExamStudent")
            .OnColumn("StudentId")
            .Ascending();

        Create.Index("IX_WorkingDay_Date_TeacherId")
            .OnTable("WorkingDay")
            .WithOptions().Unique()
            .OnColumn("Date").Ascending()
            .OnColumn("TeacherId").Ascending();
        
        Create.Index("IX_WorkingDay_TeacherId")
            .OnTable("WorkingDay")
            .OnColumn("TeacherId")
            .Ascending();

        Create.ForeignKey("FK_Exam_Subject_SubjectId")
            .FromTable("Exam").ForeignColumn("SubjectId")
            .ToTable("Subject").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.ForeignKey("FK_Exam_WorkingDay_TeacherWorkingDayId")
            .FromTable("Exam").ForeignColumn("TeacherWorkingDayId")
            .ToTable("WorkingDay").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.ForeignKey("FK_ExamStudent_Exam_ExamId")
            .FromTable("ExamStudent").ForeignColumn("ExamId")
            .ToTable("Exam").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.ForeignKey("FK_ExamStudent_Student_StudentId")
            .FromTable("ExamStudent").ForeignColumn("StudentId")
            .ToTable("Student").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.ForeignKey("FK_WorkingDay_Teacher_TeacherId")
            .FromTable("WorkingDay").ForeignColumn("TeacherId")
            .ToTable("Teacher").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);
    }
}