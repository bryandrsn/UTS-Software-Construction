const apiAdapters = require("../../apiAdapters");
const { URL_SERVICE_MEDIA, URL_SERVICE_USER, URL_SERVICE_REPORT } = process.env;
const apiReport = apiAdapters(URL_SERVICE_REPORT);
const apiUser = apiAdapters(URL_SERVICE_USER);
const apiMedia = apiAdapters(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const { street_name, description, status, media } = req.body;

    const reportResponse = await apiReport.get(`/reports/${id}`);
    if (reportResponse.status !== 200) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }

    let media_id;
    if (media) {
      const mediaResponse = await apiMedia.post("/media", { image: media });
      if (mediaResponse.status !== 201) {
        return res.status(400).json({
          status: "error",
          message: "Failed to upload media",
        });
      }
      media_id = mediaResponse.data.data.id;
    }

    const updateData = {};
    if (street_name !== undefined) updateData.street_name = street_name;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (media_id !== undefined) updateData.media_id = media_id;

    const updateResponse = await apiReport.put(`/reports/${id}`, updateData);
    return res.status(updateResponse.status).json(updateResponse.data);
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
