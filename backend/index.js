const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { log } = require('console');

app.use(express.json());
app.use(cors());

// URL-encode your password
const encodedPassword = encodeURIComponent('admin@123+');

// Database connection with MongoDB
const mongoUri = `mongodb+srv://mbiopeter:${encodedPassword}@cluster0.v4km1zl.mongodb.net/`;
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// API creation
app.get("/", (req, res) => {
    res.send("Express App Is Running");
});

//image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage })

//host static files in upload/images folder
app.use("/images", express.static('upload/images'))

//create upload endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    available: {
        type: Boolean,
        default: true,
    }
})

//add product API
app.post('/addProduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    });
})

//Creating API For Deleting Products
app.post("/removeProduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product deleted");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//Creating API For Getting All The Products
app.get("/allProducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products)
})

//User Schema creation
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

//creating endpoint for registering the users

app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email })
    if (check) {
        res.status(400).json({ success: false, errors: "existing user found with the same email address" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})

//creating endpoint for user login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Address" })
    }
})

//creating endpoin for new collection data

app.get("/newcollection", async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New collection fetched")
    res.send(newCollection);
})

//creatind endpoint for populer in women category

app.get("/populerinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    let populer_in_women = products.slice(0, 4);
    console.log("populer in women fetched");
    res.send(populer_in_women);

})

//creating middelware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" })
        }
    }
}

//creating endpoint for addind product in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("added");
})

//creatin gendpoint to remove product from cartDdata

app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("remove");
    }
})

//creating endpoint to fetch cart data

app.post("/getcart", fetchUser, async (req, res) => {
    console.log("Get cart");
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on port " + port);
    } else {
        console.log('Error :' + error);
    }
});