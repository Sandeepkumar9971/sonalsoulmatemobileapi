const express = require('express')
const connectDB = require('./utils/dbconnection')
const app = express()
const cors = require('cors');
const registerschema = require('./utils/model/allusers')
const PORT = 4000

connectDB()
app.use(cors())
app.use(express.json())

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})
app.post('/addprofile',async(req,resp)=>{
    const {userData} = req.body
    console.log(userData)
    resp.send('sucessfull')
})
app.get('/allusers', async (req,resp) => {
   
    const alluserdata = await registerschema.find({})
    resp.json(alluserdata)
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app