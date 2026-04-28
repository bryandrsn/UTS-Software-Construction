const apiAdapters = require("../../apiAdapters");
const { URL_SERVICE_MEDIA, URL_SERVICE_USER, URL_SERVICE_REPORT } = process.env;
const apiReport = apiAdapters(URL_SERVICE_REPORT);
const apiUser = apiAdapters(URL_SERVICE_USER);
const apiMedia = apiAdapters(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const responseReport = await apiReport.get(`/reports/${id}`);
    if (responseReport.status !== 200) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }
    const reportData = responseReport.data.data;

    const [mediaResponse, reportResponse] = await Promise.all([
      apiMedia.delete(`/media/${reportData.media_id}`).catch(() => null),
      apiReport.delete(`/reports/${id}`).catch(() => null),
    ]);

    if (mediaResponse.status !== 200) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }

    if (reportResponse.status !== 200) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }
    return res.json({
      status: "success",
      message: "Report successfully deleted",
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
