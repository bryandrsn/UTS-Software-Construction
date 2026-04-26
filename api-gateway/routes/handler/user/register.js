const apiAdapters = require("../../apiAdapters");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapters(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/users/register", req.body);
    return res.json(user.data);
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
