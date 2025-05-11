const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());

// app.use('/users', userRoutes);
const loadRoutes = require('./utils/routerLoader');
loadRoutes(app, path.join(__dirname, 'routes'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
