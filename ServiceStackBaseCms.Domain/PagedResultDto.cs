using System.Runtime.Serialization;

namespace ServiceStackBaseCms.Domain;

public class PagedResultDto<T> : ListResultDto<T>,IPagedResult<T>
{
    [DataMember(Order = 1)]
    public long TotalCount { get; set; }

    public PagedResultDto()
    {
    }

    public PagedResultDto(long totalCount, IReadOnlyList<T> items)
        : base(items)
    {
        this.TotalCount = totalCount;
    }

    [DataMember(Order = 2)]
    public T SumData { get; set; }
}