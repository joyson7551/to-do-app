const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  // res.send("pong")
  // res.json({message:"pong" , Response:"pong"})

  res.write("pong");
  res.write(JSON.stringify({ message: "pong 1", Response: "another pong" }));
  res.end();
});
// =============================================
router.post("/add", (req, res) => {
  const request = req.body;
  // res.json(request);

  if (request.ping) {
    res.json(request);
  } else {
    res.status(400).json({ Error: "Not Allowed" });
  }
});
// ===================================

router.patch("/edit", (req, res) => {
  const request = req.body;
  if (request._id === 'add') {
    res.json({ Response: "Pong" });
  } else {
    res.status(400).json({ Error: "Not Allowed" });
  }
});
//test 
// {
//     "_id":"add"
// }

// response
// {
//     "Response": "Pong"
// }
// ===================================

module.exports = router;
