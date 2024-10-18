using ServiceStackBaseCms.Domain.Entities;
using ServiceStackBaseCms.ServiceModel;
using Roles = ServiceStackBaseCms.Domain.Entities.Roles;

namespace ServiceStackBaseCms.Domain.Repositories;

public interface IManagerUserRepository
{
    Task<bool> CreateUser(CreateUserRequest request);
    Task<bool> UpdateUser(UpdateUserRequest request);
    Task<UserDto> GetUser(string id);
    Task<PagedResultDto<UserDto>> GetUsers(UsersRequest request);
    Task<PagedResultDto<Roles>> GetRoles(RolesRequest request);

}