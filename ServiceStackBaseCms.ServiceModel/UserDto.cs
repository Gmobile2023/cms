using System.ComponentModel.DataAnnotations.Schema;

namespace ServiceStackBaseCms.ServiceModel;

public class UserDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? DisplayName { get; set; }
    public string? ProfileUrl { get; set; }
    public  string? UserName { get; set; }
    public string? Email { get; set; }
    public List<string> RoleName { get; set; }
}