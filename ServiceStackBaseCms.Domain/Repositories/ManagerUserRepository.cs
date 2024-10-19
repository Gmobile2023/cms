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
        try
        {
            var user = request.ConvertTo<ApplicationUser>();
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
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
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    public async Task<bool> UpdateUser(UpdateUserRequest request)
    {
        using var db =  _connectionFactory.OpenDbConnection();
        try
        {
            var user = request.ConvertTo<ApplicationUser>();
           
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
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
          var query =   db.From<Users>();
          var total = db.Count(query);
          var users = await db.SelectAsync(query);
          var userDto = users.ConvertTo<List<UserDto>>();
          return new PagedResultDto<UserDto>()
          {
              Items = userDto,
              TotalCount = total,
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