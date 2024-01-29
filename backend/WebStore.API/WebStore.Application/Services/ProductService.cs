using AutoMapper;
using WebStore.API.DTOs;
using WebStore.API.Interfaces;
using WebStore.Domain.Entities;
using WebStore.Domain.Interfaces;

namespace WebStore.API.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;
    
    public ProductService(IProductRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<ProductDto>> GetAll()
    {
        var productEntities = await _repository.GetAll();
        return _mapper.Map<IEnumerable<ProductDto>>(productEntities);
    }

    public async Task<ProductDto> GetById(int? id)
    {
        var productEntity = await _repository.GetById(id);
        return _mapper.Map<ProductDto>(productEntity);
    }

    public async Task Create(ProductDto productDto)
    {
        var productEntity = _mapper.Map<Product>(productDto);
        await _repository.Create(productEntity);
    }
    
    public async Task Update(int? id, ProductDto productDto)
    {
        var productEntity = _mapper.Map<Product>(productDto);
        await _repository.Update(id, productEntity);
    }

    public async Task Delete(int? id)
    {
        await _repository.Delete(id);
    }
}