using System.ComponentModel.DataAnnotations;

namespace WebStore.API.DTOs;

public class BrandDto
{
    [Required]
    [MinLength(5)]
    [StringLength(30)]
    public string? Name { get; set; }
}