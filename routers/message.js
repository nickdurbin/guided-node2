const express = require("express")
const hubs = require("../hubs/hubs-model.js")

const router = express.Router({
  mergeParams: true,
})

router.get("/", (req, res) => {
  hubs.findHubMessages(req.params.id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not get the hub messages."
      })
    })
})

router.get("/:messageId", (req, res) => {
  hubs.findHubMessageById(req.params.id, req.params.messageId)
    .then(data => {
      if (data) {
        res.json(data)
      } else {
        res.status(404).json({ message: "Message was not found."})
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not get the hub message."
      })
    })
})

router.post("/", (req, res) => {

  if (!req.body.sender || !req.body.text) {
    return res.status(400).json({
      message: "Need sender and text value."
    })
  }

  const body = {
    sender: req.body.sender,
    text: req.body.text,
  }

  hubs.addHubMessage(req.params.id, body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not create message."
      })
    })
})

module.exports = router