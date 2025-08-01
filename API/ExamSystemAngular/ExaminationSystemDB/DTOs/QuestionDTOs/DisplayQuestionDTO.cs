using ExaminationSystemDB.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExaminationSystemDB.DTOs.QuestionDTOs
{
    public class DisplayQuestionDTO
    {
        public string Type { get; set; }
        public string Body { get; set; }
        public int Grade { get; set; }
        public int ExamId { get; set; }

    }
}
