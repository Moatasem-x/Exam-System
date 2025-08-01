using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ExaminationSystemDB.Authorization
{
    public class StudentOwnershipAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var userRole = user.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            // Allow admin access to all data
            if (userRole == "Admin")
            {
                return;
            }

            // For students, check if they're accessing their own data
            if (userRole == "Student")
            {
                var studentIdFromToken = user.FindFirst("StudentId")?.Value;
                var studentIdFromRoute = context.RouteData.Values["studentId"]?.ToString();

                if (studentIdFromToken != studentIdFromRoute)
                {
                    context.Result = new ForbidResult();
                    return;
                }
            }
        }
    }
}