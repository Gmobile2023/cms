using System.Runtime.Serialization;

namespace ServiceStackBaseCms.Domain;


    [DataContract]
    [Serializable]
    public class ListResultDto<T> : IListResult<T>
    {
        [DataMember(Order = 1)]
        private IReadOnlyList<T> _items;

        [DataMember(Order = 2)]
        public IReadOnlyList<T> Items
        {
            get => this._items ?? (this._items = (IReadOnlyList<T>) new List<T>());
            set => this._items = value;
        }

        public ListResultDto()
        {
        }

        public ListResultDto(IReadOnlyList<T> items) => this.Items = items;
    }