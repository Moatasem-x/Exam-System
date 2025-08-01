using AutoMapper;
using ExaminationSystemDB.DTOs.AdminDTOs;
using ExaminationSystemDB.DTOs.ExamDTOs;
using ExaminationSystemDB.DTOs.StudentDTOs;
using ExaminationSystemDB.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExaminationSystemDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        UnitOfWork unit;
        IMapper map;

        public AdminController(UnitOfWork u, IMapper m)
        {
            unit = u;
            map = m;
        }

        [HttpGet("Exam/{examId}/students-grades")]
        [EndpointSummary("Get all students grades for a specific exam")]
        public IActionResult GetStudentsGradesForExam(int examId)
        {
            var exam = unit.ExamRepo.getByID(examId);
            if (exam == null)
                return NotFound("Exam not found");

            // Get all student results for this exam
            var studentResults = unit.StudentExamRepo.getStudentsResultsForExam(examId);

            if (!studentResults.Any())
                return Ok(new { Message = "No students have taken this exam yet", ExamName = exam.Name, Results = new List<DisplayStudentGradesDTO>() });

            // Map to DTO
            var studentGrades = map.Map<List<DisplayStudentGradesDTO>>(studentResults);

            return Ok(new
            {
                ExamName = exam.Name,
                TotalStudents = studentGrades.Count,
                Results = studentGrades
            });
        }

        [HttpGet("exam/{examId}/statistics")]
        [EndpointSummary("Get exam statistics including average, highest, lowest grades")]
        public IActionResult GetExamStatistics(int examId)
        {
            // Check if exam exists
            var exam = unit.ExamRepo.getByID(examId);
            if (exam == null)
                return NotFound("Exam not found");

            // Get all student results for this exam
            var studentResults = unit.StudentExamRepo.getStudentsResultsForExam(examId);

            if (!studentResults.Any())
                return Ok(new { Message = "No students have taken this exam yet", ExamName = exam.Name });

            var grades = studentResults.Select(s => s.StudentGrade).ToList();
            var passedStudents = grades.Where(g => g >= exam.MinGrade).Count();
            var failedStudents = grades.Count - passedStudents;

            var statistics = new ExamStatisticsDTO
            {
                ExamName = exam.Name,
                TotalStudents = grades.Count,
                AverageGrade = Math.Round(grades.Average(), 2),
                HighestGrade = grades.Max(),
                LowestGrade = grades.Min(),
                PassedStudents = passedStudents,
                FailedStudents = failedStudents,
                PassRate = Math.Round((double)passedStudents / grades.Count * 100, 2)
            };

            return Ok(statistics);
        }

        [HttpGet("exams")]
        [EndpointSummary("Get all exams with basic info")]
        public IActionResult GetAllExams()
        {
            var exams = unit.ExamRepo.getAll();
            var examDTOs = map.Map<List<DisplayExamDTO>>(exams);
            return Ok(examDTOs);
        }


        [HttpGet("Students")]
        [EndpointSummary("Get all Students")]
        public IActionResult GetAllStudents()
        {
            var Sts = unit.StudentRepo.getAll();
            var stsDTOs = map.Map<List<AdminDisplayStudentInfo>>(Sts);
            return Ok(stsDTOs);
        }
    }
}
