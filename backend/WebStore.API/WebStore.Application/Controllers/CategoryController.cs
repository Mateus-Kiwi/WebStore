using Microsoft.AspNetCore.Mvc;
using WebStore.Domain.Entities;
using WebStore.Domain.Interfaces;
using WebStore.Domain.Repositories;

namespace WebStore.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _repository;
    
    public CategoryController(ICategoryRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _repository.GetAll();

        if (categories == null)
        {
            throw new Exception("No categories were found.");
        }

        return Ok(categories);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var categoryById = await _repository.GetById(id);

        if (categoryById == null)
        {
            throw new Exception($"Category with Id {id} was not found.");
        }

        return Ok(categoryById);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProductCategory category)
    {
        await _repository.Create(category);
        return Ok(category);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ProductCategory category)
    {
        await _repository.Update(id, category);
        return Ok(category);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var categoryToDelete = await _repository.Delete(id);
        return Ok(categoryToDelete);
    }
}