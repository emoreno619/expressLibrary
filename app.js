var express = require("express")
var bodyParser = require('body-parser')
var app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var bookArr = []
var id = 1


app.get("/", function(req,res){
	res.render("./index", {bookArr: bookArr})
})

app.get("/new", function(req,res){
	res.render("./new")
})

app.get("/delete/:id", function(req,res){
	var anId = req.params.id
	var aBook = {}
	for (var i = 0; i < bookArr.length; i++){
		if (bookArr[i].id == anId){
			aBook = bookArr[i]
		}
	}

	res.render("./delete", {book: aBook})
})

app.get("/edit/:id", function(req,res){
	var anId = req.params.id
	var aBook = {}
	for (var i = 0; i < bookArr.length; i++){
		if (bookArr[i].id == anId){
			aBook = bookArr[i]
		}
	}

	res.render("./edit", {book: aBook})
})

app.put("/books/:id", function(req, res){
	var anId = req.params.id
	var aBook = {}
	for (var i = 0; i < bookArr.length; i++){
		if (bookArr[i].id == anId){
			bookArr[i].title = req.body.title
			bookArr[i].author = req.body.author

		}
	}
	res.redirect("/books")
})

app.delete("/books/:id", function(req, res){
	var anId = Number(req.params.id)
	bookArr.splice(anId-1, 1)
	console.log('hi')
	res.redirect("/books")
})


app.post("/books", function(req,res){
	var aBook = {}
	aBook.title = req.body.title
	aBook.author = req.body.author
	aBook.id = id

	bookArr.push(aBook)

	id++

	res.redirect("/books")
})

app.get("/books/:id", function(req,res){
	var id = Number(req.params.id)

	if(id <= bookArr.length && id > 0){
		var anotherBook = bookArr[id-1]
		res.render("./books",{anotherBook : anotherBook})
	} else {
		res.redirect("/")
	}

})

app.get("/books", function(req,res){

	res.render("index", {bookArr: bookArr})
})


app.listen(3000, function(){
	console.log("Server starting on port 3000")
})