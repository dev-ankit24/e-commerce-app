import PasswordValidator from "password-validator";

var schema = new PasswordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase(1) // Must have uppercase letters
  .has()
  .lowercase(1) // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "admin@123"]); // Blacklist these values

export default function FormValidation(e) {
  var { name, value } = e.target;
  switch (name) {
    case "name":
    case "color":
    case "username":
      if (!value || value.length === 0)
         return name + " is Mendatory";
      else if (value.length < 3 || value.lenght > 10)
        return name + " Field Length Must Be 3-50";
      else return "";

      case "subject":
        if (!value || value.length === 0) 
          return name + " is Mendatory";
        else if (value.length < 3 || value.lenght >200)
          return name + " Field Length Must Be 3-50";
        else return "";

    case "email":
      if (!value || value.length === 0) return name + " is Mendatory";
      else if (value.length < 13 || value.lenght > 50)
        return name + " Field Length Must Be 13-50";
      else return "";

    case "phone":
      if (!value || value.length === 0) 
        return name + " is Mendatory";
      else if (value.length !== 10) 
        return "Invailid Phone Number";
      else if (
        value.startsWith("6") ||
        value.startsWith("7") ||
        value.startsWith("8") ||
        value.startsWith("9")
      )
        return "";
      else return "Invalid Phone Number  ";

    case "password":
      if (!value || value.length === 0)
         return name + " is Mendatory";
      else if (schema.validate(value)) 
        return "";
      else
        return "Password must containatlest 1 upper case character, 1 lower case character , 1 digit  must contain 8-100 ";

    case "size":
      if (!value || value.length === 0) return name + " is Mendatory";
      else if (value.lenght > 10) return name + " Field Length Must Be 1-10";
      else return "";

    case "basePrice":
    case "quantity":
      if (!value || value.length === 0) return name + " is Mendatory";
      else if (value < 0)
        return " feild value  must be a Number  Greaterthan 0 ";
      else return "";

    case "discount":
      if (!value || value.length === 0) return name + " is Mendatory";
      else if (value < 0 || value > 100)
        return "Product Discount must be 0-100 ";
      else return "";

    case "message":
      if (!value || value.length === 0) return name + " is Mendatory";
      else if (value.length < 50) 
        return name + " Pls enter  minimum 50 letter";
      else return "";
    default:
      return "";
  }
}
