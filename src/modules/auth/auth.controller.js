
import bcrypt from "bcryptjs";
import { userRegschema } from '../../models/auth/user.js';
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import config from "../../config/config.js";

class AuthController {
    createLogin = async (req, res, next) => {
        const { email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            res.render("auth/loginSinginReg", {
                errors: 'Please enter an email',
                return_value: email
            });
        } else if (!emailRegex.test(email)) {
            res.render("auth/loginSinginReg", {
                errors: 'Please enter a valid email',
                return_value: email
            });
        }
        if (!password) {
            res.render("auth/loginSinginReg", {
                errors: 'Please enter password.',
                return_value: email,
            })
        }
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
                    maxAge: config.cookieMaxAge,
                    httpOnly: true,
                    signed: true,

                });
                return res.redirect("/api/home")

            } else {
                res.render("auth/loginSinginReg", {
                    errors: 'Unauthorize user.',
                    return_value: email,
                })
            }
        } else {
            res.render("auth/loginSinginReg", {
                errors: 'Unauthorize user.',
                return_value: email,
            })
        }
    };

    getLoginPage = (req, res, next) => {
        res.render("auth/loginSinginReg", {
            errors: "",
            return_value: "",
        })
    };
    logout = (req, res, next) => {
        res.clearCookie("bdcom");
        console.log("bdcom logout ")
        res.status(200).json({ message: 'User logout successfully.' });

    }




}

export default new AuthController();
