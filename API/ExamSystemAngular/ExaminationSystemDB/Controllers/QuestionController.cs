using AutoMapper;
using ExaminationSystemDB.DTOs.ExamDTOs;
using ExaminationSystemDB.DTOs.QuestionDTOs;
using ExaminationSystemDB.Models;
using ExaminationSystemDB.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExaminationSystemDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class QuestionController : ControllerBase
    {
        IMapper mapper;
        UnitOfWork unit;

        public QuestionController(IMapper mapper, UnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unit = unitOfWork;
        }


        [HttpGet]
        [EndpointSummary("Get all questions")]
        public ActionResult GetQuestions()
        {
            List<Question> questions = unit.QuestionRepo.GetQuestionsInfo();
            List<EditQuestionDTO> questionDTOs = mapper.Map<List<EditQuestionDTO>>(questions);
            return Ok(questionDTOs);
        }
        [HttpGet("{id}")]
        [EndpointSummary("Get question by id")]
        public ActionResult GetQuestionByID(int id)
        {
            EditQuestionDTO questionDTO = mapper.Map<EditQuestionDTO>(unit.QuestionRepo.GetQuestionByID(id));
            return Ok(questionDTO);
        }

        [HttpPost]
        [EndpointSummary("Add new question")]
        public ActionResult NewQuestion(AddQuestionDTO NewQuestion)
        {
            Exam editedEx = unit.ExamRepo.getByID(NewQuestion.ExamId);
            editedEx.Grade += NewQuestion.Grade;
            editedEx.MinGrade = (int) Math.Ceiling(editedEx.Grade / 2.0); 
            Question q = mapper.Map<Question>(NewQuestion);
            unit.ExamRepo.Update(editedEx);
            unit.QuestionRepo.Add(q);
            unit.Save();
            return Ok(NewQuestion);
        }

        [HttpPut("{id}")]
        [EndpointSummary("Edit question")]
        public ActionResult EditQuestion(int id, EditQuestionDTO QuestionDTO)
        {
            Question EditedQuestion = unit.QuestionRepo.GetQuestionByID(id);
            int oldGrade = EditedQuestion.Grade;
            mapper.Map(QuestionDTO, EditedQuestion);
            Exam editedEx = unit.ExamRepo.getByID(EditedQuestion.ExamId);
            editedEx.Grade += QuestionDTO.Grade;
            editedEx.Grade -= oldGrade;
            editedEx.MinGrade = (int)Math.Ceiling(editedEx.Grade / 2.0);
            unit.QuestionRepo.Update(EditedQuestion);
            unit.ExamRepo.Update(editedEx);
            
            unit.Save();
            return Ok(QuestionDTO);
        }

        [HttpDelete("{id}")]
        [EndpointSummary("Delete question")]
        public ActionResult DeleteQuestion(int id)
        {
            Question q = unit.QuestionRepo.GetQuestionByID(id);
            int examId= q.ExamId;
            Exam editedEx = unit.ExamRepo.getByID(examId);
            editedEx.Grade -= q.Grade;
            editedEx.MinGrade = (int)Math.Ceiling(editedEx.Grade / 2.0);
            unit.QuestionRepo.Delete(id);
            unit.Save();
            return Ok();
        }

    }
}
