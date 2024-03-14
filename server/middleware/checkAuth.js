import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").split(" ")[1];
    console.log(token);
    if (!token) {
        res.status(400).json({ message: "Нет доступа" });
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Нет доступа" });
    }
};

export { checkAuth };
