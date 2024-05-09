const inputValidationRules = {
  required: (value: string) => value ? true :'*Mandatory field',
  email: (value: string) => value.includes('@') ? true : 'Not an email format!',
  passwordMinLength: (value: string) => value.length > 8 ? true : 'Length of password should be at least 8 chars!',
  passwordMatch: (password: string, passwordAgain: string) => (password === passwordAgain ? true : 'Passwords do not match!')
};

export default inputValidationRules;