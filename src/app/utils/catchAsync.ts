// async function 1ta promise return kore. promise resolve hobe na hole error
//  ta catch block e return korbe & global error handler er moddhe pathay dicchi.
// bar bar try catch na likhe catchAsync likhlam

// catchAsync 1ta higher order function. mane 1ta function parameter hisebe receive kore r return o kore 1ta function
// eta asynchronus code k receive kore resolve kore. zodi error pay tahole global error handeler e send kore dicche
// controller evabeo kora zay tahole try catch bar bar likha lage naa
import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;