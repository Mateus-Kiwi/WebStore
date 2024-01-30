namespace WebStore.API.Interfaces.Base;

public interface IBaseService<T>
{
    Task<IEnumerable<T>> GetAll();
    Task<T> GetById(int? id);
    Task Create(T type);
    Task Update(int? id, T type);
    Task Delete(int? id);
}