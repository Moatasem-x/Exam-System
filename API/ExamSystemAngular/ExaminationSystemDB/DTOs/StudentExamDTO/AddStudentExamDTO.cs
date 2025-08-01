using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExaminationSystemDB.DTOs.StudentExamDTO
{
    public class AddStudentExamDTO
    {
        public int StudentId { get; set; }
        public int ExamId { get; set; }
        public int StudentGrade { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
