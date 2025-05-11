const fs = require('fs');
const path = require('path');

function loadRoutes(app, routesDir) {
    fs.readdirSync(routesDir).forEach(file => {
        const routePath = path.join(routesDir, file);
        const route = require(routePath);
        const routeName = file.split('.')[0]; // Имя файла без расширения
        app.use(`/${routeName}`, route);
    });
}

module.exports = loadRoutes;
