using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebStore.Domain.Entities.Base;
using WebStore.Domain.Validation;

namespace WebStore.Domain.Entities;

public sealed class Product : BaseEntity
{
   
    [Required]
    [MinLength(5)]
    [StringLength(30)]
    public string? Name { get; private set; }
    
    [Required]
    [MinLength(5)]
    [StringLength(50)]
    public string? Description { get; private set; }
    
    [Required]
    public decimal Price { get; private set; }
    
    [Required]
    [MinLength(5)]
    [StringLength(100)]
    public string? ImageUrl { get; private set; }
    
    [Required]
    [ForeignKey("BrandId")]
    public int  BrandId { get; private set; }
    
    [Required]
    [ForeignKey("ProductCategoryId")]
    public int CategoryId { get; private set; }
    

    public Product(int id, string name, string description, decimal price, string imageUrl,int brandId, int categoryId) : base(id)
    {
        Validate(name,description,price,imageUrl,brandId,categoryId);
    }


    public void UpdateProduct(Product product)
    {
        product.Name = Name;
        product.Description = Description;
        product.ImageUrl = ImageUrl;
        product.Price = Price;
        product.BrandId = BrandId;
        product.CategoryId = CategoryId;
    }
    
    private void Validate(string name, string description, decimal price, string imageUrl, int brandId, int categoryId)
    {
        ValidateName(name);
        ValidateDescription(description);
        ValidatePrice(price);
        ValidateImageUrl(imageUrl);
        ValidateBrandId(brandId);
        ValidateCategoryId(categoryId);
    }

    private void ValidateBrandId(int brandId)
    {
        DomainValidationException.When(brandId < 0, "Invalid Brand Id. Brand Id should not be negative");
    }
    
    private void ValidateCategoryId(int categoryId)
    {
        DomainValidationException.When(categoryId < 0, "Invalid Category Id. Category Id should not be negative");
    }


    private void ValidateName(string name)
    {
        DomainValidationException.When(string.IsNullOrEmpty(name),"Invalid name. Name is required");
        DomainValidationException.When(string.IsNullOrWhiteSpace(name),"Invalid name. Name is required");
        DomainValidationException.When(name.Length < 5, "Invalid name. Name should have at least 5 characters");
        DomainValidationException.When(name.Length > 30, "Invalid name. Name should a maximum of 30 characters");
        Name = name;
    }

    private void ValidateDescription(string description)
    {
        DomainValidationException.When(string.IsNullOrEmpty(description),"Invalid description. Description is required");
        DomainValidationException.When(string.IsNullOrWhiteSpace(description),"Invalid description. Description is required");
        DomainValidationException.When(description.Length < 5, "Invalid description. Description should have at least 5 characters");
        DomainValidationException.When(description.Length > 50, "Invalid description. Description should a maximum of 50 characters");
        Description = description;
    }

    private void ValidatePrice(decimal price)
    {
        DomainValidationException.When(decimal.IsNegative(price), "Invalid price. Price should be positive");
        Price = price;
    }

    private void ValidateImageUrl(string imageUrl)
    {
        DomainValidationException.When(string.IsNullOrEmpty(imageUrl),"Invalid image url. Image url is required");
        DomainValidationException.When(string.IsNullOrWhiteSpace(imageUrl),"Invalid image url. Image url is required");
        DomainValidationException.When(imageUrl.Length < 5, "Invalid image url. Image url should have at least 5 characters");
        DomainValidationException.When(imageUrl.Length > 100, "Invalid image url. Image url should a maximum of 100 characters");
        ImageUrl = imageUrl;
    }
}