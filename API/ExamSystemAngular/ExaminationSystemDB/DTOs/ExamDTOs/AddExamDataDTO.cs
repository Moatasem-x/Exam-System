using ExaminationSystemDB.DTOs.QuestionDTOs;

namespace ExaminationSystemDB.DTOs.ExamDTOs
{
    public class AddExamDataDTO
    {
        public string Name { get; set; }
        public int MinGrade { get; set; }
        public int Grade { get; set; }
        public int Duration { get; set; }
    }
}
