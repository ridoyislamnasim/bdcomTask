
import { check, body, validationResult } from 'express-validator';
import { userRegschema } from '../../models/auth/user.js';
// const roomschem = require("../models/rooms");
// console.log( req.body.confirmpassword);


export const validateCreateUser = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long.'),
    body('email')
        .isEmail()
        .withMessage('Email is invalid.')
        .custom(async (email, { req }) => {
            const existingUser = await userRegschema.findOne({ email });
            if (existingUser) {
                throw new Error('This email is already in use.');
            }
        }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    (req, res, next) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        // next();

        const error = validationResult(req);
        console.log(req.body)
        const maperrors = error.mapped();
        // formate errors ;only show the error msg
        const formateter = (error) => error.msg
        console.log(formateter)
        const er = error.formatWith(formateter);
        if (Object.keys(maperrors).length === 0) {
            next();

        } else {
            console.log(er.mapped())
            // console.log(maperrors.mapped())
            res.status(500).json({ errors: maperrors })
            //   return res.render("room",{errr:er,rooms:""})
        }
    }
];