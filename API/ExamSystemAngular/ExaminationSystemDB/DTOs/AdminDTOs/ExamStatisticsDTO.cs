namespace ExaminationSystemDB.DTOs.AdminDTOs
{
    public class ExamStatisticsDTO
    {
        public string ExamName { get; set; }
        public int TotalStudents { get; set; }
        public double AverageGrade { get; set; }
        public int HighestGrade { get; set; }
        public int LowestGrade { get; set; }
        public int PassedStudents { get; set; }
        public int FailedStudents { get; set; }
        public double PassRate { get; set; }
    }
}
