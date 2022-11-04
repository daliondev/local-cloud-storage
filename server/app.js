const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const fs = require("fs")

//Aplicacion
const app = express()

/* 
------------------------------------------
IMPORTE DE RUTAS
------------------------------------------
*/
const upload = require("./src/routes/upload")
const apiFiles = require("./src/routes/apiFiles")
const apiFilesDir = require("./src/routes/apiFilesDir")
const delFile = require("./src/routes/delFile")

//Settings
app.set("port", 3000)

//CORS
app.use(cors()) //Todos los origenes

//Development dependencie
app.use(morgan("dev"))

/* 
------------------------------------------
        RUTAS BASE Y MIDDLEWARES
------------------------------------------
*/

app.get("/", (req, res) => {
  res.redirect("/upload")
})

app.get("/upload", (req, res) => {
  res.sendFile("./views/index.html", {
    root: __dirname,
  })
})

/* 
------------------------------------------
      MODULOS QUE USAN METODO GET
------------------------------------------
*/

//"/upload/files/:dir"
app.use(apiFilesDir)

// "/upload/files"
app.use(apiFiles)

/* 
  ------------------------------------------
        MODULOS QUE USAN METODO POST
  ------------------------------------------
*/

//Api upload
app.use(upload)

/* 
  ------------------------------------------
        MODULOS QUE USAN METODO DEL
  ------------------------------------------
*/
app.use(delFile)

/* 
  ------------------------------------------
                SERVER RUN 
  ------------------------------------------
*/

app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
)
