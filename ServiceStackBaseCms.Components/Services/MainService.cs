using ServiceStackBaseCms.Domain.Repositories;
using ServiceStackBaseCms.ServiceModel;
using ServiceStack;
namespace ServiceStackBaseCms.Components.Services;

public class MainService : Service
{
    private readonly IServiceStackBaseRepository _serviceStackBaseRepository;

    public MainService(IServiceStackBaseRepository serviceStackBaseRepository)
    {
        _serviceStackBaseRepository = serviceStackBaseRepository;
    }

    public async Task<object> GetAsync(QueryTodos request)
    {
        return _serviceStackBaseRepository.GetListTodoAsync();
    }
    public async Task<object> GetAsync(GetTodoRequest request)
    {
        return _serviceStackBaseRepository.GetTodoAsync(request.Id);
    }
    public async Task<object> DeleteAsync(DeleteTodoRequest request)
    {
        return _serviceStackBaseRepository.DeleteTodoAsync(request.Id);
    }
    public async Task<object> PostAsync(CreateTodoRequest request)
    {
        return _serviceStackBaseRepository.CreateTodoAsync(request);
    }
    public async Task<object> PutAsync(UpdateTodoRequest request)
    {
        return _serviceStackBaseRepository.UpdateTodoAsync(request);
    }
}