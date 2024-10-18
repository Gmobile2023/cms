using ServiceStackBaseCms.Domain.Entities;
using ServiceStackBaseCms.ServiceModel;
using ServiceStackBaseCms.ServiceModel.Dto;

namespace ServiceStackBaseCms.Domain.Repositories;

public interface IServiceStackBaseRepository
{
    Task<PagedResultDto<Todo>> GetListTodoAsync();
    Task<bool> CreateTodoAsync(CreateTodoRequest request);
    //
    Task<bool> UpdateTodoAsync(UpdateTodoRequest request);

    Task<bool> DeleteTodoAsync(long id);

    Task<TodoDto> GetTodoAsync(long id);
}