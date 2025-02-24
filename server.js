const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://ashrfhmz777:tLGeg8IkddsbMJms@main.w0wms.mongodb.net/?retryWrites=true&w=majority&appName=main')
.then (()=>{
    console.log("DB connected successfully");
})
.catch((err)=>{
    console.log(err);
    console.log("DB connection error"); 
})

const MyDataSchema = new mongoose.Schema({ 
    text: String
})

const MyDataModel = mongoose.model('Data', MyDataSchema);


// Middleware to parse JSON requests
app.use(express.json());

// GET: Fetch all stored data
app.get('/', async (req, res) => {
    try {
        const allData = await MyDataModel.find(); // Retrieve all documents
        res.status(200).json(allData);
    } catch (err) {
        res.status(500).json({ error: "Error fetching data" });
    }
})

// POST: Save data to MongoDB
app.post('/', async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ error: "Text field is required" });
        }

        const newData = new MyDataModel({ text: req.body.text });
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (err) {
        res.status(500).json({ error: "Error saving data" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
