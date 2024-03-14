import User from "../models/userModel.js";

class UserController {
    async getUser(req, res) {
        try {
            const user = await User.findById(req.id)  
            .populate('favorites')
            .populate('basket'); 
            if (!req.id) {
                return res.status(500).json({
                    message: "Ошибка при получении пользоваетеля",
                });
            }
            const { password, _id, ...resUser } = user._doc;
            return res.status(200).json(resUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Ошибка при получении пользоваетеля ",
            });
        }
    }

    async updateUser(req, res) {
        try {
            const { email, name, surname, lastName, birthday, favorites, basket, quantity } = req.body;
            const favoriteIds = favorites.map(favorite => favorite._id);
            const cartIds = basket.map(basket => basket._id);
            const updateUser = await User.findByIdAndUpdate(
                req.id,
                {
                    email,
                    name,
                    surname,
                    lastName,
                    birthday,
                    favorites: favoriteIds,
                    basket: cartIds,
                },
                { new: true }
            );
            console.log(updateUser);
            await updateUser.save()
            res.status(200).json({ message: "Пользователь изменен" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Ошибка при изменении пользоваетеля ",
            });
        }
    }
}
export default new UserController();
