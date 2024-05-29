
import bcrypt from "bcryptjs";
import { userRegschema } from '../../models/auth/user.js';
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

class AuthController {
    createLogin = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await userRegschema.findOne({ email: email });
        if (user) {
            const isPassMatch = await bcrypt.compare(password, user.password);
            if (isPassMatch) {
                const user_info_encrypted = {
                    id: user._id || null,
                    name: user.name || null,
                    email: user.email || null,
                    role: user.role || null
                };

                const accessToken = generateAccessToken({ userInfo: { user_info_encrypted } });
                const refreshToken = generateRefreshToken({ userInfo: { user_info_encrypted } });
                const token = {
                    role: user.role,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                };
                res.cookie("bdcom", JSON.stringify(token), {
                    maxAge: 1000 * 60 * 60 * 24 * 30,

                });
                return res.redirect("/api/user")

                 } else {
                const return_value = {
                    email: email,
                }
                res.render("auth/loginSinginReg", {
                    errors: '',
                    return_value: return_value,
                    emp_return_value: '',
                })
            }
        } else {
            const return_value = {
                email: email,
            }
            res.render("auth/loginSinginReg", {
                errors: '',
                return_value: return_value,
                emp_return_value: '',
            })
        }
    };

    getLoginPage = (req, res, next) => {
        res.render("auth/loginSinginReg", {
            errors: "",
            functionCall: 1,
            return_value: '',
            emp_return_value: '',
        })
    };
    logout = (req, res, next) => {
        res.clearCookie("bdcom");
        console.log("bdcom logout ")
        res.status(200).json({ message: 'User logout successfully.'});

    }




}

export default new AuthController();
