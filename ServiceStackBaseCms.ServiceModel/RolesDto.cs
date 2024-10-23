namespace ServiceStackBaseCms.ServiceModel;

public class RolesDto
{
    public string Id { get; set; }

    
    public string? Name { get; set; }

    
    public string? NormalizedName { get; set; }
    
    public string? ConcurrencyStamp { get; set; }
    
    public List< RoleClaimsDto> RoleClaims{ get; set; }
}