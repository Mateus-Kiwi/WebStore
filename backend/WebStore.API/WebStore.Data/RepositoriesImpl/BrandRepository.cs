﻿using Microsoft.EntityFrameworkCore;
using WebStore.Domain.Entities;
using WebStore.Domain.Repositories;
using WebStore.Infra.Context;

namespace WebStore.Data.RepositoriesImpl;

public class BrandRepository : IBrandRepository
{
    private readonly AppDbContext _context;
    
    public BrandRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<ProductBrand>> GetAll()
    {
        var brands = await _context.Brands.ToListAsync();
        if (brands == null)
        {
            throw new Exception("No Brands were found.");
        }
        return brands;
    }

    public async Task<ProductBrand> GetById(int? id)
    {
        var brandById = await _context.Brands.FirstOrDefaultAsync(b => b.Id == id);
        if (brandById == null)
        {
            throw new Exception($"Brand with Id {id} not found.");
        }
        return brandById;
    }

    public async Task<ProductBrand> Create(ProductBrand brand)
    {
       _context.Brands.AddAsync(brand);
       await _context.SaveChangesAsync();
       return brand;
    }

    public async Task<ProductBrand> Update(int? id, ProductBrand brand)
    {
        var brandToUpdate = await _context.Brands.FirstOrDefaultAsync(b => b.Id == id);
        if (brandToUpdate == null)
        {
            throw new Exception($"Product with Id {id} not found.");
        }
        brandToUpdate.UpdateBrand(brand);
        return brandToUpdate;
    }

    public async Task<ProductBrand> Delete(int? id)
    {
        var brandToDelete = await _context.Brands.FirstOrDefaultAsync(b => b.Id == id);
        _context.Remove(brandToDelete);
        await _context.SaveChangesAsync();
        return brandToDelete;

    }
}