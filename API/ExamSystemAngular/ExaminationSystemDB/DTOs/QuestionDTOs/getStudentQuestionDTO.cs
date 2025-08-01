using ExaminationSystemDB.DTOs.AnswerDTOs;

namespace ExaminationSystemDB.DTOs.QuestionDTOs
{
    public class getStudentQuestionDTO
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Body { get; set; }
        public int Grade { get; set; }
        public virtual List<StudentAnswersDTO> answers { get; set; }
    }
}
