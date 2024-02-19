using System.ComponentModel.DataAnnotations;
using WebStore.Domain.Entities.Base;

namespace WebStore.Domain.Entities.OrderAggregate;

public class Order : BaseEntity
{
    [Required]
    public decimal Total { get; private set; }
    
    public Order(Guid id) : base(id)
    {
        
    }
    
    
}