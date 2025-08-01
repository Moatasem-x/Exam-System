using System.ComponentModel.DataAnnotations;

namespace ExaminationSystemDB.DTOs.AnswerDTOs
{
    public class AdminAnswerDTO
    {

        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }

    }
}
