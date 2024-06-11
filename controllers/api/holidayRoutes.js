const router = require("express").Router();
const { Holiday } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newHoliday = await Holiday.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newHoliday);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  console.log(`\n\nHoliday DELETE route hit: ${JSON.stringify(req.body)}\n\n`);

  try {
    const holidayData = await Holiday.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!holidayData) {
      res.status(404).json({ message: "No holiday found with this id!" });
      return;
    }

    res.status(200).json(holidayData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
