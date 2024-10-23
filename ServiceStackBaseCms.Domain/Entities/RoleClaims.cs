using Microsoft.AspNetCore.Identity;
using ServiceStack.DataAnnotations;

namespace ServiceStackBaseCms.Domain.Entities;

public class RoleClaims : IdentityRoleClaim<string>
{
    [AutoIncrement] 
    public int Id { get; set; }
}