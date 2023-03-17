const connection = require ("./database/db")
const express = require ("express")
const cors = require ("cors")

//Routerlar
const authRouter = require("./routers/auth.router")
const todoRouter = require("./routers/todo.router")

//Api istekleri için application
const app = express();

//İsteklerin türü JSON olarak ayarlanır
app.use(express.json());

//CORS politikası yazılıyor
app.use(cors())

//Db Conneciton
connection().then()

//Auth Router: Api isteğini çağırmak için
app.use("/api/auth", authRouter)

//Todo Router
app.use("/api/todo/", todoRouter)

//Server Dinlemme
app.listen(3000, ()=> console.log("Server is live..."))