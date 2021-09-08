(async () => {
  const express = require('express');
  const initializeDatabase = require('./database/config');
  const getModels = require('./database/models');
  const phones = require('./services/phones');
  const cors = require('cors');
  const app = express();
  const port = 2512;

  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());

  // Initialize database
  const db = initializeDatabase();

  // Retrieve database models
  const models = await getModels(db);

  // Emulate waiting time response
  app.use((req, res, next) => {
    const time = Math.random() * (5 - 1) + 1;
    setTimeout(() => next(), (time * 1000));
  });

  // Passing models through services
  app.use((req, res, next) => {
    res.models = models;
    next();
  });

  app.use('/phones', phones);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
})();
