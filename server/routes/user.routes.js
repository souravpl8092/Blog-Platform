const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middleware/authenticate.middleware");
const { getUser, updateUser } = require("../controllers/user.controller");

userRouter.use(authMiddleware);
userRouter.route("/").get(getUser).put(updateUser);

module.exports = userRouter;
