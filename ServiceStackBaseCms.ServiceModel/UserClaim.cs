using ServiceStack;

namespace ServiceStackBaseCms.ServiceModel;


[Tag("UserClaims")]
[Route("/UserClaims", "GET")]
public class UserClaimsRequest : QueryBase, IReturn<QueryResponse<UserClaimsDto>>
{
    
}

[Tag("UserClaims")]
[Route("/UserClaim/{Id}")]
public class DeleteClaimRequest
{
    public int Id { get; set; }
}

[Tag("UserClaims")]
[Route("/UserClaim/{Id}", "GET")]
public class UserClaimRequest
{
    public int Id { get; set; }
}

[Tag("UserClaims")]
[Route("/UserClaim", "POST")]
public class CreateUserClaimRequest
{
    public int Id { get; set; }

    public string UserId { get; set; }

    public string? ClaimType { get; set; }

    public string? ClaimValue { get; set; }
}

[Tag("UserClaims")]
[Route("/UserClaim", "PUT")]
public class UpdateUserClaimRequest
{
    public int Id { get; set; }
    public string? ClaimValue { get; set; }
}


