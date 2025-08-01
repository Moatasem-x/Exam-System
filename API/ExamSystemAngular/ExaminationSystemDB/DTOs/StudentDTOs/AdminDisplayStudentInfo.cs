using System.ComponentModel.DataAnnotations;

namespace ExaminationSystemDB.DTOs.StudentDTOs
{
    public class AdminDisplayStudentInfo
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

    }
}
