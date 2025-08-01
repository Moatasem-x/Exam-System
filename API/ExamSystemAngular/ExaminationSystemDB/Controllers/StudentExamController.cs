using AutoMapper;
using ExaminationSystemDB.DTOs.StudentExamDTO;
using ExaminationSystemDB.Models;
using ExaminationSystemDB.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ExaminationSystemDB.Authorization;

namespace ExaminationSystemDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentExamController : ControllerBase
    {
        IMapper mapper;
        UnitOfWork unitOfWork;

        public StudentExamController(IMapper mapper, UnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            List<DisplayStudentExamDTO> stExamDTO = mapper.Map<List<DisplayStudentExamDTO>>(unitOfWork.StudentExamRepo.getWithExam());
            return Ok(stExamDTO);
        }

        [HttpPost("{studentId}")]
        [StudentOwnership]
        [EndpointSummary("Saves student exam data into db")]
        public IActionResult AddStudentExamData(int studentId, AddStudentExamDTO res)
        {
            // Validate that the exam result belongs to this student
            if (res.StudentId != studentId)
            {
                return BadRequest("Exam result must belong to the authenticated student");
            }

            StudentExam SE = mapper.Map<StudentExam>(res);
            unitOfWork.StudentExamRepo.Add(SE);
            unitOfWork.Save();
            return Ok(SE);
        }
    }
}