const apiAdapters = require("../../apiAdapters");
const { URL_SERVICE_REPORT } = process.env;
const api = apiAdapters(URL_SERVICE_REPORT);

module.exports = async (req, res) => {
  try {
    const response = await api.get("/reports", {
      params: req.query,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED" || !error.response) {
      return res.status(500).json({
        status: "error",
        message: "Service report unavailable",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
