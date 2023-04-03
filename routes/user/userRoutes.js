const express = require("express");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require("../../controllers/user/usersController.js");

router.route("/")
    .get(getAllUsers)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;