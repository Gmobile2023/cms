using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServiceStackBaseCms.Domain;
using ServiceStackBaseCms.Domain.Entities;
using ServiceStackBaseCms.ServiceInterface;

namespace ServiceStackBaseCms.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
    : IdentityDbContext<ApplicationUser>(options)
{ 
    public DbSet<Todo> Todo { get; set; }
    public DbSet<EndpointPermission> EndpointPermissions { get; set; }
    public DbSet<Permission> Permission { get; set; }
    public DbSet<UserClaims> UserClaims { get; set; }
    public DbSet<RoleClaims> RoleClaims { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("public");
        base.OnModelCreating(modelBuilder);
        
        // Duyệt qua tất cả các thực thể trong mô hình
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            
            var currentTableName = entity.GetTableName();
            
            if (currentTableName.StartsWith("AspNet"))
            {
                currentTableName = currentTableName.Substring(6); 
            }
          
            var newTableName = Helper.ToUnderscoreCase(currentTableName);

            // Đặt tên bảng mới
            modelBuilder.Entity(entity.ClrType).ToTable(newTableName);
        }
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSnakeCaseNamingConvention();
}