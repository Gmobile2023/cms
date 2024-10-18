using System.Runtime.Serialization;

namespace ServiceStackBaseCms.Domain;

public interface IPagedResult<T> : IListResult<T>, IHasTotalCount, IHasSumData<T>
{
}

public interface IHasSumData<T>
{
    T SumData { get; set; }
}

public interface IHasTotalCount
{
    long TotalCount { get; set; }
}

public interface IListResult<T>
{
    [DataMember(Order = 1)]
    IReadOnlyList<T> Items { get; set; }
}