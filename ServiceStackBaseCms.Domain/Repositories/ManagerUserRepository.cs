﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStackBaseCms.Domain.Entities;
using ServiceStackBaseCms.ServiceModel;
using Roles = ServiceStackBaseCms.Domain.Entities.Roles;

namespace ServiceStackBaseCms.Domain.Repositories;


public class ManagerUserRepository : IManagerUserRepository
{
    private readonly IDbConnectionFactory _connectionFactory;
    private readonly UserManager<ApplicationUser> _userManager;
    public ManagerUserRepository(IDbConnectionFactory connectionFactory, UserManager<ApplicationUser> userManager)
    {
        _connectionFactory = connectionFactory;
        _userManager = userManager;
    }
    public async Task<bool> CreateUser(CreateUserRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        using var trans = db.OpenTransaction();
        try
        {
            var user = request.ConvertTo<ApplicationUser>();
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
                var role = await _userManager.AddToRolesAsync(user, request.Roles);
                if (role.Succeeded)
                {
                    trans.Commit();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }

        }
        catch (Exception e)
        {
            trans.Rollback();
            return false;
        }
    }
    
    public async Task<bool> UpdateUser(UpdateUserRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var user = request.ConvertTo<Users>();
            var result = await db.UpdateAsync(user);
            if (result != 0)
            {
                var listRole = await _userManager.GetRolesAsync(user);
                if (request.Roles != null && listRole != null)
                {
                    await _userManager.RemoveFromRolesAsync(user, listRole);
                    var role = await _userManager.AddToRolesAsync(user, request.Roles);
                    if (role.Succeeded)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    public async Task<PagedResultDto<Roles>> GetRoles(RolesRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query =  db.From<Roles>();
            if (!string.IsNullOrEmpty(request.Name))
            {
                query = query.Where(x => x.Name.ToLower().Contains(request.Name.ToLower()));
            }

            var total = db.Count(query);
            var roles = await db.SelectAsync(query);
            return new PagedResultDto<Roles>()
            {
                Items = roles,
                TotalCount = total
            };
        }
        catch (Exception e)
        {
            return new PagedResultDto<Roles>()
            {
                Items = new List<Roles>(),
                TotalCount = 0
            };
        }
    }

    public async Task<PagedResultDto<UserClaims>> GetUserClaims(UserClaimsRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query =  db.From<UserClaims>();
            var total = db.Count(query);
            var userClaims = await db.SelectAsync(query);
            return new PagedResultDto<UserClaims>()
            {
                Items = userClaims,
                TotalCount = total
            };
        }
        catch (Exception e)
        {
            return new PagedResultDto<UserClaims>()
            {
                Items = new List<UserClaims>(),
                TotalCount = 0
            };
        }
    }

    public async Task<bool> CreateUserClaim(CreateUserClaimRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var userClaim = request.ConvertTo<UserClaims>();
            await db.InsertAsync(userClaim);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<bool> UpdateUserClaim(UpdateUserClaimRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var userClaim = request.ConvertTo<UserClaims>();
            await db.UpdateAsync(userClaim);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    public async Task<bool> UpdateRoleClaim(UpdateRoleClaim request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var userClaim = request.ConvertTo<RoleClaims>();
            await db.UpdateAsync(userClaim);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    public async Task<bool> CreateRoleClaim(CreateRoleClaim request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var userClaim = request.ConvertTo<RoleClaims>();
            await db.InsertAsync(userClaim);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<RoleClaims> GetRoleClaim(RoleClaimRequest request)
    {
        using var db = _connectionFactory.OpenDbConnection();
        try
        {
            var roleClaim = await db.SingleByIdAsync<RoleClaims>(request.Id);
            return roleClaim;

        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<bool> CreateRole(CreateRolesRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var role = request.ConvertTo<Roles>();
            await db.InsertAsync(role);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<bool> UpdateRole(UpdateRolesRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var role = request.ConvertTo<Roles>();
            await db.UpdateAsync(role);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<PagedResultDto<RoleClaims>> GetRoleClaims(RoleClaimsRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query =  db.From<RoleClaims>();
            var total = db.Count(query);
            var roleClaims = await db.SelectAsync(query);
            return new PagedResultDto<RoleClaims>()
            {
                Items = roleClaims,
                TotalCount = total
            };
        }
        catch (Exception e)
        {
            return new PagedResultDto<RoleClaims>()
            {
                Items = new List<RoleClaims>(),
                TotalCount = 0
            };
        }
    }

    public async Task<UserClaims> GetUserClaim(UserClaimRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
          var userClaim =   await db.SingleByIdAsync<UserClaims>(request.Id);
          return userClaim;

        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<UserDto> GetUser(string  id)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query = db.From<Users>().Where(x => x.Id == id);
           var queryRole = db.From<UserRoles>().LeftJoin<Roles>((ur,u) => ur.RoleId == u.Id).Where(x => x.UserId == id);
           var role = (await db.SelectAsync<Roles>(queryRole)).Select(x => x.Name).ToList();
            var user = await db.SingleAsync<UserDto>(query);
            user.RoleName = role;
            var userDto = user.ConvertTo<UserDto>();
            return userDto;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<PagedResultDto<UserDto>> GetUsers(UsersRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query = db.From<Users>();
            var total = db.Count(query);
            query.Skip(request.SkipCount).Take(request.MaxResultCount);
            var users = db.Select<Users>(query);
            var Roles = db.SelectMulti<Roles, UserRoles>(
                db.From<Roles>()
                    .LeftJoin<UserRoles>((ur, r) => ur.Id == r.RoleId)
            );
            var userRoleMap = Roles.GroupBy(tuple => tuple.Item2.UserId)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(tuple => tuple.Item1).ToList()
                );
            var usersWithRoles = users.Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                DisplayName = u.DisplayName,
                ProfileUrl = u.ProfileUrl,
                UserName = u.UserName,
                Email = u.Email,
                RoleName = userRoleMap.TryGetValue(u.Id, out var roles) 
                    ? roles.Select(r => r.Name).ToList() 
                    : new List<string>()
            }).ToList();

            return new PagedResultDto<UserDto>()
            {
                Items = usersWithRoles,
                TotalCount = total
            };
        }
        catch (Exception e)
        {
            return new PagedResultDto<UserDto>()
            {
                Items = new List<UserDto>(),
                TotalCount = 0,
            };
        }
    }
    
}