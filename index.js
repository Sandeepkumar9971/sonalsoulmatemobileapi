const express = require('express')
const connectDB = require('./model/dbconnection')
const app = express()
const cors = require('cors');
const registerschema = require('./model/allusers')
const PORT = 4000

connectDB()
app.use(cors())
app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})
app.get('/allusers', async (req,resp) => {
    const alluserdata = await registerschema.find({})
    resp.json(JSON.stringify(alluserdata))
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app