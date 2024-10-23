using Microsoft.AspNetCore.Identity;
using ServiceStack.DataAnnotations;

namespace ServiceStackBaseCms.Domain.Entities;

public class UserClaims : IdentityUserClaim<string>
{
    [AutoIncrement] 
    public int Id { get; set; }
}