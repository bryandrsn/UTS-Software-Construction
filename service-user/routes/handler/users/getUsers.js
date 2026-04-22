const { User } = require("../../../models");

module.exports = async (req, res) => {
    const userIds = req.query.user_ids || [];

    const sqlOptions = {
        attributes: ["id", "name", "email", "role", "profession", "avatar"],
    };
    if (userIds.length) {
        sqlOptions.where = {
            id: userIds,
        };
    }

    const id = req.params.id;

    const user = await User.findAll(sqlOptions);

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "user not found",
        });
    }

    return res.json({
        status: "success",
        data: user,
    });
};
