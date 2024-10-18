using ServiceStack;
using ServiceStack.DataAnnotations;

namespace ServiceStackBaseCms.ServiceModel;

[Description("Pages Management")]
[Alias("pages")]
public class Page : AuditBase
{
    [AutoIncrement]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Permalink { get; set; }
    public string ShortDescription { get; set; }
    public string Content { get; set; }
    public string SeoMeta { get; set; }
    public PageStatus Status { get; set; }
    public string ThumbnailImage { get; set; }
}

public enum PageStatus
{
    Draft,
    Published,
    Archived,
}

[Tag("pages"), Description("Danh sách/Chi tiết page")]
[Route("/pages", "GET")]
[Route("/pages/{Id}", "GET")]
[AutoApply(Behavior.AuditQuery)]
public class QueryPages : QueryDb<Page>
{
    public int? Id { get; set; }
}

[Tag("pages"), Description("Tạo mới page")]
[Route("/pages", "POST")]
[ValidateHasRole(Roles.Manager)]
[AutoApply(Behavior.AuditCreate)]
public class CreatePage : ICreateDb<Page>, IReturn<IdResponse>
{
    public required string Title { get; set; }
    public string Permalink { get; set; }
    public string ShortDescription { get; set; }
    public required string Content { get; set; }
    public string SeoMeta { get; set; }
    public PageStatus Status { get; set; }
    public string ThumbnailImage { get; set; }
}