using System.ComponentModel.DataAnnotations;

namespace ExaminationSystemDB.DTOs.AdminDTOs
{
    public class DisplayStudentGradesDTO
    {
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public int StudentGrade { get; set; }
        public int MaxGrade { get; set; }
        public string Status { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        [Display(Name = "Duration Taken (Minutes)")]
        public int DurationTaken { get; set; }
    }
}
