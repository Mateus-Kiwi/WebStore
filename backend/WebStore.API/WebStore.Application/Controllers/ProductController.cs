using Microsoft.AspNetCore.Mvc;
using WebStore.API.DTOs;
using WebStore.API.Interfaces;
using WebStore.Domain.Entities;
using WebStore.Domain.Interfaces;

namespace WebStore.API.Controllers;


[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;
    
    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _service.GetAll();

        if (products == null)
        {
            return NotFound("No products were found");
        }

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Create(int? id)
    {
        var product = await _service.GetById(id);

        if (product == null)
        {
            return NotFound($"Product with Id {id} not found.");
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProductDto product)
    {
        await _service.Create(product);
        return Ok(product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ProductDto product)
    {
        await _service.Update(id, product);
        return Ok(product);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.Delete(id);
        return Ok();
    }
}