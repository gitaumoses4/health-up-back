export default class UserValidator {
  static validateEmail(req) {
    const { body: { email } } = req;
    if (email) {
      req.checkBody('email', 'Please enter a valid email')
        .isEmail();
    }
  }
}
