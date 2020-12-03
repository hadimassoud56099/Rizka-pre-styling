const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")("sk_test_51HqQGGAlocIN8KSLtlHISzhxnMEu1OJnW8oXu7uOdblR0Hs9haRtKSm6Xqu1jgNioYVDXBrPP6plc0B8D2xrYcRs00wabyuQJn");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


const calculateOrderAmount = items => {
   const amount=parseInt(items)*100;
  return amount;
};
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

// Connect to MongoDB

const db = require("./config/keys").mongoURL;

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  app.use("/users",require('./routes/userRouter'));
  app.use("/landInfo",require('./routes/landRouter'));
  app.use("/usersLand",require('./routes/UsersLandRouter'));
  app.use("/usersPayment",require('./routes/UsersPaymentRouter'))
 

  const port = process.env.PORT || 4000;

  app.listen(port, () => console.log(`Server up and running on port ${port} `));