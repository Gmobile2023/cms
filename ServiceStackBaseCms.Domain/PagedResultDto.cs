// using System;
// using System.Collections.Generic;
// using System.Runtime.Serialization;
// using ServiceStack;
// using ServiceStackBaseCms.ServiceModel;
//
// namespace iZota.Core.Shared
// {
//     [DataContract]
//     public class PagedAndSortedRequest
//     {
//         [DataMember(Order = 1)] public virtual string Sorting { get; set; }
//         [DataMember(Order = 2)] public virtual string Filter { get; set; }
//         [DataMember(Order = 3)] public virtual int SkipCount { get; set; }
//         [DataMember(Order = 4)] public virtual int MaxResultCount { get; set; } = 10;
//     }
//
//     public interface IListResult<T>
//     {
//         [DataMember(Order = 1)] IReadOnlyList<T> Items { get; set; }
//     }
//
//     [Serializable]
//     [DataContract]
//     public class ListResultDto<T> : IListResult<T>
//     {
//         [DataMember(Order = 1)] private IReadOnlyList<T> _items;
//
//         [DataMember(Order = 2)]
//         public IReadOnlyList<T> Items
//         {
//             get => this._items ??= (IReadOnlyList<T>)new List<T>();
//             set => this._items = value;
//         }
//
//         public ListResultDto()
//         {
//         }
//
//         public ListResultDto(IReadOnlyList<T> items) => this.Items = items;
//     }
//
//     [Serializable]
//     [DataContract]
//     public class PagedResultDto<T> : ListResultDto<T>, IPagedResult<T>, IListResult<T>, IHasTotalCount, IHasSumData<T>
//     {
//         [DataMember(Order = 1)] public long TotalCount { get; set; }
//
//         public PagedResultDto()
//         {
//         }
//
//         public PagedResultDto(long totalCount, IReadOnlyList<T> items)
//             : base(items)
//             => this.TotalCount = totalCount;
//
//         [DataMember(Order = 2)] public T SumData { get; set; }
//         [DataMember(Order = 3)] public ResStatus ResponseStatus { get; set; }
//     }
//
//     public interface IPagedResult<T> : IListResult<T>, IHasTotalCount, IHasSumData<T>
//     {
//     }
//
//     public interface IHasTotalCount
//     {
//         long TotalCount { get; set; }
//     }
//
//     public interface IHasSumData<T>
//     {
//         T SumData { get; set; }
//     }
//     
//     [DataContract]
//     public class ResStatus
//     {
//         /// <summary>
//         /// Initializes a new instance of the <see cref="ResponseStatus"/> class.
//         /// 
//         /// A response status without an errorcode == success
//         /// </summary>
//         public ResStatus()
//         {
//         }
//
//         /// <summary>
//         /// Initializes a new instance of the <see cref="ResponseStatus"/> class.
//         /// A response status with an errorcode == failure
//         /// </summary>
//         public ResStatus(string errorCode)
//         {
//             this.ErrorCode = errorCode;
//         }
//
//         /// <summary>
//         /// Initializes a new instance of the <see cref="ResponseStatus"/> class.
//         /// A response status with an errorcode == failure
//         /// </summary>
//         public ResStatus(string errorCode, string message)
//             : this(errorCode)
//         {
//             this.Message = message;
//         }
//
//         /// <summary>
//         /// Holds the custom ErrorCode enum if provided in ValidationException
//         /// otherwise will hold the name of the Exception type, e.g. typeof(Exception).Name
//         /// 
//         /// A value of non-null means the service encountered an error while processing the request.
//         /// </summary>
//         [DataMember(Order = 1)]
//         public string ErrorCode { get; set; }
//
//         /// <summary>
//         /// A human friendly error message
//         /// </summary>
//         [DataMember(Order = 2)]
//         public string Message { get; set; }
//
//         [DataMember(Order = 3)] public string TransCode { get; set; }
//         [DataMember(Order = 4)] public MessageInfo MessageInfo { get; set; }
//     }
// }