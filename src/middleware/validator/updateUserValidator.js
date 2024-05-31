import { check, body, validationResult } from 'express-validator';
import { userRegschema } from '../../models/auth/user.js';

export const validateUpdateUser = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long.'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Email is invalid.')
        .custom(async (email, { req }) => {
            const userId = req.params.id;
            const existingUser = await userRegschema.findOne({ email });
            console.log(existingUser?._id);
            console.log(userId)
            if (existingUser && existingUser._id.toString() !== userId) {
                throw new Error('This email is already in use by another user.');
            }
        }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
        (req, res, next) => {
            const error = validationResult(req);
            const maperrors = error.mapped();
            const formateter = (error) => error.msg
            const er = error.formatWith(formateter);
            if (Object.keys(maperrors).length === 0) {
                next();
            } else {
                console.log(er.mapped())
                res.status(500).json({ errors: maperrors })
            }
    }
];

