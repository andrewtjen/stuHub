const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('<H1>Library System</H1>')
});

app.get('/try', (req, res) => {
    res.send('<H2>Testing System</H2>')
});

// set up author routes
const authorRouter = require('./routes/authorRouter');
// Handle author-management requests
// the author routes are added onto the end of '/author-management'
app.use('/author-management', authorRouter);

const myRoutes = require("./routes/my-routes");
app.use("/personal-routes", myRoutes);

app.listen(3000, () => {
    console.log('The library app is listening on port 3000!')
});