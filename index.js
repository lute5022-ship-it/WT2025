express = require('express')
views = require('./views')
path = require('path');
app = express()
app.set("view engine", "ejs")
path = __dirname + '/templates/'
app.set('views', path)
app.use(express.static(__dirname))

app.get('/', views.index)
app.get('/list/:id', views.arcObjects)
app.get('/obj/:id', views.arcObject)
app.use(views.error404)
port = process.env.PORT || 3000

app.listen(port, ()=> {
	console.log("Сервер починає прослуховувати підключення на порт 3000…")
}) 