using Microsoft.EntityFrameworkCore;
using WebStore.Domain.Entities;
using WebStore.Domain.Interfaces;
using WebStore.Infra.Context;

namespace WebStore.Data.RepositoriesImpl;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<Product>> GetAll()
    {
        var products = await _context.Products.ToListAsync();
        return products;
    }

    public async Task<Product> GetById(int? id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        return product;
    }

    public async Task<Product> Create(Product product)
    {
        _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> Update(int? id, Product product)
    {
        var productById = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (productById == null)
        {
            throw new Exception($"Product with id: {id} not found.");
        }

        product.UpdateProduct(productById);
        return productById;
    }

    public async Task<Product> Remove(int? id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        _context.Remove(product);
        await _context.SaveChangesAsync();
        return product;
    }
}