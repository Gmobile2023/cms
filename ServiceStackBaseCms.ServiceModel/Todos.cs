using ServiceStack;
using ServiceStack.Model;
using ServiceStackBaseCms.ServiceModel.Dto;

namespace ServiceStackBaseCms.ServiceModel;

[Tag("todos")]
[Route("/todos", "GET")]
public class QueryTodos 
{
    public int? Id { get; set; }
    public List<long>? Ids { get; set; }
    public string? TextContains { get; set; }
}

[Tag("todos")]
[Route("/todos", "POST")]
public class CreateTodoRequest : IPost, IReturn<TodoDto>
{
    [ValidateNotEmpty]
    public string Text { get; set; }
    
}

[Tag("todos")]
[Route("/todos/{Id}", "PUT")]
public class UpdateTodoRequest : IPut, IReturn<TodoDto>
{
    public long Id { get; set; }
    [ValidateNotEmpty]
    public string Text { get; set; }
    public bool IsFinished { get; set; }
}

[Tag("todos")]
[Route("/todos/{Id}", "GET")]
public class GetTodoRequest : IGet, IReturn<TodoDto>
{
    public long Id { get; set; }
}

[Tag("todos")]
[Route("/todos/{Id}", "DELETE")]
public class DeleteTodoRequest : IDelete, IReturnVoid
{
    public long Id { get; set; }
}

[Tag("todos")]
[Route("/todos", "DELETE")]
public class DeleteTodos : IDelete, IReturnVoid
{
    public List<long> Ids { get; set; }
}

