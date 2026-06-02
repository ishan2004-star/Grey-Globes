
const {
  fetchCompareData,
} = require("../services/compareService");

const getCompareData = async (
  req,
  res
) => {
  try {

    const { c1, c2 } =
      req.query;

    const result =
      await fetchCompareData(
        c1,
        c2
      );

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Comparison failed",
      });
    }

    res.status(200).json(
      result
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });

  }
};

module.exports = {
  getCompareData,
};