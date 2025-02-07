const inputValidationRules = {
  required: (value: string) => (value ? true : '*Mandatory field'),
  email: (value: string) => (value.includes('@') ? true : 'Not an email format!'),
  passwordMinLength: (value: string) =>
    value.length > 8 ? true : 'Length of password should be at least 8 chars!',
  passwordMatch: (password: string, passwordAgain: string) =>
    password === passwordAgain ? true : 'Passwords do not match!',
  currencyName: (value: string) =>
    value.length > 0 && value.length <= 50
      ? true
      : 'Length of currency name should be between 1 and 50 chars!',
  currencyCode: (value: string) =>
    RegExp('^[A-Z]{3}$').test(value) ? true : 'Not a valid currency code!',
  masterData: {
    projectCategory: {
      projectCategoryName: (value: string) =>
        value.length > 0 && value.length <= 50
          ? true
          : 'Length of category name should be between 1 and 50 chars!'
    }
  },
  project: {
    projectName: (value: string) =>
      value.length <= 1 && value.length >= 150
        ? true
        : 'The length of the title should between 1 and 150 chars!',
    description: (value: string) => (value.length <= 1000 ? true : 'Too long description!'),
    startPrice: (value: number) => (value >= 1 ? true : 'The price has to be at least 1.')
  }
}

export default inputValidationRules;