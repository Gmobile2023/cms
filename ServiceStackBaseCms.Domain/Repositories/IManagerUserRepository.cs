
using ServiceStack;
using ServiceStackBaseCms.Domain.Entities;
using ServiceStackBaseCms.ServiceModel;
using Roles = ServiceStackBaseCms.Domain.Entities.Roles;
namespace ServiceStackBaseCms.Domain.Repositories;

public interface IManagerUserRepository
{
    Task<bool> CreateUser(CreateUserRequest request);
    Task<bool> UpdateUser(UpdateUserRequest request);
    Task<UserDto> GetUser(string id);
    Task<QueryResponse<UserDto>> GetUsers(UsersRequest request);
    Task<QueryResponse<Roles>> GetRoles(RolesRequest request);
    Task<QueryResponse<UserClaims>> GetUserClaims(UserClaimsRequest request);
    Task<bool> CreateUserClaim(CreateUserClaimRequest request);
    Task<bool> UpdateUserClaim(UpdateUserClaimRequest request);
    Task<UserClaims> GetUserClaim(UserClaimRequest request);
    Task<QueryResponse<RoleClaims>> GetRoleClaims(RoleClaimsRequest request);
    Task<bool> UpdateRoleClaim(UpdateRoleClaim request);
    Task<bool> CreateRoleClaim(CreateRoleClaim request);
    Task<RoleClaims> GetRoleClaim(RoleClaimRequest request);

    Task<bool> CreateRole(CreateRolesRequest request);
    
    Task<bool> UpdateRole(UpdateRolesRequest request);
}