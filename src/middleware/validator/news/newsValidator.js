
import { check, body, validationResult } from 'express-validator';

export const validateNews = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required.')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long.'),
    body('body')
        .trim()
        .notEmpty()
        .withMessage('Body is required.')
        .isLength({ min: 10 })
        .withMessage('Body must be at least 10 characters long.'),

    (req, res, next) => {
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