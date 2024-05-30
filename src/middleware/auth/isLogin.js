export const doLoginValidationHandler = function (req, res, next) {
    let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    console.log("-")
  if (!cookies) {
    res.render("auth/loginSinginReg", ); 
  }
  next();
    // const errors = validationResult(req);
    // const mappedErrors = errors.mapped();
    // if (Object.keys(mappedErrors).length === 0) {
    //   next();
    // } else {
    //   res.render("index", {
    //     data: {
    //       username: req.body.username,
    //     },
    //     errors: mappedErrors,
    //   });
    // }
  };