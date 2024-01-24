using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebStore.Data.RepositoriesImpl;
using WebStore.Domain.Interfaces;
using WebStore.Infra.Context;

namespace WebStore.IoC;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options => options.UseNpgsql(
            configuration.GetConnectionString("DefaultConnection"),
            b => b.MigrationsAssembly("WebStore.API")
            ));

        services.AddScoped<IProductRepository, ProductRepository>();

        return services;
    }
}