const express = require("express")
const cors = require("cors")
const { connect } = require("./mongoDBConfig/mongoClient")
const productsRouter = require("./routes/productsRouter")
const cartRouter = require("./routes/cartRouter")
const reviewsRouter = require("./routes/reviewsRouter")
const advertisedProductsRouter = require("./routes/advertisedProductsRouter")
const showFilesRouter = require("./routes/showFilesRouter")
const membershipsRouter = require("./routes/membershipsRouter")
const authRouter = require("./routes/authRouter")
const couponsRouter = require("./routes/couponsRouter")
const purchasesRouter = require("./routes/purchasesRouter")
const message = require("./routes/message_router");
const messageRouter = require("./routes/message_router")
const usersRouter = require("./routes/usersRouter")
const chatRoutes = require("./routes/socketRouter")


const port = process.env.PORT || 5000;

// middlewares
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//socket.io require http server
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io")
const adminRouter = require("./routes/adminRouter")
const paymentRouter = require("./routes/paymentRouter")


// With this line (allow all origins for testing, update in production)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const chat = chatRoutes(io);;


connect()
  .then(() => {
    // products routes
    app.use("/products", productsRouter);

    // cart routes
    app.use("/cart", cartRouter);

    // reviews routes
    app.use("/reviews", reviewsRouter);

    // advertised products routes
    app.use("/advertisedProducts", advertisedProductsRouter);

    // show files routes
    app.use("/files", showFilesRouter);

    // memberships routes
    app.use("/memberships", membershipsRouter);

    // authentication and authorization routes
    app.use("/auth", authRouter);

    // purchases routes
    app.use("/purchases", purchasesRouter)

    // coupons routes
    app.use("/coupons", couponsRouter)

    //message routes
    app.use("/message", messageRouter);

    // users routes
    app.use("/users", usersRouter);

    //socket.io
    app.use('/chat', chat);

    //admin routes
    app.use('/admin', adminRouter);

    //payment routes
    app.use('/payment', paymentRouter);

  })
  .catch((err) => console.log(err));

app.get("/", (_, res) => {
  res.send("Server is running");
});

httpServer.listen(port, () => console.log("Server is running on port:", port));
