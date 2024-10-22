using Microsoft.AspNetCore.Authorization;
using ServiceStackBaseCms.Domain.Repositories;
using ServiceStackBaseCms.ServiceModel;
using ServiceStack;
namespace ServiceStackBaseCms.Components.Services;

public class MainService : Service
{
    private readonly IServiceStackBaseRepository _serviceStackBaseRepository;
    private readonly IManagerUserRepository _managerUserRepository;

    public MainService(IServiceStackBaseRepository serviceStackBaseRepository,
        IManagerUserRepository managerUserRepository)
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
    
    // public async Task<object> PostAsync(PermissionsRequest request)
    // {
    //     return QueryResponse()
    // }

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

    public async Task<object> GetAsync(UserClaimRequest request)
    {
        return await _managerUserRepository.GetUserClaim(request);
    }
    
    public async Task<object> GetAsync(UserClaimsRequest request)
    {
        return await _managerUserRepository.GetUserClaims(request);
    }
    
    public async Task<object> PutAsync(UpdateUserClaimRequest request)
    {
        return await _managerUserRepository.UpdateUserClaim(request);
    }
    
    public async Task<object> PostAsync(CreateUserClaimRequest request)
    {
        return await _managerUserRepository.CreateUserClaim(request);
    }
    public async Task<object> GetAsync(RoleClaimsRequest request)
    {
        return await _managerUserRepository.GetRoleClaims(request);
    }
    
    public async Task<object> GetAsync(RoleClaimRequest request)
    {
        return await _managerUserRepository.GetRoleClaim(request);
    }
    
    public async Task<object> PostAsync(CreateRolesRequest request)
    {
        return await _managerUserRepository.CreateRole(request);
    }
    
    public async Task<object> PutAsync(UpdateRolesRequest request)
    {
        return await _managerUserRepository.UpdateRole(request);
    }
    
    public async Task<object> PutAsync(UpdateRoleClaim request)
    {
        return await _managerUserRepository.UpdateRoleClaim(request);
    }
    
    public async Task<object> PostAsync(CreateRoleClaim request)
    {
        return await _managerUserRepository.CreateRoleClaim(request);
    }
}