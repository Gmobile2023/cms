using ServiceStackBaseCms.Domain.Repositories;
using ServiceStackBaseCms.ServiceModel;
using ServiceStack;
namespace ServiceStackBaseCms.Components.Services;

public class MainService : Service
{
    private readonly IServiceStackBaseRepository _serviceStackBaseRepository;
    private readonly IManagerUserRepository _managerUserRepository;
    public MainService(IServiceStackBaseRepository serviceStackBaseRepository, IManagerUserRepository managerUserRepository)
    {
        _serviceStackBaseRepository = serviceStackBaseRepository;
        _managerUserRepository = managerUserRepository;
    }

    public async Task<object> GetAsync(QueryTodos request)
    {
        return await _serviceStackBaseRepository.GetListTodoAsync();
    }
    public async Task<object> GetAsync(GetTodoRequest request)
    {
        return await _serviceStackBaseRepository.GetTodoAsync(request.Id);
    }
    public async Task<object> DeleteAsync(DeleteTodoRequest request)
    {
        return await _serviceStackBaseRepository.DeleteTodoAsync(request.Id);
    }
    public async Task<object> PostAsync(CreateTodoRequest request)
    {
        return await _serviceStackBaseRepository.CreateTodoAsync(request);
    }
    public async Task<object> PutAsync(UpdateTodoRequest request)
    {
        return await _serviceStackBaseRepository.UpdateTodoAsync(request);
    }

    public async Task<object> PostAsync(CreateUserRequest request)
    {
        return await _managerUserRepository.CreateUser(request);
    }
    
    public async Task<object> PutAsync(UpdateUserRequest request)
    {
        return await _managerUserRepository.UpdateUser(request);
    }

    public async Task<object> GetAsync(UsersRequest request)
    {
        return await _managerUserRepository.GetUsers(request);
    }
    public async Task<object> GetAsync(UserRequest request)
    {
        return await _managerUserRepository.GetUser(request.Id);
    }

    public async Task<object> GetAsync(RolesRequest request)
    {
        return await _managerUserRepository.GetRoles(request);
    }
}