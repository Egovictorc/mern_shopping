const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
 const auth = require("../../middleware/auth")
const item = require("../../models/Item")

// @route GET api/items
// @desc GET all items
// @access GET api/items

router.get("/", (req, res) => {
  item.find()
  .sort({date: -1})
  .then( items => res.json(items))
})

// @route GET api/items
// @desc create a post
// @access GET api/items
router.post("/", auth, (req, res) => {
    const newItems = new item({
        name: req.body.name
    });

   newItems.save()
   .then( item => res.json(item))
})


router.delete("/:id", auth, (req, res) => {
    const id = req.params.id;
    // item.findByIdAndDelete(id)
    item.findById(id)
    .then(item => item.remove()
    .then( () => res.json({success: true})))
    .catch( err => res.status(404).json({success: false}))
})
module.exports = router;