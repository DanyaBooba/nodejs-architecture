const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use(errorHandler);
app.use('/users', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

process.on('SIGINT', () => {
    require('./config/db').end();
    process.exit();
});
