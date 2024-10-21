using ServiceStack;

namespace ServiceStackBaseCms.ServiceModel;

public class Roles
{
    public const string Admin = nameof(Admin);
    public const string Manager = nameof(Manager);
    public const string Employee = nameof(Employee);
}

[Tag("Role")]
[Route("/roles", "GET")]
public class RolesRequest
{
    public string Name { get; set; }
}


[Tag("Role")]
[Route("/role", "POST")]
public class CreateRolesRequest
{
    public string Id { get; set; }
    public string? Name { get; set; }
    public  string? NormalizedName { get; set; }
    public string? ConcurrencyStamp { get; set; }

}


[Tag("Role")]
[Route("/role", "PUT")]
public class UpdateRolesRequest
{
    public string Id { get; set; }
    public string? Name { get; set; }
    public  string? NormalizedName { get; set; }
    public string? ConcurrencyStamp { get; set; }
}
