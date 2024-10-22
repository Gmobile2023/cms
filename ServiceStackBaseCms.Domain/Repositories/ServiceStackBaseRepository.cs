using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStackBaseCms.Domain.Entities;
using ServiceStackBaseCms.ServiceModel;
using ServiceStackBaseCms.ServiceModel.Dto;

namespace ServiceStackBaseCms.Domain.Repositories;

public class ServiceStackBaseRepository : IServiceStackBaseRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ServiceStackBaseRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    public async Task<QueryResponse<Todo>> GetListTodoAsync()
    {
       using var db =  _connectionFactory.OpenDbConnection();
       try
       {
           var query = db.From<Todo>();
           var total =(int) db.Count(query);
           var todos = await db.SelectAsync(query);
           return new QueryResponse<Todo>()
           {
               Total = total,
               Results = todos,
           };
       }
       catch (Exception ex)
       {
           return new QueryResponse<Todo>()
           {
               Total = 0,
               Results = new List<Todo>(),
           };
       }

    }

    public async Task<bool> CreateTodoAsync(CreateTodoRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var todo = request.ConvertTo<Todo>();
            await db.InsertAsync(todo);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<bool> UpdateTodoAsync(UpdateTodoRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var todo = request.ConvertTo<Todo>();
            await db.UpdateAsync(todo);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }


    public async Task<bool> DeleteTodoAsync(long id)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            await db.DeleteByIdAsync<Todo>(id);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<TodoDto> GetTodoAsync(long id)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
           var result =  await db.SingleByIdAsync<Todo>(id);
             var resultDto = result.ConvertTo<TodoDto>();
            return resultDto;
        }
        catch (Exception e)
        {
            return null;
        }
    }
}