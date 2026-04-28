const apiAdapters = require("../../apiAdapters");
const { URL_SERVICE_MEDIA, URL_SERVICE_USER, URL_SERVICE_REPORT } = process.env;
const apiReport = apiAdapters(URL_SERVICE_REPORT);
const apiUser = apiAdapters(URL_SERVICE_USER);
const apiMedia = apiAdapters(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const { street_name, description, reporter_id, media } = req.body;

    const userResponse = await apiUser.get(`/users/${reporter_id}`);
    if (userResponse.status !== 200) {
      return res.status(400).json({
        status: "error",
        message: "Reporter not registered",
      });
    }

    const mediaResponse = await apiMedia.post("/media", { image: media });
    if (mediaResponse.status !== 201) {
      return res.status(400).json({
        status: "error",
        message: "Failed to upload media",
      });
    }
    const media_id = mediaResponse.data.data.id;

    const response = await apiReport.post("/reports", {
      street_name,
      description,
      reporter_id,
      media_id,
    });
    return res.status(response.status).json(response.data);
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
