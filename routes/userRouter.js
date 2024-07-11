const express = require("express");
const { handleGetAllUsers } = require("../controllers/userController");
const { handleGetUserById } = require("../controllers/userController");
const { handleCreateUser } = require("../controllers/userController");
const {handleDeleteUserById} = require("../controllers/userController");
const {handleUpdateUserById} = require("../controllers/userController");
const router = express.Router();

// we created the different routes and register these routes using the router and exported them

router.get("/", handleGetAllUsers);

router.get("/:id", handleGetUserById);

router.post("/", handleCreateUser);

router.delete("/:id", handleDeleteUserById);

router.patch("/:id", handleUpdateUserById);
// app.patch("/api/users/:id", (req, res) => {
//     const userId = parseInt(req.params.id, 10); // Convert the id to an integer
//     const userIndex = users.findIndex(user => user.id === userId); // Find the index of the user
//     const body = req.body;
//     if (userIndex !== -1) { // Check if user exists
//         users[userIndex] = { ...users[userIndex], ...body }; // Update the user in the array
//         fs.writeFile("MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ status: "error", message: "Failed to write to file" });
//             }
//             res.json({ status: "success", id: userId });
//         });
//     } else {
//         res.status(404).json({ status: "error", message: "User not found" });
//     }

// })
module.exports = router;
