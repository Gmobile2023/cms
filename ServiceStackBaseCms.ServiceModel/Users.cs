using Microsoft.AspNetCore.Authorization;
using ServiceStack;

namespace ServiceStackBaseCms.ServiceModel;

[Tag("Admin")]

[Route("/users", "GET")]
public class UsersRequest : PagedAndSortedRequest
{
    public string Name { get; set; }
}

[Tag("Admin")]
[Route("/user/{Id}", "GET")]
public class UserRequest
{
    public string Id { get; set; }
}

[Tag("Admin")]
[ValidateHasRole("Admin")]
[Route("/user", "POST")]
public class CreateUserRequest
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? DisplayName { get; set; }
    public string? ProfileUrl { get; set; }
    public string? UserName { get; set; }

    public string? NormalizedUserName { get; set; }
    public string? Email { get; set; }


    public string? NormalizedEmail { get; set; }


    public bool EmailConfirmed { get; set; }


    public string? Password { get; set; }


    public string? SecurityStamp { get; set; }

    public string? ConcurrencyStamp { get; set; } = Guid.NewGuid().ToString();

    public string? PhoneNumber { get; set; }

    public bool PhoneNumberConfirmed { get; set; }

    public bool TwoFactorEnabled { get; set; }
    public DateTimeOffset? LockoutEnd { get; set; }

    public bool LockoutEnabled { get; set; }

    public override string ToString()
        => UserName ?? string.Empty;

    public List<string> Roles { get; set; }
}

[Tag("Admin")]
[ValidateHasRole("Admin")]
[Route("/user", "PUT")]
public class UpdateUserRequest
{
    public string? Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? DisplayName { get; set; }
    public string? ProfileUrl { get; set; }
    public string? UserName { get; set; }

    public string? NormalizedUserName { get; set; }
    public string? Email { get; set; }


    public string? NormalizedEmail { get; set; }


    public bool EmailConfirmed { get; set; }


    public string? Password { get; set; }


    public string? SecurityStamp { get; set; }

    public string? ConcurrencyStamp { get; set; } = Guid.NewGuid().ToString();

    public string? PhoneNumber { get; set; }

    public bool PhoneNumberConfirmed { get; set; }

    public bool TwoFactorEnabled { get; set; }
    public DateTimeOffset? LockoutEnd { get; set; }

    public bool LockoutEnabled { get; set; }

    public override string ToString()
        => UserName ?? string.Empty;

    public List<string> Roles { get; set; }
}