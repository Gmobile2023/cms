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

    public async Task<object> PostAsync(CreateUserRequest request)
    {
        return _managerUserRepository.CreateUser(request);
    }
    
    public async Task<object> PostAsync(UpdateUserRequest request)
    {
        return _managerUserRepository.UpdateUser(request);
    }

    public async Task<object> GetAsync(UsersRequest request)
    {
        return _managerUserRepository.GetUsers(request);
    }
    public async Task<object> GetAsync(UserRequest request)
    {
        return _managerUserRepository.GetUser(request.Id);
    }

    public async Task<object> GetAsync(RolesRequest request)
    {
        return _managerUserRepository.GetRoles(request);
    }
}