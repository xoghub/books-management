const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/books', bookRoutes);

// Error handler
app.use(errorHandler);

// Database connection
db.authenticate()
  .then(() => {
    console.log('Database connected');
    return db.sync();
  })
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });

module.exports = app;

// const express = require('express');
// const cors = require('cors');
// const bookRoutes = require('./routes/bookRoutes');
// const errorHandler = require('./middleware/errorHandler');
// const db = require('./config/database');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/books', bookRoutes);

// // Error handler
// app.use(errorHandler);

// // Database connection
// db.authenticate()
//   .then(() => {
//     console.log('Database connected');
//     return db.sync();
//   })
//   .then(() => {
//     console.log('Database synchronized');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to connect to database:', err);
//   });

// sequalize.sync().then(()=> {
//   app.listen(process.env.PORT, ()=> console.log('server running'));
// });

// module.exports = app;