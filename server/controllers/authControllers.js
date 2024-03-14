import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

class AuthControllers {
    async register(req, res) {
        try {
            const { email, password, name } = req.body;

         
            const mailer = nodemailer.createTransport({
                host: 'smtp.yandex.ru',
                port: 465,
                secure: true,
                auth: {
                    user: 'hom.1232015@yandex.ru',
                    pass: 'wzhtlsibcugjltvb'
                }
            });

            await mailer.sendMail({
                from: 'hom.1232015@yandex.ru',
                to: email,
                subject: 'Подтверждение регистрации',
                text: 'Подтверждение регистрации',
                html: '<h1>Подтверждение регистрации</h1>'
            }).then(() => {
                res.status(200).json({ message: "Проверьте вашу почту"});
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ message: "ошибка при отправке письма"});
            });
            // const salt = await bcrypt.genSalt(10);
            // const hashPassword = await bcrypt.hash(password, salt);
            // const newUser = await User.create({
            //     email,
            //     password: hashPassword,
            //     name,
            // });
            // await newUser.save();
            // const token = jwt.sign(
            //     { id: newUser._id },
            //     process.env.SECRET_KEY,
            //     {
            //         expiresIn: "30m",
            //     }
            // );
            // res.status(200).json({ token, user: newUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "ошибка при регистрации" });
        }
    }
    async activate() {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Не верный логин или пароль" });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res
                    .status(403)
                    .json({ message: "Не верный логин или пароль" });
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "30m",
            });

            res.status(200).json({ token, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "ошибка при регистрации" });
        }
    }
}

export default new AuthControllers();
