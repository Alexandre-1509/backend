import express from "express";
import publicRouter from "./routes/public.js";
import privateRouter from "./routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json())

const port = 3000;

app.use('/', publicRouter)
app.use('/', auth, privateRouter)

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`)
})

// soaresallexandre28
// aTGvqJwAtztowBE0
// mongodb+srv://soaresallexandre28:aTGvqJwAtztowBE0@stockflow.noj40nc.mongodb.net/StockFlow?retryWrites=true&w=majority&appName=StockFlow
