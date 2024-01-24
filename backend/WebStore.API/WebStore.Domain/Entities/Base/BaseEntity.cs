using System.ComponentModel.DataAnnotations;
using WebStore.Domain.Validation;

namespace WebStore.Domain.Entities.Base;

public abstract class BaseEntity 
{
    protected BaseEntity(int id)
    {
        ValidateId(id);
    }
    
    [Key]
    public int Id { get; set; }

    private void ValidateId(int id)
    {
        DomainValidationException.When(id < 0,"Id cant be negative");
        Id = id;
    }
}