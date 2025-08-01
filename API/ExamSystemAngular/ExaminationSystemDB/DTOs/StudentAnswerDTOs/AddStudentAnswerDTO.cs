using System.ComponentModel.DataAnnotations.Schema;

namespace ExaminationSystemDB.DTOs.StudentAnswerDTOs
{
    public class AddStudentAnswerDTO
    {
        public int StudentId { get; set; }
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
    }
}
