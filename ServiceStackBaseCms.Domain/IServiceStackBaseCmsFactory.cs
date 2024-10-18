using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.PostgreSQL;

namespace ServiceStackBaseCms.Domain;

public interface IServiceStackBaseCmsFactory : IDbConnectionFactory
{
    
}

public class ServiceStackBaseCmsFactory : OrmLiteConnectionFactory, IServiceStackBaseCmsFactory
{
    public ServiceStackBaseCmsFactory(string s) : base(s)
    {
    }
        
        
    public ServiceStackBaseCmsFactory(string s, PostgreSqlDialectProvider provider) : base(s, provider)
    {
    }
}