require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userController = require("./controllers/userControllers")
const collectionController = require("./controllers/collectionControllers")
const photoController = require("./controllers/photoControllers")
const requireAuth = require("./middleware/requireAuth")
const connectToDb = require("./config/connectToDb")
const session = require('express-session')






const app = express()
const corsOptions = {
    origin: 'https://unsplash-collection-frontend.onrender.com',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
    
  
  };
  app.set("trust proxy",1);
  app.use(cors(corsOptions));


connectToDb()

app.use(express.json())
app.use(cookieParser())


app.post("/api/signup", userController.signup);
app.get("/verify-email")
app.get("/api/verify-email/:id/verify/:token", userController.verifyEmail)
app.post("/api/login",  userController.login);
// app.post("/resendEmail", userController.sendEmailVerification)
app.get("/api/logout",  userController.logout);
app.get("/api/checkAuth", requireAuth, userController.checkAuth);

app.post("/api/forget-password", userController.forgetPassword)
app.post("/api/resetPassword/:token", userController.resetPassword)

app.get("/api/collections", requireAuth, collectionController.fetchCollections);
app.get("/api/collections/:id", requireAuth, collectionController.fetchCollection);
app.get("/api/image/:id/collections", requireAuth, collectionController.fetchCollectionImg)
app.post("/api/collections",  requireAuth, collectionController.createCollection);
app.delete("/api/collections/:id", requireAuth, collectionController.deleteCollection);

app.get("/api/collections/:id/image", requireAuth, photoController.fetchImages)
app.get("api/collections/:id/image", requireAuth, photoController.fetchImage)
app.get("/api/image/:id", requireAuth, photoController.fetchImage)
app.post("/api/collections/:id/image", requireAuth, photoController.addImage)
app.delete("/api/image/:id", requireAuth, photoController.deleteImage)


// const PORT = process.env.PORT || 3000

app.listen(process.env.PORT || 3000, console.log(`listening on Port ${process.env.PORT || 3000}`));
