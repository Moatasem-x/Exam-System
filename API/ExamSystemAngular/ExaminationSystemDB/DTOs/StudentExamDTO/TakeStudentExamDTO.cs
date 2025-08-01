using ExaminationSystemDB.DTOs.QuestionDTOs;

namespace ExaminationSystemDB.DTOs.StudentExamDTO
{
    public class TakeStudentExamDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinGrade { get; set; }
        public int Grade { get; set; }
        public int Duration { get; set; }
        public virtual List<getStudentQuestionDTO> question { get; set; }
    }
}
