using ExaminationSystemDB.DTOs.AnswerDTOs;
using ExaminationSystemDB.Models;

namespace ExaminationSystemDB.DTOs.QuestionDTOs
{
    public class EditQuestionDTO
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Body { get; set; }
        public int Grade { get; set; }
        public virtual List<AdminAnswerDTO> answers { get; set; }

    }
}
