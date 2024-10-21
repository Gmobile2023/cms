namespace ServiceStackBaseCms.Domain.Entities;

public class EndpointPermission
{
    public int Id { get; set; }
    public string Endpoint { get; set; }
    public string RequiredRole { get; set; }
}