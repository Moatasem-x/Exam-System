using AutoMapper;
using ExaminationSystemDB.DTOs.AdminDTOs;
using ExaminationSystemDB.DTOs.AnswerDTOs;
using ExaminationSystemDB.DTOs.ExamDTOs;
using ExaminationSystemDB.Models;
using ExaminationSystemDB.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExaminationSystemDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExamController : ControllerBase
    {
        IMapper mapper;
        UnitOfWork unitOfWork;

        public ExamController(IMapper mapper, UnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public ActionResult GETExams()
        {
            List<Exam> exams = unitOfWork.ExamRepo.GetExamsInfo();
            List<AdminExamDTO> examDTOs = mapper.Map<List<AdminExamDTO>>(exams);
            return Ok(examDTOs);
        }
        [HttpGet("{id}")]
        //[Authorize(Roles = "Admin")]
        public ActionResult GetExamByID(int id) {

            ExamWithQuestionsDTO examDTO = mapper.Map<ExamWithQuestionsDTO>(unitOfWork.ExamRepo.getExamByID(id));
             return Ok(examDTO);
        }

        [HttpPost]
        [EndpointSummary("Add new Exam")]
        [Authorize(Roles = "Admin")]
        public ActionResult NewExam(AddExamDataDTO Newexam)
        {   
            Exam exam = mapper.Map<Exam>(Newexam);
            exam.Grade = 0;
            foreach(var q in exam.question)
            {
                exam.Grade += q.Grade;
            }
            unitOfWork.ExamRepo.Add(exam);
            unitOfWork.Save();
            return Ok(Newexam);
        }

        [HttpPut("{id}")]
        [EndpointSummary("Edit Exam")]
        [Authorize(Roles = "Admin")]
        public ActionResult EditExam(int id , AdminExamDTO examDTO )
        {
            Exam EditedExam = unitOfWork.ExamRepo.getExamByID(id);
            mapper.Map(examDTO, EditedExam);
            EditedExam.Grade = 0;
            foreach (var q in EditedExam.question)
            {
                EditedExam.Grade += q.Grade;
            }
            unitOfWork.Save();
            return Ok(examDTO);
        }
        [HttpPut("AddQuestions/{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult AddExamQuestions(int id, AdminExamDTO examDTO)
        {
            Exam EditedExam = unitOfWork.ExamRepo.getExamByID(id);
            var oldQs = EditedExam.question.ToList();
            mapper.Map(examDTO.question, EditedExam.question);
            EditedExam.Grade = 0;
            EditedExam.Duration = examDTO.Duration;
            foreach (var q in oldQs) EditedExam.question.Add(q);

            foreach (var q in EditedExam.question)
            {
                EditedExam.Grade += q.Grade;
            }
            unitOfWork.Save();
            return Ok(examDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteExam(int id) {
            unitOfWork.ExamRepo.Delete(id);
            unitOfWork.Save();
            return Ok();
        }


        [HttpGet("{Examid}/{studentID}")]
        [EndpointSummary("Student Exam Answers")]
        public ActionResult GetExamAnswerForStudent(int Examid, int studentID)
        {

            List<Question> questions = unitOfWork.QuestionRepo.GetAllExamQuestions(Examid);

            List<ExamStudentAnswer> questionsDTO = mapper.Map<List<ExamStudentAnswer>>(questions);
            foreach (var question in questionsDTO)
            {
                question.Answers = mapper.Map<List<AnswerDTO>>(unitOfWork.AnswerRepo.GetAllAnswers(question.QuestionId));
                question.CorrectAnswerId = unitOfWork.AnswerRepo.GetCorrectAnswer(question.QuestionId).ID;
                question.StudentAnswerId = unitOfWork.StudentAnswerRepo.GetAnswerForQusetion(question.QuestionId, studentID)?.AnswerId;
            }
            return Ok(questionsDTO);
        }


    }
}



/*
 
 */