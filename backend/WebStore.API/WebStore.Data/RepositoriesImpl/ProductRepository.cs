using Microsoft.EntityFrameworkCore;
using WebStore.Domain.Entities;
using WebStore.Domain.Pagination;
using WebStore.Domain.Repositories;
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

    public async Task<Product> GetById(Guid? id)
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

    public async Task<Product> Update(Guid? id, Product product)
    {
        var productById = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (productById == null)
        {
            throw new Exception($"Product with id: {id} not found.");
        }

        product.UpdateProduct(productById);
        return productById;
    }

    public async Task<Product> Delete(Guid? id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        _context.Remove(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<PagedList<Product>> GetWithPagination(ProductParams productParams)
    {
        var products = await GetAll();
        var queryableProducts = products.OrderBy(p => p.Id).AsQueryable();
        var orderedProducts = PagedList<Product>
            .ToPagedList(queryableProducts, productParams.PageNumber, productParams.PageSize);
        return orderedProducts;
    }
}