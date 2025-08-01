using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ExaminationSystemDB.Migrations
{
    /// <inheritdoc />
    public partial class Seedingdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Exam",
                columns: new[] { "Id", "Duration", "Grade", "MinGrade", "Name" },
                values: new object[,]
                {
                    { 1, 60, 100, 50, "C# Basics" },
                    { 2, 90, 100, 60, ".NET Fundamentals" }
                });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "ID", "Address", "Email", "HashedPassword", "Name" },
                values: new object[,]
                {
                    { 1, "Benha", "abdelrahman@example.com", "hashed123", "AbdelRahman" },
                    { 2, "Cairo", "sara@example.com", "sara123", "Sara Ahmed" },
                    { 3, "Alexandria", "omar@example.com", "omar123", "Omar Tarek" }
                });

            migrationBuilder.InsertData(
                table: "Question",
                columns: new[] { "Id", "Body", "ExamId", "Grade", "Type" },
                values: new object[,]
                {
                    { 1, "What is C#?", 1, 10, "MCQ" },
                    { 2, "What is the output of Console.WriteLine(2+2)?", 1, 10, "MCQ" },
                    { 3, "What is .NET?", 2, 10, "MCQ" },
                    { 4, "What is CLR?", 2, 10, "MCQ" }
                });

            migrationBuilder.InsertData(
                table: "StudentExam",
                columns: new[] { "ExamId", "StudentId", "EndTime", "StartTime", "StudentGrade" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 6, 28, 11, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 6, 28, 10, 0, 0, 0, DateTimeKind.Unspecified), 90 },
                    { 2, 2, new DateTime(2025, 6, 29, 15, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 6, 29, 14, 0, 0, 0, DateTimeKind.Unspecified), 85 }
                });

            migrationBuilder.InsertData(
                table: "Answer",
                columns: new[] { "ID", "AnswerText", "IsCorrect", "QuestionId" },
                values: new object[,]
                {
                    { 1, "Programming Language", true, 1 },
                    { 2, "Markup Language", false, 1 },
                    { 3, "4", true, 2 },
                    { 4, "22", false, 2 },
                    { 5, "Framework", true, 3 },
                    { 6, "Language", false, 3 },
                    { 7, "Common Language Runtime", true, 4 },
                    { 8, "Code Line Reader", false, 4 }
                });

            migrationBuilder.InsertData(
                table: "StudentAnswer",
                columns: new[] { "AnswerId", "QuestionId", "StudentId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 3, 2, 1 },
                    { 5, 3, 2 },
                    { 7, 4, 2 },
                    { 2, 1, 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "StudentAnswer",
                keyColumns: new[] { "AnswerId", "QuestionId", "StudentId" },
                keyValues: new object[] { 1, 1, 1 });

            migrationBuilder.DeleteData(
                table: "StudentAnswer",
                keyColumns: new[] { "AnswerId", "QuestionId", "StudentId" },
                keyValues: new object[] { 3, 2, 1 });

            migrationBuilder.DeleteData(
                table: "StudentAnswer",
                keyColumns: new[] { "AnswerId", "QuestionId", "StudentId" },
                keyValues: new object[] { 5, 3, 2 });

            migrationBuilder.DeleteData(
                table: "StudentAnswer",
                keyColumns: new[] { "AnswerId", "QuestionId", "StudentId" },
                keyValues: new object[] { 7, 4, 2 });

            migrationBuilder.DeleteData(
                table: "StudentAnswer",
                keyColumns: new[] { "AnswerId", "QuestionId", "StudentId" },
                keyValues: new object[] { 2, 1, 3 });

            migrationBuilder.DeleteData(
                table: "StudentExam",
                keyColumns: new[] { "ExamId", "StudentId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "StudentExam",
                keyColumns: new[] { "ExamId", "StudentId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Answer",
                keyColumn: "ID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Question",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Question",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Question",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Question",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Exam",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Exam",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
