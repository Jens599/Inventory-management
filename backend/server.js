const express = require('express');
const { mongoose } = require('mongoose');

const routes = require('./routes/inventoryRoutes');
const userRoutes = require('./routes/userRoutes');

const port = 4000;
const mongoDbURI = 'mongodb://0.0.0.0:27017/InventoryManagement';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose.connect(mongoDbURI).then(() => {
  app.listen(port, () => {
    console.log('Listening to port:' + port + ' Inventory');
  });
});

app.use('/inventory', routes);
app.use('/inventory/user', userRoutes);
