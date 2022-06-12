const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = require('express').Router();

router.post('/signup', async (req, res) => {
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
    return res.status(201).json({ message: 'User has been created with success' });
  }catch(err){
    return res.status(500).json({ message: err })
  }
})

router.post('/signin', async (req, res) => {
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

  try{
    const secret = process.env.SECRET;
    const token = jwt.sign({
      id: userExists._id
    }, secret)

    return res.status(200).json({ message: 'You have just been authenticated.', token })
  }catch(err){
    res.status(500).json({
      msg: 'It has happened an error, try again!'
    })
  }
});

module.exports = router;