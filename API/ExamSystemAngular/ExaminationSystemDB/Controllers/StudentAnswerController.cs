using AutoMapper;
using ExaminationSystemDB.DTOs.StudentAnswerDTOs;
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
    public class StudentAnswerController : ControllerBase
    {
        IMapper mapper;
        UnitOfWork unitOfWork;

        public StudentAnswerController(IMapper mapper, UnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }


        [HttpPost("{studentId}")]
        [StudentOwnership]
        public IActionResult AddStudentAnswers(int studentId, List<AddStudentAnswerDTO> sa)
        {
            // Validate that all answers belong to this student
            if (sa.Any(answer => answer.StudentId != studentId))
            {
                return BadRequest("All answers must belong to the authenticated student");
            }

            List<StudentAnswer> s = mapper.Map<List<StudentAnswer>>(sa);
            foreach (StudentAnswer ss in s)
                unitOfWork.StudentAnswerRepo.Add(ss);
            unitOfWork.Save();
            return Ok(s);
        }
    }
}