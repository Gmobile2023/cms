using System.ComponentModel.DataAnnotations.Schema;
using ServiceStack.DataAnnotations;
using ServiceStack.Model;

namespace ServiceStackBaseCms.Domain.Entities;

[Table("todo")]
public class Todo : IHasId<long>
{
    [Column("id")]
    [AutoIncrement]
    public long Id { get; set; }
    [Column("text")]
    public string Text { get; set; }
    [Column("is_finished")]
    public bool IsFinished { get; set; }
}
