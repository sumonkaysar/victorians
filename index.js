const express = require("express");
const cors = require("cors");
const { connect } = require("./mongoDBConfig/mongoClient");
const productsRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRouter");
const reviewsRouter = require("./routes/reviewsRouter");
const advertisedProductsRouter = require("./routes/advertisedProductsRouter");
const showFilesRouter = require("./routes/showFilesRouter");
const membershipsRouter = require("./routes/membershipsRouter");
const authRouter = require("./routes/authRoutes");
const message = require("./routes/message_router");
const { messageFileSetMulter } = require("./routes/message_multer_router");

const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

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
    //message
    // app.use("/message", message);

    //message file set multer
    // app.use("/messageFileSet", messageFileSetMulter);
  })
  .catch((err) => console.log(err));

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(port, () => console.log("Server is running on port:", port));
