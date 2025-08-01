using ExamSystemApi.Models;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Xml.Linq;

namespace ExaminationSystemDB.Models
{
    public class Exam
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name{ get; set; }
        [Required]
        public int MinGrade { get; set; }
        [Required]
        public int Grade { get; set; }
        [Required]
        public int Duration { get; set; }

        public virtual List<StudentExam> studentExams { get; set; } = new List<StudentExam>();
        public virtual List<Question> question { get; set; } = new List<Question>();



    }
}
