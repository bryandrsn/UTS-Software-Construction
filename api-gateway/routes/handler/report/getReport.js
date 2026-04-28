const apiAdapters = require("../../apiAdapters");
const { URL_SERVICE_MEDIA, URL_SERVICE_USER, URL_SERVICE_REPORT } = process.env;
const apiReport = apiAdapters(URL_SERVICE_REPORT);
const apiUser = apiAdapters(URL_SERVICE_USER);
const apiMedia = apiAdapters(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const responseReport = await apiReport.get(`/reports/${id}`);
    const reportData = responseReport.data.data;

    const [userResponse, mediaResponse] = await Promise.all([
      apiUser.get(`/users/${reportData.reporter_id}`).catch(() => null),
      apiMedia.get(`/media/${reportData.media_id}`).catch(() => null),
    ]);

    const userData = userResponse?.data?.data;
    const mediaData = mediaResponse?.data?.data;

    if (!userData || !mediaData) {
      return res.status(404).json({
        status: "error",
        message: "Reporter or media not found",
      });
    }

    res.json({
      id: reportData.id,
      street_name: reportData.street_name,
      description: reportData.description,
      status: reportData.status,
      reporter: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
      evidence_photo: {
        id: mediaData.id,
        url: mediaData.image,
      },
    });
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
