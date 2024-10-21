using ServiceStack;

namespace ServiceStackBaseCms.ServiceModel;


[Tag("RoleClaim")]
[Route("/RoleClaim", "POST")]
public class CreateRoleClaim
{
    public int Id { get; set; }

    
    public  string RoleId { get; set; }

    
    public  string? ClaimType { get; set; }

    
    public  string? ClaimValue { get; set; }

}
[Tag("RoleClaim")]
[Route("/RoleClaim", "PUT")]
public class UpdateRoleClaim
{
    public int Id { get; set; }
    public  string RoleId { get; set; }
    public  string? ClaimValue { get; set; }

}

[Tag("RoleClaim")]
[Route("/RoleClaims", "GET")]
public class RoleClaimsRequest
{
    public int Id { get; set; }
    public  string RoleId { get; set; }
    public  string? ClaimValue { get; set; }
}

[Tag("RoleClaim")]
[Route("/RoleClaim/{Id}", "GET")]
public class RoleClaimRequest
{
    public int Id { get; set; }
}