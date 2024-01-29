using Microsoft.AspNetCore.Mvc;
using WebStore.Domain.Entities;
using WebStore.Domain.Repositories;

namespace WebStore.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BrandController : ControllerBase
{
    private readonly IBrandRepository _repository;
    
    public BrandController(IBrandRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var brands = await _repository.GetAll();
        return Ok(brands);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int? id)
    {
        var brandById = await _repository.GetById(id);
        if (brandById == null)
        {
            throw new Exception($"Brand with Id {id} not found.");
        }
        return Ok(brandById);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProductBrand brand)
    {
        await _repository.Create(brand);
        return Ok(brand);
    }

    [HttpPut]
    public async Task<IActionResult> Update(int? id, ProductBrand brand)
    {
        await _repository.Update(id, brand);
        return Ok(brand);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int? id)
    {
        var productToDelete = await _repository.Delete(id);
        return Ok(productToDelete);
    }
}