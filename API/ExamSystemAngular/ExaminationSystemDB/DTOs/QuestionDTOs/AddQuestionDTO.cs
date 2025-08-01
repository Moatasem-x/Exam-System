using ExaminationSystemDB.DTOs.AnswerDTOs;

namespace ExaminationSystemDB.DTOs.QuestionDTOs
{
    public class AddQuestionDTO
    {

        public int ExamId { get; set; }
        public string Type { get; set; }
        public string Body { get; set; }
        public int Grade { get; set; }
        public virtual List<AdminAnswerDTO> answers { get; set; }

    }
}
