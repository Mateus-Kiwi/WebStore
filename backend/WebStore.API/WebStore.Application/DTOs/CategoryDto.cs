using System.ComponentModel.DataAnnotations;

namespace WebStore.API.DTOs;

public class CategoryDto
{
    [Required]
    [MinLength(5)]
    [StringLength(30)]
    public string? Name { get; set; }
}