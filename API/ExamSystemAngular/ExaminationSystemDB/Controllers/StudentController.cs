using AutoMapper;
using ExaminationSystemDB.DTOs.ExamDTOs;
using ExaminationSystemDB.DTOs.StudentExamDTO;
using ExaminationSystemDB.Models;
using ExaminationSystemDB.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ExaminationSystemDB.Authorization;

namespace ExaminationSystemDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentController : ControllerBase
    {
        UnitOfWork unit;
        IMapper map;
        public StudentController(UnitOfWork u, IMapper m)
        {
            unit = u;
            map = m;
        }

        [HttpGet("{studentId}/available")]
        [StudentOwnership]
        [EndpointSummary("Get available exams for specific student")]
        public IActionResult GetAvailableExams(int studentId)
        {
            if (unit.StudentRepo.getByID(studentId) == null)
                return NotFound();

            List<int> takenExamsForStudent = unit.StudentExamRepo.getStudentExamsIds(studentId);
            List<Exam> restEaxms = unit.ExamRepo.getRestExams(takenExamsForStudent);
            List<DisplayExamDTO> studentResTexams = map.Map<List<DisplayExamDTO>>(restEaxms);
            return Ok(studentResTexams);
        }

        [HttpGet("{studentId}/results")]
        [StudentOwnership]
        [EndpointSummary("Get results for student taken exams")]
        public IActionResult GetAllExamResults(int studentId)
        {
            if (unit.StudentRepo.getByID(studentId) == null)
                return NotFound();
            List<StudentExam> takenExamsForStudent = unit.StudentExamRepo.getStudentExams(studentId);
            List<DisplayStudentExamDTO> takenExams = map.Map<List<DisplayStudentExamDTO>>(takenExamsForStudent);

            return Ok(takenExams);
        }

        [HttpGet("{studentId}/result")]
        [StudentOwnership]
        [EndpointSummary("Gets student result in a specific exam")]
        public IActionResult GetSpecificResult(int studentId, int examId)
        {
            if (unit.StudentRepo.getByID(studentId) == null && unit.StudentExamRepo.getByID(examId) == null)
                return NotFound();
            StudentExam examRes = unit.StudentExamRepo.getStudentExamResult(examId, studentId);
            DisplayStudentExamDTO exam = map.Map<DisplayStudentExamDTO>(examRes);
            return Ok(exam);
        }

        [HttpGet("{studentId}/exam/{examId}")]
        [StudentOwnership]
        [EndpointSummary("Student Takes an exam")]
        public IActionResult TakeExam(int studentId, int examId)
        {
            List<int> takenExamsForStudent = unit.StudentExamRepo.getStudentExamsIds(studentId);
            if (takenExamsForStudent.Contains(examId))
                return BadRequest("Exam Taken before");
            TakeStudentExamDTO examDTO = map.Map<TakeStudentExamDTO>(unit.ExamRepo.getExamByID(examId));
            return Ok(examDTO);
        }
    }
}