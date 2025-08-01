using System.ComponentModel.DataAnnotations;

namespace ExaminationSystemDB.DTOs.ExamDTOs
{
    public class DisplayExamDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinGrade { get; set; }
        public int Grade { get; set; }
        [Display(Name="Duration in Minutes")]
        public int duration { get; set; }
    }
}
