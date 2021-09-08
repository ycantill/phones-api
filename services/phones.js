/* eslint new-cap: ["error", { "properties": false }]*/

const express = require("express");
const router = express.Router();

router.get(
  "/",
  // Emulate waiting time response
  (req, res, next) => {
    const time = Math.random() * (5 - 1) + 1;
    setTimeout(() => next(), time * 1000);
  },
  async (req, res) => {
    const { Phone } = res.models;

    try {
      const phones = await Phone.findAll();

      res.json(phones);
    } catch (error) {
      res.status(500);
      console.log(error);
      res.send("Upsss something wrong!");
    }
  }
);

router.get("/:id", async (req, res) => {
  const { PhoneDetail } = res.models;
  const id = req.params.id;

  try {
    const details = await PhoneDetail.findByPk(id, {
      attributes: { exclude: ["id", "createdAt", "updatedAt", "PhoneId"] },
    });

    res.json(details || {});
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send("Upsss something wrong!");
  }
});

router.post("/", async (req, res) => {
  const { Phone } = res.models;
  const { body } = req;
  try {
    const phone = await Phone.create(body);

    await phone.createPhoneDetail(body);

    res.send("Phone added!");
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Upsss something wrong!");
  }
});

router.patch("/", async (req, res) => {
  const { Phone, PhoneDetail } = res.models;
  const { body } = req;
  const { id } = body;

  try {
    await Phone.update(body, { where: { id } });
    await PhoneDetail.update(body, { where: { PhoneId: id } });

    res.send("Phone modified!");
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Upsss something wrong!");
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  const { Phone } = res.models;

  try {
    await Phone.destroy({ where: { id } });

    res.send("Phone deleted!");
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Upsss something wrong!");
  }
});

module.exports = router;
