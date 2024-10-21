using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using ServiceStackBaseCms.Data;

namespace ServiceStackBaseCms;

public class RoleMiddleware
{
    private readonly RequestDelegate _next;
    
    private readonly IServiceScopeFactory _scopeFactory;

    public RoleMiddleware(RequestDelegate next, IServiceScopeFactory scopeFactory)
    {
        _next = next;
        
        _scopeFactory = scopeFactory;
    }

    public async Task Invoke(HttpContext context)
    {
        using (var scope = _scopeFactory.CreateScope())
        {
            var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var endpoint = context.Request.Path.ToString();
            var userRoles = context.User.Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value)
                .ToList();

            var requiredRole = await _context.EndpointPermissions
                .Where(ep => ep.Endpoint == endpoint)
                .Select(ep => ep.RequiredRole)
                .FirstOrDefaultAsync();

            if (requiredRole != null && !userRoles.Contains(requiredRole))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Access Denied");
                return;
            }

            await _next(context);
        }
    }
    
}