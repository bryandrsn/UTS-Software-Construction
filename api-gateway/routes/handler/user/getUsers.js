const apiAdapters = require("../../apiAdapters");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapters(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const users = await api.get("/users", req.query.user_ids);
    return res.json(users.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED" || !error.response) {
      return res.status(500).json({
        status: "error",
        message: "Service user unavailable",
      });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
