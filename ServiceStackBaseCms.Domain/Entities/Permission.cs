namespace ServiceStackBaseCms.Domain.Entities;

public abstract class Permission
{
    public int Id { get; set; }
    public string ClaimType { get; set; }
    public string ClaimValue { get; set; }
}