using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace ExaminationSystemDB.Models
{
    [PrimaryKey(nameof(StudentId), nameof(QuestionId),nameof(AnswerId))]
    public class StudentAnswer
    {
        [ForeignKey("student")]
        public int StudentId { get; set; }

        [ForeignKey("question")]
        public int QuestionId { get; set; }
        [ForeignKey("answer")]
        public int AnswerId { get; set; }
        public virtual Answer answer { get; set; }
        public virtual Student student { get; set; }
        public virtual Question question { get; set; }
    }
}
