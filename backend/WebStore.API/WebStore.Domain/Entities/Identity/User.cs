using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using WebStore.Domain.Entities.Base;
using WebStore.Domain.Validation;
using WebStore.Domain.ValueObjects;

namespace WebStore.Domain.Entities.Identity;

public class User : BaseEntity
{
    [Required]
    [MinLength(3)]
    [StringLength(50)]
    public string FirstName { get; private set; } = "";
    
    [Required]
    [MinLength(3)]
    [StringLength(50)]
    public string LastName { get; private set; } = "";
    
    [Required]
    [MinLength(5)]
    [StringLength(20)]
    public string Username { get; private set; } = "";
    
    [Required]
    [MinLength(8)]
    [StringLength(200)]
    public string Password { get; private set; } = "";
    
    [Required]
    [MinLength(5)]
    [StringLength(100)]
    public string Email { get; private set; } = "";
    
    [Required]
    [MinLength(11)]
    [StringLength(11)]
    public string Cpf { get; private set; } = "";
    
    public AddressVO Address { get; private set; } = new AddressVO();

    public User() {}
    
    public User(Guid id, string firstName, string lastName, string username, string password, string email, string cpf) : base(id)
    {
        FirstName = firstName;
        LastName = lastName;
        Username = username;
        Password = password;
        Email = email;
        Cpf = cpf;
    }

    private void ValidateName(string firstName)
    {
        DomainValidationException.When(string.IsNullOrEmpty(firstName),"First name is required");
        DomainValidationException.When(string.IsNullOrWhiteSpace(firstName),"First name is required");
        DomainValidationException.When(firstName.Length < 3, "Invalid first name. First name should have at least 3 characters");
        DomainValidationException.When(firstName.Length > 50, "Invalid first name. First name should have a maximum of 50 characters");
        FirstName = firstName;
    }

    private void ValidateLastName(string lastName)
    {
        DomainValidationException.When(string.IsNullOrEmpty(lastName),"Last name is required");
        DomainValidationException.When(string.IsNullOrWhiteSpace(lastName),"Last name is required");
        DomainValidationException.When(lastName.Length < 3, "Invalid last name. Last name should have at least 3 characters");
        DomainValidationException.When(lastName.Length > 50, "Invalid last name. Last name should have a maximum of 50 characters");
        LastName = lastName;
    }

    private void ValidateUserName(string userName)
    {
        DomainValidationException.When(string.IsNullOrEmpty(userName),"Username is required");
        DomainValidationException.When(string.IsNullOrWhiteSpace(userName),"Username is required");
        DomainValidationException.When(userName.Length < 3, "Invalid username. Username should have at least 3 characters");
        DomainValidationException.When(userName.Length > 20, "Invalid username. Username should have a maximum of 50 characters");
    }

    private void ValidatePassword(string password)
    {
        if (password.Length < 8 || password.Length > 200)
        {
            throw new DomainValidationException("The password must be between 8 and 200 characters long.");
        }

        if (!Regex.IsMatch(password, "[A-Z]"))
        {
            throw new DomainValidationException("The password must contain at least one uppercase letter.");
        }

        if (!Regex.IsMatch(password, "[a-z]"))
        {
            throw new DomainValidationException("The password must contain at least one lowercase letter.");
        }

        if (!Regex.IsMatch(password, @"\d"))
        {
            throw new DomainValidationException("The password must contain at least one digit.");
        }

        if (!Regex.IsMatch(password, @"[@$!%*?&]"))
        {
            throw new DomainValidationException("The password must contain at least one special character.");
        }

        Password = password;
    }

    private void ValidateEmail(string email)
    {
        if (!Regex.IsMatch(email, "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$"))
        {
            throw new DomainValidationException("Invalid email format.");
        }
        
        if (!Regex.IsMatch(email, "@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$"))
        {
            throw new DomainValidationException("Invalid email domain.");
        }
        
        if (!Regex.IsMatch(email, "^\\w+@"))
        {
            throw new DomainValidationException("Invalid email username.");
        }

        Email = email;
    }
}