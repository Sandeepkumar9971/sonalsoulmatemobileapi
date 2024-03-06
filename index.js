const express = require('express')
const connectDB = require('./utils/dbconnection')
const app = express()
const cors = require('cors');
const registerschema = require('./utils/model/allusers')
const loginSchema = require('./utils/model/login')
const PORT = 4000

connectDB()
app.use(cors())
app.use(express.json())

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})
app.post('/addprofile', async (req, resp) => {
  const { userData } = req.body
  console.log("sasajs", userData)
  resp.send('sucessfull')
})

app.get('/allusers', async (req, resp) => {

  const alluserdata = await registerschema.find({})
  resp.json(alluserdata)
})
app.post('/user/authregister', async (req, resp) => {
  const { userData } = req.body
  const { mobile, Email } = userData
  const agg = [
    {
      '$match': {
        mobile: mobile
      }
    }
  ]
  const data = await loginSchema.aggregate(agg)
  if (data.length > 0) {
    const repdata = {
      rspdata: [],
      command: 0,
      msg: 'mobile no already exist'
    }
    resp.json(repdata)
  }
  else {
    const registerdata = await loginSchema.create(userData)
    const repdata = {
      rspdata: registerdata,
      command: 1,
      msg: 'Sucessfully registerd'
    }
    resp.json(repdata)
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app