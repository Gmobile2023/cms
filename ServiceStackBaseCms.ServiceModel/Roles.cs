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
