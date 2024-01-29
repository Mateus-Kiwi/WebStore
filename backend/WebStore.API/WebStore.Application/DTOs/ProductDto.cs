using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebStore.API.DTOs;

public class ProductDto
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
}