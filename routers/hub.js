const express = require("express")
const messageRouter = require("./message")
const hubs = require("../hubs/hubs-model.js")

const router = express.Router()

router.use("/:id/messages", messageRouter)

router.get("/", (req, res) => {
  const opts = {
    limit: req.query.limit, 
    sortby: req.query.sortby,
    sortdir: req.query.sortdir
  }
  hubs.find(opts)
    .then(hubs => {
      res.status(200).json(hubs)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the hubs",
      })
    })
})

router.get("/:id", (req, res) => {
  hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub)
      } else {
        res.status(404).json({ message: "Hub not found" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the hub",
      })
    })
})

router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Missing hub name" })
  }

  hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error adding the hub",
      })
    })
})

router.put("/:id", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Missing hub name" })
  }

  hubs.update(req.params.id, req.body)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub)
      } else {
        res.status(404).json({ message: "The hub could not be found" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error updating the hub",
      })
    })
})

router.delete("/:id", (req, res) => {
  hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" })
      } else {
        res.status(404).json({ message: "The hub could not be found" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error removing the hub",
      })
    })
})

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = router