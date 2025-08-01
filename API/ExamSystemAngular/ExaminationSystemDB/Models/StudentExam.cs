using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExaminationSystemDB.Models
{
    [PrimaryKey(nameof(StudentId), nameof(ExamId))]
    public class StudentExam
    {

        [ForeignKey("student")]
        public int StudentId { get; set; }
        [ForeignKey("exam")]
        public int ExamId { get; set; }
        [Required]
        public int StudentGrade { get; set; }
        [Required]
        public DateTime StartTime { get; set; } 
        [Required]
        public DateTime EndTime { get; set; }
        public virtual Student student {  get; set; }
        public virtual Exam exam {  get; set; }
        
    }
}
