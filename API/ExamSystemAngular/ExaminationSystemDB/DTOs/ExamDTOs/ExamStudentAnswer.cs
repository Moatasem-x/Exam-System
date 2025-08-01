using ExaminationSystemDB.DTOs.AnswerDTOs;

namespace ExaminationSystemDB.DTOs.ExamDTOs
{
    public class ExamStudentAnswer
    {

        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public int Grade { get; set; }
        public List<AnswerDTO> Answers { get; set; } = new();

        public int? StudentAnswerId { get; set; }
        public int CorrectAnswerId { get; set; }

    }
}
