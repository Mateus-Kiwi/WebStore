using System.ComponentModel.DataAnnotations;
using WebStore.Domain.Entities.Base;
using WebStore.Domain.Validation;

namespace WebStore.Domain.Entities.OrderAggregate;

public sealed class Order : BaseEntity
{
    [Required]
    public decimal SubTotal { get; private set; }
    
    public IReadOnlyList<OrderItemVO> OrderItems { get; private set; }
    
    public Order(Guid id, decimal total, IReadOnlyList<OrderItemVO> orderItems) : base(id)
    {
        
        OrderItems = orderItems;
    }

    private void ValidateTotal(decimal subTotal)
    {
        DomainValidationException.When(decimal.IsNegative(subTotal),"Total order price should be positive.");
        SubTotal = subTotal;
    }

    private void GetTotal(decimal subTotal)
    {
        
    }
}