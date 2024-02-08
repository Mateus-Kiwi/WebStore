using WebStore.Domain.Entities;
<<<<<<< HEAD
using WebStore.Domain.Interfaces.Base;
=======
using WebStore.Domain.Pagination;
using WebStore.Domain.Repositories.Base;
>>>>>>> a4b5d6a1ee308cf9bc5d5ddb9145fb6bcd281dbc

namespace WebStore.Domain.Repositories;

public interface IBrandRepository : IBaseRepository<ProductBrand>
{
    Task<PagedList<ProductBrand>> GetWithPagination(BrandParams brandParams);
}