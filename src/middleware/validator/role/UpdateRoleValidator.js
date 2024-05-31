
import { check, body, validationResult } from 'express-validator';
import { roleschema } from '../../../models/role/role.js';

export const validateUpdateRole = [
    body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required.')
    .custom(async (role, { req }) => {
        const roleId = req.params.id;
        const existingRole = await roleschema.findOne({ role: role });
        if (existingRole && existingRole._id.toString() !== roleId) {
            throw new Error('This role already exist.');
        }
    }),

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