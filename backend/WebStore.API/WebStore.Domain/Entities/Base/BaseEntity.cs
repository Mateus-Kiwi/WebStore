using System.ComponentModel.DataAnnotations;

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
        //TODO: Domain Validation Exception
        Id = id;
    }
}