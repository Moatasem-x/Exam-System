using System.ComponentModel.DataAnnotations;

namespace ExaminationSystemDB.DTOs.AdminDTOs
{
    public class DisplayExamSummaryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinGrade { get; set; }
        public int MaxGrade { get; set; }
        [Display(Name = "Duration (Minutes)")]
        public int DurationInMinutes { get; set; }
        public int TotalQuestions { get; set; }
    }


}
