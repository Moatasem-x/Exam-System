using ExaminationSystemDB.DTOs.QuestionDTOs;
using ExaminationSystemDB.Models;
using System.ComponentModel.DataAnnotations;

namespace ExaminationSystemDB.DTOs.ExamDTOs
{
    public class AdminExamDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinGrade { get; set; }
        public int Grade { get; set; }
        public int Duration { get; set; }
        public virtual List<AddQuestionDTO> question { get; set; } 

    }
}
