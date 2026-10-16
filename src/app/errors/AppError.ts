// throw new Error diye only error msg send kora zay but error status code send kora zay na.
// er jnno Error class k extend kore 1ta super class korlam 'AppError' nam e.
// AppError 1ta custom error.zeta statuscode + msg 2tai dea zay
class AppError extends Error {
  public statusCode: number;

  // stack = "" , error er path bole dey. ejnno error tress rakhar jnno stack use korchi
  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
      // this.constructor mane zei error gula error constructor er moddhe theke ashteche seigula trace korar jnno used
    }
  }
}

export default AppError;