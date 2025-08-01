using ExamSystemApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Xml;

namespace ExaminationSystemDB.Models
{
    public class ExamContext : IdentityDbContext<ApplicationUser>
    {
        public ExamContext()
        {
            
        }

        public ExamContext( DbContextOptions<ExamContext> options ) :base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Student>()
                .HasOne(s => s.ApplicationUser)
                .WithOne(u => u.Student)
                .HasForeignKey<Student>(s => s.ApplicationUserId);

            modelBuilder.Entity<StudentExam>()
                .Property(e => e.StartTime)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<IdentityRole>().HasData(
               new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
               new IdentityRole { Id = "2", Name = "Student", NormalizedName = "STUDENT" }
           );

            // Seed Students
            //modelBuilder.Entity<Student>().HasData(
            //    new Student { ID = 1, Name = "AbdelRahman", Address = "Benha", Email = "abdelrahman@example.com", HashedPassword = "hashed123" },
            //    new Student { ID = 2, Name = "Sara Ahmed", Address = "Cairo", Email = "sara@example.com", HashedPassword = "sara123" },
            //    new Student { ID = 3, Name = "Omar Tarek", Address = "Alexandria", Email = "omar@example.com", HashedPassword = "omar123" }
            //);

            // Seed Exams
            modelBuilder.Entity<Exam>().HasData(
                new Exam { Id = 1, Name = "C# Basics", MinGrade = 50, Grade = 100, Duration = 60 },
                new Exam { Id = 2, Name = ".NET Fundamentals", MinGrade = 60, Grade = 100, Duration = 90 }
            );

            // Seed Questions
            modelBuilder.Entity<Question>().HasData(
                new Question { Id = 1, Type = "MCQ", Body = "What is C#?", Grade = 10, ExamId = 1 },
                new Question { Id = 2, Type = "MCQ", Body = "What is the output of Console.WriteLine(2+2)?", Grade = 10, ExamId = 1 },
                new Question { Id = 3, Type = "MCQ", Body = "What is .NET?", Grade = 10, ExamId = 2 },
                new Question { Id = 4, Type = "MCQ", Body = "What is CLR?", Grade = 10, ExamId = 2 }
            );

            // Seed Answers
            modelBuilder.Entity<Answer>().HasData(
                // Question 1
                new Answer { ID = 1, QuestionId = 1, AnswerText = "Programming Language", IsCorrect = true },
                new Answer { ID = 2, QuestionId = 1, AnswerText = "Markup Language", IsCorrect = false },

                // Question 2
                new Answer { ID = 3, QuestionId = 2, AnswerText = "4", IsCorrect = true },
                new Answer { ID = 4, QuestionId = 2, AnswerText = "22", IsCorrect = false },

                // Question 3
                new Answer { ID = 5, QuestionId = 3, AnswerText = "Framework", IsCorrect = true },
                new Answer { ID = 6, QuestionId = 3, AnswerText = "Language", IsCorrect = false },

                // Question 4
                new Answer { ID = 7, QuestionId = 4, AnswerText = "Common Language Runtime", IsCorrect = true },
                new Answer { ID = 8, QuestionId = 4, AnswerText = "Code Line Reader", IsCorrect = false }
            );

            // Seed Student Exams
            modelBuilder.Entity<StudentExam>().HasData(
                new StudentExam
                {
                    StudentId = 1,
                    ExamId = 1,
                    StudentGrade = 90,
                    StartTime = DateTime.Parse("2025-06-28 10:00:00"),
                    EndTime = DateTime.Parse("2025-06-28 11:00:00")
                },
                new StudentExam
                {
                    StudentId = 2,
                    ExamId = 2,
                    StudentGrade = 85,
                    StartTime = DateTime.Parse("2025-06-29 14:00:00"),
                    EndTime = DateTime.Parse("2025-06-29 15:30:00")
                }
            );

            // Seed Student Answers
            modelBuilder.Entity<StudentAnswer>().HasData(
                new StudentAnswer { StudentId = 1, QuestionId = 1, AnswerId = 1 },
                new StudentAnswer { StudentId = 1, QuestionId = 2, AnswerId = 3 },
                new StudentAnswer { StudentId = 2, QuestionId = 3, AnswerId = 5 },
                new StudentAnswer { StudentId = 2, QuestionId = 4, AnswerId = 7 },
                new StudentAnswer { StudentId = 3, QuestionId = 1, AnswerId = 2 } // Incorrect answer
            );


        }
        public virtual DbSet<Exam>  Exam { get; set; }
        public virtual DbSet<StudentExam>  StudentExam { get; set; }
        public virtual DbSet<Question>  Question { get; set; }
        public virtual DbSet<Student>  Student { get; set; }
        public virtual DbSet<Answer>  Answer { get; set; }
        public virtual DbSet<StudentAnswer> StudentAnswer { get; set; }

    }
}
