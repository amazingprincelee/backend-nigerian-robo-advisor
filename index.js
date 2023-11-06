import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const localPort = 3000;
const app = express();  

mongoose.connect(`mongodb+srv://amazingprincelee:${process.env.ATAFRICA_DB_PASSWORD}@cluster0.uumprvv.mongodb.net/atAfricaDB`)
  .then(() => console.log('Connected!'));

app.use(express.json()); 

const portfolioSchema = new mongoose.Schema({
    rickScore: Number,
    nigerianStocks: String,
    foriegnStocks: String,
    techStocks: String,
    emergencyStocks: String,
    nigerianBonds: String,
    foreignBonds: String,
    commodities: String,
    realEstate: String,
    tBills: String,
    alternative: String
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema, 'samplePortfolio');

app.get("/api/portfolio", async (req, res)=>{

    try{
        const data = await Portfolio.find()
        res.json(data)

    }catch(err){
        res.status(500).json({message: "server error"})
    }

});

app.get("/api/portfolio/:score", async (req, res)=>{

    try{
        const score = parseInt(req.params.score);
        const data = await Portfolio.findOne({"Risk Score/Tolerence":score})
        res.json(data)
    }catch(error){
        res.json({message:"no data found"})
    }
    
    
});



app.listen(process.env.PORT || localPort, ()=>{
    console.log(`Server running on port ${localPort}`)
});

