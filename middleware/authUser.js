const { User } = require("../config/model/index");

const verifyUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({ message: "Mohon Login ke akun anda" });
    }
    const user = await User.findOne({
        where: {
            id_user: req.session.userId,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
    }
    req.userId = user.id_user;
    next();
}

module.exports = verifyUser;
