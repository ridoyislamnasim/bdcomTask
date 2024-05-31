

class HomeController {
    // createLogin = async (req, res, next) => {
    //     const { email, password } = req.body;
    //     const user = await userRegschema.findOne({ email: email });
    //     if (user) {
    //         const isPassMatch = await bcrypt.compare(password, user.password);
    //         if (isPassMatch) {
    //             const user_info_encrypted = {
    //                 id: user._id || null,
    //                 name: user.name || null,
    //                 email: user.email || null,
    //                 role: user.role || null
    //             };

    //             const accessToken = generateAccessToken({ userInfo: { user_info_encrypted } });
    //             const refreshToken = generateRefreshToken({ userInfo: { user_info_encrypted } });
    //             const token = {
    //                 role: user.role,
    //                 accessToken: accessToken,
    //                 refreshToken: refreshToken
    //             };
    //             res.cookie("bdcom", JSON.stringify(token), {
    //                 maxAge: 1000 * 60 * 60 * 24 * 30,

    //             });
    //             // req.session.isLoggedIn = true;
    //             // req.session.user = user
    //             // req.session.userType = 'student'
    //             // if (studentProfile) {
    //             return res.redirect("/student/dashboard")

    //             // } else {
    //             //     return res.redirect("/Student/editProfile")
    //             // }
    //             // res.render("home/login", { errr: er.mapped(), value: { useremail, password } })
    //         } else {
    //             const return_value = {
    //                 email: email,
    //             }
    //             res.render("home/loginSinginReg", {
    //                 errors: '',
    //                 return_value: return_value,
    //                 emp_return_value: '',
    //             })
    //         }
    //     } else {
    //         const return_value = {
    //             email: email,
    //         }
    //         res.render("home/loginSinginReg", {
    //             errors: '',
    //             return_value: return_value,
    //             emp_return_value: '',
    //         })
    //     }
    //     // } else {
    //     //     const return_value = {
    //     //         studentEmailLog: studentEmail,
    //     //     }
    //     //     res.render("home/loginSinginReg", {
    //     //         errors: '',
    //     //         functionCall: 1,
    //     //         return_value: return_value,
    //     //         emp_return_value: '',
    //     //     })
    //     // }


    // };

    home = (req, res, next) => {
        res.render("home/home", {
            errors: "",
        })
    };


}

export default new HomeController();
