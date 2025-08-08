const express = require("express");
const cors = require("cors");
const db = require("./models");
const upload = require("./config/multer.config");
const permissionController = require("./controllers/permission.controller");
const validate = require("./validators");
const permissionValidator = require("./validators/permission.validator");
const dotenv = require("dotenv");
dotenv.config();
const initialSeed = require("./seeders/20250807234228-initial-iam-seed");

const app = express();
const router = require("./routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the IAM API!" });
});
app.use("/api", router);
app.get("/api/me/permissions", permissionController.getMyPermissions);
app.post(
  "/api/simulate-action",
  validate(permissionValidator.simulateAction),
  permissionController.simulateAction
);

const PORT = process.env.PORT || 8080;

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced. Running seeder...");

    initialSeed
      .up(db.sequelize.getQueryInterface(), db.Sequelize)
      .then(() => {
        console.log("Seeder ran successfully.");

        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}.`);
        });
      })
      .catch((error) => {
        console.error("Failed to run seeder:", error);
      });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });;
