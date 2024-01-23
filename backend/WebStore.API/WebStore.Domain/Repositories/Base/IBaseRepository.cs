namespace WebStore.Domain.Interfaces.Base;

public interface IBaseRepository<T>
{
    Task<IEnumerable<T>> GetAll();
    Task<T> GetById(int? id);
    Task<T> Create(T type);
    Task<T> Update(int? id, T type);
    Task<T> Remove(int? id);
}