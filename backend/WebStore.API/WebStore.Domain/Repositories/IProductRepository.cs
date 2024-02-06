using WebStore.API.Pagination;
using WebStore.Domain.Entities;
using WebStore.Domain.Pagination;
using WebStore.Domain.Repositories.Base;

namespace WebStore.Domain.Repositories;

public interface IProductRepository : IBaseRepository<Product>
{
    Task<PagedList<Product>> GetWithPagination(ProductPagination pagination);
}