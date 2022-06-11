require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const personRoutes = require('./routes/personRoutes');
const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/person', personRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hi, Express!'});
});

//Models
const User = require('./models/User');

app.post('/auth/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const userExists = await User.findOne({ email });
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({ name, email, password: passwordHash });

  if(!name || !email || !password || !confirmPassword){
    return res.status(422).json({ message: 'The name, email, password and confirmPassword are required' });
  };

  if(password !== confirmPassword){
    return res.status(422).json({ message: 'Passwords are not the same' })
  }
 
  if(userExists){
    return res.status(422).json({ message: 'You need to use another email.'});
  }

  try{
    await user.save();
    res.status(201).json({ message: 'User has been created with success' })
  }catch(err){
    return res.status(500).json({ message: err })
  }
})

app.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  const checkPassword = await bcrypt.compare(password, userExists.password);

  if(!email || !password){
    return res.status(422).json({ message: 'email and password are required' });
  };

  if(!userExists){
    return res.status(404).json({ message: 'User not found.'});
  }

  if(!checkPassword){
    return res.status(422).json({ message: 'Invalid Password!'});
  }

})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.knjgws6.mongodb.net/?retryWrites=true&w=majority`)
  .then(res => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })