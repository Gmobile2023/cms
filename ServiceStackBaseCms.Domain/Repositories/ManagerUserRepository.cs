using System.Security.Claims;
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
    private readonly RoleManager<IdentityRole> _roleManager;
    public ManagerUserRepository(IDbConnectionFactory connectionFactory, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _connectionFactory = connectionFactory;
        _userManager = userManager;
        _roleManager = roleManager;
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
                if (request.Roles != null)
                {
                    var role = await _userManager.AddToRolesAsync(user, request.Roles);
                    
                }
                var listUserClaim = new List<UserClaims>();
                foreach (var userClaim in request.UserClaims)
                {
                    var userClaims = new UserClaims()
                    {
                        UserId = user.Id,
                        ClaimValue = userClaim.ClaimValue,
                        ClaimType = userClaim.ClaimValue,
                    };
                    listUserClaim.Add(userClaims);
                }
                await db.InsertAllAsync(listUserClaim);
                trans.Commit();
                return true;
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
    using var db = _connectionFactory.OpenDbConnection();
    using var trans = db.OpenTransaction();
    
    try
    {
        // Lấy người dùng từ cơ sở dữ liệu
        var user = await db.SingleByIdAsync<Users>(request.Id);
        if (user == null) return false; // Kiểm tra nếu người dùng không tồn tại

        // Cập nhật thông tin người dùng
        user.Email = request.Email;
        user.UserName = request.UserName;
        user.LastName = request.LastName;
        user.PhoneNumber = request.PhoneNumber;
        user.NormalizedEmail = request.Email.ToUpper();
        user.NormalizedUserName = request.UserName.ToUpper();
        var result = await db.UpdateAsync(user);
        if (result == 0) return false;
        var currentRoles = await _userManager.GetRolesAsync(user);
        var rolesToUpdate = request.Roles ?? new List<string>();
        
        await db.DeleteAsync<UserRoles>(x => x.UserId == user.Id);
        
        var rolesInDb = (await db.SelectAsync<Roles>()).ToList(); 
        var roleDictionary = new Dictionary<string, string>();
        
        foreach (var role in rolesInDb)
        {
            roleDictionary[role.Name] = role.Id;
        }
        var userRoles = rolesToUpdate
            .Where(roleName => roleDictionary.TryGetValue(roleName, out string roleId))
            .Select(roleName => new UserRoles
            {
                UserId = user.Id,
                RoleId = roleDictionary[roleName]
            }).ToList();

        if (userRoles.Any())
        {
            await db.InsertAllAsync(userRoles);
        }
        var listUserClaim = new List<UserClaims>();
        await db.DeleteAsync<UserClaims>(x => x.UserId == user.Id);
        if (request.UserClaims != null)
        {
            foreach (var userClaim in request.UserClaims)
            {
                var userClaims = new UserClaims()
                {
                    UserId = user.Id,
                    ClaimValue = userClaim.ClaimValue,
                    ClaimType = userClaim.ClaimValue,
                };
                listUserClaim.Add(userClaims);
            }
        }
        await db.InsertAllAsync(listUserClaim);
        trans.Commit(); 
        return true;
    }
    catch (Exception ex)
    {

        trans.Rollback(); 
        return false;
    }
}
    
    public async Task<QueryResponse<Roles>> GetRoles(RolesRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query =  db.From<Roles>();
            if (!string.IsNullOrEmpty(request.Name))
            {
                query = query.Where(x => x.Name.ToLower().Contains(request.Name.ToLower()));
            }

            var total = (int)db.Count(query);
            query.Skip(request.Skip).Take(request.Take);
            var roles = await db.SelectAsync(query);
            return new QueryResponse<Roles>()
            {
                Results = roles,
                Total = total
            };
        }
        catch (Exception e)
        {
            return new QueryResponse<Roles>();
        }
    }
    
    public async Task<RolesDto> GetRole(RoleRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var role = await db.SingleByIdAsync<Roles>(request.Id);
            var rolesDto = role.ConvertTo<RolesDto>();
            var roleClaim = await db.SelectAsync<RoleClaims>(x => x.RoleId == role.Id);
            rolesDto.RoleClaims = roleClaim.ConvertTo<List<RoleClaimsDto>>();
            return rolesDto;

        }
        catch (Exception e)
        {
            return null;
        }
    }


    public async Task<QueryResponse<UserClaims>> GetUserClaims(UserClaimsRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query =  db.From<UserClaims>();
            var total = (int)db.Count(query);
            var userClaims = await db.SelectAsync(query);
            return new QueryResponse<UserClaims>()
            {
                Results = userClaims,
                Total = total
            };
        }
        catch (Exception e)
        {
            return new QueryResponse<UserClaims>();
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
            await db.InsertAsync(userClaim,true);
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
            role.Id = Guid.NewGuid().ToString();
            role.NormalizedName = role.Name.ToUpper();
            await db.InsertAsync(role);
            if (request.RoleClaims != null)
            {
                foreach (var roleClaim in request.RoleClaims)
                {
                    var newRoleClaim = new RoleClaims()
                    {
                        RoleId = role.Id,
                        ClaimType = roleClaim.ClaimType,
                        ClaimValue = roleClaim.ClaimValue
                    };
                   await db.InsertAsync(newRoleClaim);
                }
            }
            
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
            role.NormalizedName = role.Name.ToUpper();
            await db.UpdateAsync(role);
            var listRoleClaim = new List<RoleClaims>();
            await db.DeleteAsync<RoleClaims>(x => x.RoleId == role.Id);
            if (request.RoleClaims != null)
            {
                foreach (var roleClaim in request.RoleClaims)
                {
                    var newRoleClaim = new RoleClaims()
                    {
                        RoleId = role.Id,
                        ClaimType = roleClaim.ClaimType,
                        ClaimValue = roleClaim.ClaimValue
                    };
                    listRoleClaim.Add(newRoleClaim);
                }
            }
            
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<QueryResponse<Permission>> GetPermissions(PermissionsRequest request)
    {
        using var db = _connectionFactory.OpenDbConnection();
        try
        {
            var role = request.ConvertTo<Roles>();
            var query = db.From<Permission>();
            var total = (int)db.Count(query);
            var permission = await db.SelectAsync<Permission>(query);
            return new QueryResponse<Permission>()
            {
                Total = total,
                Results = permission
            };

        }
        catch (Exception e)
        {
            return new QueryResponse<Permission>();
        }
    }

    public async Task<QueryResponse<RoleClaims>> GetRoleClaims(RoleClaimsRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query =  db.From<RoleClaims>();
            var total = (int)db.Count(query);
            var roleClaims = await db.SelectAsync(query);
            return new QueryResponse<RoleClaims>()
            {
                Results = roleClaims,
                Total = total
            };
        }
        catch (Exception e)
        {
            return new QueryResponse<RoleClaims>();
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
            var userClaim = (await db.SelectAsync<UserClaims>(x => x.UserId == user.Id)).ToList();
            user.UserClaims = userClaim.ConvertTo<List<UserClaimsDto>>();
            user.RoleName = role;
            var userDto = user.ConvertTo<UserDto>();
            return userDto;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<QueryResponse<UserDto>> GetUsers(UsersRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var query = db.From<Users>();
            var total = (int)db.Count(query);
            query.Skip(request.Skip).Take(request.Take);
            var users = db.Select<UserDto>(query);
            var Roles = db.SelectMulti<Roles, UserRoles>(
                db.From<Roles>()
                    .Join<UserRoles>((ur, r) => ur.Id == r.RoleId)
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

            return new QueryResponse<UserDto>()
            {
               Total = total,
               Results = usersWithRoles,
            };
        }
        catch (Exception e)
        {
            return new QueryResponse<UserDto>();
        }
    }
    
}