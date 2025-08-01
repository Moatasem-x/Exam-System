using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExaminationSystemDB.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public int Grade { get; set; }
        [ForeignKey("exam")]
        public int ExamId { get; set; }

        public virtual Exam exam { get; set; } 
        public virtual List<Answer> answers { get; set; } = new List<Answer>();


    }
}
