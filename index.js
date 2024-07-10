const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express(); // Initialize app here

app.use(express.json());
const port = 3000;

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded




// routes
app.get("/api/users", (req, res) => {
  const html = `<ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
</ul>`;
  res.send(html);
});


app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  res.json(users[id - 1]);
});



app.post("/api/users", (req, res) => {
  //Todo create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) throw err;
    res.json({ status: "success", id: users.length });
  });
});



app.delete("/api/users/:id", (req, res) => {
  //check type of userid before converting to parseInt:
  // const prevId = req.params.id
  // console.log(typeof prevId);
  const userId = parseInt(req.params.id, 10); // Convert the id to an integer
  const userIndex = users.findIndex((user) => user.id === userId); // Find the index of the user

  if (userIndex !== -1) {
    // Check if user exists
    users.splice(userIndex, 1); // Remove the user from the array
    fs.writeFile("MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write to file" });
      }
      res.json({ status: "success", id: userId });
    });
  } else {
    res.status(404).json({ status: "error", message: "User not found" });
  }
});



app.patch("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => {
    return user.id === userId;
  });
  const body = req.body;
  //testing
  // console.log(`user Found with index : ${userIndex}`);
  // res.json({status:"success" , id : userId});
  if (userIndex !== -1) {
    // users[userIndex] = {...users[userIndex],...body}
    updatedUser = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender : req.body.gender
    }
     users[userIndex] = {updatedUser,...body}
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to write to file" });
        }
        res.json({status:"succes",id:userId})
    });
  }else {
            res.status(404).json({ status: "error", message: "User not found" });
        }
});
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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
