const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const userApiRoutes = require('./routes/userApi.routes');
const userProfileRoutes = require('./routes/userProfile.routes');

app.use(express.json());
app.use(errorHandler);

app.use('/users', userApiRoutes);
app.use('/profile', userProfileRoutes);

app.use(notFound);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

process.on('SIGINT', () => {
    require('./config/db').end();
    process.exit();
});
