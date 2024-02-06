using Microsoft.AspNetCore.Mvc;
using WebStore.API.DTOs;
using WebStore.API.Interfaces;
using WebStore.Domain.Entities;
using WebStore.Domain.Repositories;

namespace WebStore.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _service;
    
    public CategoryController(ICategoryService service)
    {
        _service = service;
    }
   
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _service.GetAll();

        if (categories == null)
        {
            throw new Exception("No categories were found.");
        }

        return Ok(categories);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var categoryById = await _service.GetById(id);

        if (categoryById == null)
        {
            throw new Exception($"Category with Id {id} was not found.");
        }

        return Ok(categoryById);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CategoryDto category)
    {
        await _service.Create(category);
        return Ok(category);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid? id, CategoryDto category)
    {
        await _service.Update(id, category);
        return Ok(category);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(Guid? id)
    {
        await _service.Delete(id);
        return Ok();
    }
}