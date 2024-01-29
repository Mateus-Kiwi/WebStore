using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebStore.Domain.Entities;

namespace WebStore.Data.EntityConfiguration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(t => t.Id);
        builder.HasOne<ProductBrand>().WithMany().HasForeignKey(p => p.BrandId);
        builder.HasOne<ProductCategory>().WithMany().HasForeignKey(p => p.CategoryId);
        
    }
}