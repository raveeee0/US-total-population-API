const express = require('express');
const populationRoutes = require("./routes/population");
const errorController = require('./controllers/error');

const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use('/population', populationRoutes);

app.use('/', errorController.get404);

app.use(errorController.handleError);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));