using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebStore.Domain.Entities;

namespace WebStore.Infra.EntityConfiguration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(t => t.Id);
        builder.Property(p => p.Name).HasMaxLength(30).IsRequired();
        builder.Property(p => p.Description).HasMaxLength(50).IsRequired();
        builder.Property(p => p.Price).HasPrecision(10,2).IsRequired();
        builder.Property(p => p.ImageUrl).HasMaxLength(100).IsRequired();
        builder.HasOne<ProductBrand>().WithMany().HasForeignKey(p => p.BrandId);
        builder.HasOne<ProductCategory>().WithMany().HasForeignKey(p => p.CategoryId);
    }
}