const Datastore = require('nedb')

exports.index = (req, res) => {
	const db = new Datastore ({filename: 'lvivarc.json', autoload: true })
	db.find ({table: "arctype"}, (err, docs) => {
		res.render ('index', {types: docs})
}
)}

exports.arcObjects = (req, res) => {
  typeId = parseInt(req.params.id)
  const db = new Datastore({ filename: 'lvivarc.json', autoload: true })
  db.findOne({table: "arctype", id: typeId}, (err, type) => {
    if (err) {
      res.sendFile(path + '404.html')
    } else {
      db.find({table: "arcobj", type_id: typeId }, (err, docs) => {
        if (err) {
          res.sendFile(path + '404.html')
        } else {
          res.render('objects', {objects: docs, type: type })
        }
      })
    }
  })
  
}

exports.arcObject = (req,res) => {
	objId = parseInt(req.params.id)
	const db = new Datastore({filename: 'lvivarc.json', autoload:true})
	db.findOne({table: "arcobj", id: objId}, (err, obj) => {
		if(err) {
			res.sendFile(path + '404.html')
		} else {
			typeId = obj.type_id
			db.findOne({table:"arctype", id: typeId}, (err, type) => {
				if (err) {
					res.sendFile(path + '404.html')
				} else {
					res.render('object', {obj: obj, type: type})
				}
			})
		}
	})
}


exports.error404 = (req,res) => {
	res.sendFile(path+ '404.html')
}
