const express = require('express');

const {
  getAll,
  addItem,
  removeItem,
  updateItem,
  getOne,
  handleSellItem,
} = require('../controller/inventoryController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

//This route is used to get all the data from the database and display it on the page
router.get('/viewAll', getAll);

//This route is used to get a single item from the database based on the id parameter
router.get('/viewOne/:id', getOne);

// Route for adding an inventory item
router.post('/addItem', addItem);

// Route for removing an inventory item
router.delete('/removeItem/:id', removeItem);

//This route is used to update an item in the database
router.patch('/updateItem/:id', updateItem);

router.patch('/handleSell/:id', handleSellItem);

module.exports = router;
