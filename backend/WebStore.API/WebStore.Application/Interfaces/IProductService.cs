using WebStore.API.DTOs;

namespace WebStore.API.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAll();
    Task<ProductDto> GetById(int? id);
    Task Create(ProductDto productDto);
    Task Update(int? id, ProductDto productDto);
    Task Delete(int? id);
}