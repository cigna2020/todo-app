export class Validator {

  static checkLengthOfInputValue(value) {
    const lengthOfValue = (value.length < 80 && value.trim().length > 0);
    if (!lengthOfValue) throw new Error('The value is incorrect.')
  }

}