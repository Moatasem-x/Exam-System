using Microsoft.AspNetCore.Identity;
using ExamSystemApi.Models;
using ExamSystemApi.DTOs;
using ExaminationSystemDB.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamSystemApi.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto model);
        Task<AuthResponseDto> LoginAsync(LoginDto model);
        Task<bool> LogoutAsync(string userId);
    }

    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ExamContext _context;

        public AuthService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IJwtService jwtService,
            RoleManager<IdentityRole> roleManager,
            ExamContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _roleManager = roleManager;
            _context = context;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto model)
        {
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User already exists");
            }

            // Create ApplicationUser
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            // Add Student role
            await _userManager.AddToRoleAsync(user, "Student");

            // Create Student record
            var student = new Student
            {
                Name = $"{model.FirstName} {model.LastName}",
                Email = model.Email,
                Address = model.Address,
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password),
                ApplicationUserId = user.Id
            };

            _context.Student.Add(student);
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user, "Student", student.ID);

            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = "Student",
                StudentId = student.ID,
                ExpiresAt = DateTime.UtcNow.AddHours(24)
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !user.IsActive)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            int? studentId = null;
            if (role == "Student")
            {
                var student = await _context.Student.FirstOrDefaultAsync(s => s.ApplicationUserId == user.Id);
                studentId = student?.ID;
            }

            var token = _jwtService.GenerateToken(user, role, studentId);

            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = role,
                StudentId = studentId,
                ExpiresAt = DateTime.UtcNow.AddHours(24)
            };
        }

        public async Task<bool> LogoutAsync(string userId)
        {
            await _signInManager.SignOutAsync();
            return true;
        }
    }
}