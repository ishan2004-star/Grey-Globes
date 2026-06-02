const {
  fetchAnalysisData,
} = require("../services/analysisService");

const getAnalysisData =
  async (req, res) => {

    const { metric, sort } =
      req.query;

    const data =
      await fetchAnalysisData(
        metric,
        sort
      );

    res.json(data);

};

module.exports = {
  getAnalysisData,
};