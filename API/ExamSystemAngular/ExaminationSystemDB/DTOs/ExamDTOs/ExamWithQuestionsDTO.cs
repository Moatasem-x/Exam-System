using ExaminationSystemDB.DTOs.QuestionDTOs;

namespace ExaminationSystemDB.DTOs.ExamDTOs
{
    public class ExamWithQuestionsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinGrade { get; set; }
        public int Grade { get; set; }
        public int Duration { get; set; }
        public virtual List<EditQuestionDTO> question { get; set; }
    }
}
