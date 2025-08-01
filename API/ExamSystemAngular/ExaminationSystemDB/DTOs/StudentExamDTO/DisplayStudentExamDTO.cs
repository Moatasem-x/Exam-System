using ExaminationSystemDB.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExaminationSystemDB.DTOs.StudentExamDTO
{
    public class DisplayStudentExamDTO
    {
        public int ExamID { get; set; }
        public string ExamName { get; set; }
        public int StudentGrade { get; set; }
        public int ExamGrade { get; set; }
        public int MinGrade { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
