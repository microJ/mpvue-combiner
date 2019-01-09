const fs = require("fs")
const path = require("path")

fs.readdir(__dirname, (err, files) => {
  if (err) throw err
  files.forEach(file => {
    if (file !== "index.js") {
      console.log(`------------- ${file} test start -------------`)
      require(path.resolve(__dirname, file))
      console.log(`------------- ${file} test end ------------- \n`)
    }
  })
})
