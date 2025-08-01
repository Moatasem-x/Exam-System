﻿using Microsoft.AspNetCore.Identity;

namespace ExamSystemApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
        public virtual ExaminationSystemDB.Models.Student Student { get; set; }
    }

    public enum UserRole
    {
        Admin,
        Student
    }
}