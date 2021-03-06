const router = require("express").Router();

const Psychologist = require("../models/Psychologist.model");
const Client = require("../models/Client.model");

/* Create new Client */
router.post("/create-client/:id", async (req, res, next) => {
  const { name, lastName, lastName2, age, email, phone } = req.body;
  try {
    const user = req.session.user;
    if (user) {
      const createdClient = await Client.create({
        name,
        lastName,
        lastName2,
        age,
        email,
        phone,
      });

      const updatedPsychologist = await Psychologist.findByIdAndUpdate(
        user._id,
        { $push: { clients: createdClient._id } },
        { new: true }
      );

      res.redirect("/psychologist/archive");
    } else {
      res.redirect("/auth/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/psychologist/archive");
  }
});

/* Modify Client */

router.post("/modify-client/:id", async (req, res, next) => {
  try {
    await Client.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/psychologist/archive");
  } catch (err) {
    console.log("err", err);
  }
});

/* Active-Unactive Client */

router.get("/toggle-client/:id/:current", async (req, res, next) => {
  const status = req.params.current;
  const newStatus = !(status === 'true');
  try {
    await Client.findByIdAndUpdate(req.params.id, { active: newStatus });
    res.redirect("/psychologist/archive");
  } catch (err) {
    console.log("err", err);
  }

});

router.get("/deactivate-client/:id/", async (req, res, next) => {
  try {
    await Client.findByIdAndUpdate(req.params.id, { active: false });
    res.redirect("/psychologist");
  } catch (err) {
    console.log("err", err);
  }

});

/*Delete CLient*/

router.post("/delete-client/:id", async (req, res, next) => {
  try {
    await Client.findByIdAndRemove(req.params.id);
    res.redirect("/psychologist/archive");
  } catch (err) {
    console.log("err", err);
  }
});

module.exports = router;
