using System.ComponentModel.DataAnnotations;
using WebStore.Domain.Entities.Base;
using WebStore.Domain.Validation;

namespace WebStore.Domain.Entities.OrderAggregate;

public class OrderedItem : BaseEntity
{
    [Required]
    [MinLength(5)]
    [StringLength(30)]
    public string ProductName { get; private set; } = "";
    
    [Required]
    [MinLength(5)]
    [StringLength(300)]
    public string ImageUrl { get; private set; } = "";

    public OrderedItem(Guid id, string productName,string imageUrl) : base (id)
    {
        ValidateOrderedItem(productName,imageUrl);
    }

    private void ValidateOrderedItem(string productName,string imageUrl)
    {
        ValidateProductName(productName);
        ValidateProductImageUrl(imageUrl);
    }

    private void ValidateProductName(string productName)
    {
        DomainValidationException.When(string.IsNullOrEmpty(productName),"Product name is required.");
        DomainValidationException.When(string.IsNullOrWhiteSpace(productName),"Product name is required.");
        DomainValidationException.When(productName.Length < 5,"Invalid product name. Name should be at least 5 characters long.");
        DomainValidationException.When(productName.Length > 30,"Invalid product name. Name should have a maximum of 30 characters.");
        ProductName = productName;
    }

    private void ValidateProductImageUrl(string imageUrl)
    {
        DomainValidationException.When(string.IsNullOrEmpty(imageUrl),"Product image url is required.");
        DomainValidationException.When(string.IsNullOrWhiteSpace(imageUrl),"Product image url is required.");
        DomainValidationException.When(imageUrl.Length < 5,"Invalid product image url. Url should be at least 5 characters long.");
        DomainValidationException.When(imageUrl.Length > 300,"Invalid product image url. Url should have a maximum of 300 characters.");
        ImageUrl = imageUrl;
    }

}