using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace ExaminationSystemDB.Models
{
    public class Answer
    {
        [Key]
        public int ID { get; set; }
        [ForeignKey("question")]
        [Required]
        public int QuestionId { get; set; }
        [MaxLength(100)]
        [Required]
        public string AnswerText { get; set; }
        [Required]
        public bool IsCorrect { get; set; }
        public virtual Question question { get; set; }
        public virtual List<StudentAnswer> studentAnswer { get; set; } = new List<StudentAnswer>();


    }
}
