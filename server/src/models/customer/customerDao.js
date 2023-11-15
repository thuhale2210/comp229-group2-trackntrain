const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Customer = require('./customer');

class CustomerDao{

    constructor(){
        mongoose.connect('mongodb+srv://alexrosario:7gXEavt2BAugFGJ8@cluster0.y3audej.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
        {useNewUrlParser:true});
        
        this.connection = mongoose.connection;
        this.connection.once('open',()=>{
            console.log("DB connected......")
        })
    }

    async create(req, res){
        const { firstName, lastName, email, password, role } = req.body;

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newCustomer = new Customer({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        //Save the user
        newCustomer.save(req.body)
        .then(products => res.status(200).json(products))
        .catch(err => res.status(400).json({"error":err}));
    }
}

module.exports = CustomerDao;