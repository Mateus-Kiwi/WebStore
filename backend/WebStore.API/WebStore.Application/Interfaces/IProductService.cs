using WebStore.API.DTOs;
using WebStore.API.Interfaces.Base;
using WebStore.Domain.Pagination;

namespace WebStore.API.Interfaces;

public interface IProductService : IBaseService<ProductDto>
{
    Task<PagedList<ProductDto>> GetWithPagination(ProductParams productParams);
}