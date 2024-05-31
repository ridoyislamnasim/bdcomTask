export const alreadyLoginValidationHandler = function (req, res, next) {
    let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    console.log("-")
  if (cookies) {
   return res.render("home/home", {}); 
  }
  next();
  };