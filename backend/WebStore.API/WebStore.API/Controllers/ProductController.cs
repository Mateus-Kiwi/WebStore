using Microsoft.AspNetCore.Mvc;
using WebStore.Domain.Entities;
using WebStore.Domain.Interfaces;

namespace WebStore.API.Controllers;


[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _repository;
    
    public ProductController(IProductRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _repository.GetAll();

        if (products == null)
        {
            return NotFound("No products were found");
        }

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Create(int? id)
    {
        var product = _repository.GetById(id);

        if (product == null)
        {
            return NotFound($"Product with Id {id} not found.");
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        await _repository.Create(product);
        return Ok(product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Product product)
    {
        await _repository.Update(id, product);
        return Ok(product);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedProduct = await _repository.Delete(id);
        return Ok(deletedProduct);
    }
}