import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import pvs from './models/pvs.js';
import auth from './models/auth.js';
import pv from './models/pv.js';
import pvr from './models/pvr.js';
import check from './models/check.js';
import CheckData from './models/check.js';
import orderdata from './models/orderdata.js';
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://prabhuvamsi:MknZp0p0JOzbNPeM@cluster0.enb7uoz.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Product = mongoose.model('Products', {
  title: String,
  price: Number,
});

const novel = mongoose.model('novels',{
  image:String
});
const bala = mongoose.model('balas',{
  image:String
});
const lakshman = mongoose.model('lakshmans',{
  image:String
});
const prabhu = mongoose.model('prabhus',{
  image:String
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Connected to Database & Listening to localhost ${PORT}`);
});
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/balas', async (req, res) => {
  try {
    const products = await bala.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/lakshmans', async (req, res) => {
  try {
    const products = await lakshman.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/prabhus', async (req, res) => {
  try {
    const products = await prabhu.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/novels', async (req, res) => {
  try {
    const products = await novel.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await auth.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new auth({ username, password });
      await newUser.save();
  
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed', error: error.message });
      console.log(error)
    }
  });
  
  // Backend
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await auth.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // You can generate a token and send it to the client for future authenticated requests
      // For simplicity, let's send a success message in this example.
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error: error.message });


    }
  });

  app.post('/cart/add', async (req, res, next) => {
    console.log(req.body);
    try {
        const { username, product } = req.body;
        const { title, price, img } = product;

        // Create a new cart item with the received data
        const cartItem = new pvs({ username, title, price, img });

        // Save the cart item to the database
        await cartItem.save();

        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

 

app.post('/jd', (req, res, next) => {
  console.log(req.body);
  const {  img } = req.body;

  const pq = new pvr({
      img,
  });

  try {
      pq.save();
      res.status(200).json({ pvs });
  } catch (err) {
      console.log(err);
      res.status(500).send('Error while saving data');
  }
});


  app.post('/addbooks', async (req, res, next) => {
    try {
      const { image } = req.body;
  
      const newBook = new pv({
        image,
      });
  
      await newBook.save();
  
      res.status(200).json({ message: 'Book added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error while saving data");
    }
  });
  
  app.get('/getstudents', async (req, res, next) => {
    const { username } = req.query;
  
    try {
      const cartdata = await pvs.find({ username });
      res.status(200).json({ studentdata: cartdata });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving cart items" });
    }
  });
  

app.delete('/deletestudent/:id', (req, res) => {
  const studentId = req.params.id;
  
  pvs.findByIdAndRemove(studentId)
    .then(() => {
      res.send({ message: 'Student deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error while deleting student data' });
      });
  });

app.post('/address', async (req, res, next) => {
  try {
    const { firstname, lastname, email, phonenumber, phone, address, pincode ,username} = req.body;

    const newCheck = new CheckData({
      firstname,
      lastname,
      email,
      phonenumber,
      phone,
      address,
      pincode,
      username
    });

    await newCheck.save();

    res.status(200).json({ message: 'Data added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while saving data");
  }
});


// Example in Express.js
const orderSchema = new mongoose.Schema({
  items: [{ 
    title: String,
    price: Number,
    img: String,
    username:String,
    firstname:String,
    lastname:String,
    email: String,
    phonenumber: String,
    pincode: String,
    address: String,
    phone:Number
  }]
});

const Order = mongoose.model('Order', orderSchema);

app.post('/orderdata', async (req, res) => {
  try {
    const { check, students } = req.body;
    const { firstname, lastname, phonenumber, pincode, email, address, phone, username } = check;
    const items = students.map(student => ({
      title: student.title,
      price: student.price,
      img: student.img,
      username: student.username,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      pincode: pincode,
      email: email,
      address: address,
      phone: phone
    }));
    const newOrder = new Order({ items });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});
