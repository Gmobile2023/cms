using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.PostgreSQL;
using ServiceStackBaseCms.Data;
using ServiceStackBaseCms.Domain;
using ServiceStackBaseCms.Domain.Repositories;

[assembly: HostingStartup(typeof(ServiceStackBaseCms.ConfigureDb))]

namespace ServiceStackBaseCms;

public class ConfigureDb : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) =>
        {
            var connectionString = context.Configuration.GetConnectionString("DefaultConnection")
                                   ??
                                   "Server=localhost;User Id=test;Password=test;Database=test;Pooling=true;MinPoolSize=0;MaxPoolSize=200";

            services.AddSingleton<IDbConnectionFactory>(new OrmLiteConnectionFactory(
                connectionString,
                PostgreSqlDialect.Provider));
            services.AddScoped<IServiceStackBaseRepository, ServiceStackBaseRepository>();
            services.AddTransient<IManagerUserRepository, ManagerUserRepository>();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString, b => b.MigrationsAssembly(nameof(ServiceStackBaseCms))));
        })
        .ConfigureAppHost(appHost =>
        {
            // Enable built-in Database Admin UI at /admin-ui/database
            // appHost.Plugins.Add(new AdminDatabaseFeature());
        });
}