document.addEventListener("deviceready",init, false);
	var app = {};
	app.db = null;
	
	//sermon database
	app.openDb = function(){
	if(window.sqlitePlugin !== undefined){
	app.db = window.sqlitePlugin.openDatabase("user_db", "1.0", "userdb", 1000000);
	} else {
		// For debugging in simulator fallback to native SQL Lite	
		app.db = window.openDatabase("user_db", "1.0", "userdb", 1000000);
		}
	}
	//create table
	app.createTable = function(){
		app.db.transaction(function(tx){
			//tx.executeSql('DROP TABLE sermon');
			tx.executeSql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, last VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,version VARCHAR(255) NOT NULL, datecreated DATE)');
		});
	}
	function init(){
		app.openDb();
		app.createTable();
		getAllTheData();
		 getBibleVersion();
	}
	//insert record
	app.insertRecord = function(n,l,e,v,d){
		app.db.transaction(function(tx){
			var d=new Date();
			tx.executeSql('INSERT INTO user(name,last,email,version,datecreated) VALUES (?,?,?,?,?)',
				[n,l,e,v,d],
				app.onSuccess,
				app.OnError);
				console.log(" from db: "+n,l,e,v,d);
		});
	} 
	//function will be called when process succeed
    app.onSuccess = function (tx, r){
        alert("información guardada");
		
		window.location.replace('index.html');
		
    }
	//function will be called when process succeed
    app.onError = function (tx, e){
        console.log("SQLite error: "+e.message);
    }
	//update table
	app.updateRecord = function(id, st,sta,sc) {
		app.db.transaction(function(tx) {
			var mDate = new Date();
			tx.executeSql("UPDATE user SET name =?,sermontag=?,last=?,email=?,version=? WHERE id = ?",
                      [st, sta,sc, mDate, id],
                      app.onSuccess,
                      app.onError);
		});
	}
	//delete record
	app.deleteRecord = function(id,t) {
		var delQ = confirm("¿Está seguro que desea borrar esta información");
		if(delQ == true){
		app.db.transaction(function(tx) {
			tx.executeSql("DELETE FROM user WHERE id = ?",
                      [id],
                      app.onSuccess,
                      app.onError);
		});
		
	}else{ 
		return false;
		}
		
	}
	//select all from sermon_db
	app.selectAllRecords = function(fn) {
		app.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM user", [],
                      fn,
                      app.onError);
		});
	}
	function getAllTheData() {
		var render = function (tx, rs) {
			// rs contains our SQLite recordset, at this point you can do anything with it
			// in this case we'll just loop through it and output the results to the console
			for (var i = 0; i < rs.rows.length; i++) {
				//console.log(rs.rows.item(i));
				var rows = rs.rows.item(0);
				$('h2.welcome').text("Bienvenido " +rows['name']+" "+rows['last']);
			}
		}
		app.selectAllRecords(render);
	}
	function getBibleVersion() {
		var bible = function (tx, rs) {
			// rs contains our SQLite recordset, at this point you can do anything with it
			// in this case we'll just loop through it and output the results to the console
				var rows = rs.rows.item(0);
				localStorage.setItem("data",rows['version']);
			}
		app.selectAllRecords(bible);
	}

//sermon database
document.addEventListener("deviceready",init2, false);
	var app2 = {};
	app2.db = null;
	
	
	app2.openDb = function(){
	if(window.sqlitePlugin !== undefined){
	app2.db = window.sqlitePlugin.openDatabase("sermon_db", "1.0", "sermondb", 1000000);
	} else {
		// For debugging in simulator fallback to native SQL Lite	
		app2.db = window.openDatabase("sermon_db", "1.0", "sermondb", 1000000);
		}
	}
	//create table
	app2.createTable = function(){
		app2.db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS sermon(id INTEGER PRIMARY KEY AUTOINCREMENT, sermontitle VARCHAR(255) NOT NULL, sermontag VARCHAR(255) NOT NULL,sermoncontent VARCHAR(255) NOT NULL,sermoncreated DATE)');
		});
	}
	function init2(){
		app2.openDb();
		app2.createTable();
		getAllTheData2();
	}
	//function will be called when process succeed
    app2.onSuccess = function (tx, r){
        alert("Sermon Guardado");
		window.location.replace('sermonlist.html');
    }
	app2.onDeleteSuccess = function (tx, r){
        alert("Sermon eliminado");
		
    }
	
	//function will be called when process succeed
    app2.onError = function (tx, e){
        console.log("SQLite error: "+e.message);
    }
	//insert record
	app2.insertRecord = function(t,tg,c,d){
		app2.db.transaction(function(tx){
			tx.executeSql('INSERT INTO sermon(sermontitle,sermontag,sermoncontent,sermoncreated) VALUES (?,?,?,?)',
				[t,tg,c,d],
				app2.onSuccess,
				app2.OnError);
		});
	} 
	
	//update table
	app2.updateRecord = function(id, st,sta,sc) {
		app2.db.transaction(function(tx) {
			var mDate = new Date();
			tx.executeSql("UPDATE sermon SET sermontitle =?,sermontag=?,sermoncontent=?,sermonedited=? WHERE id = ?",
                      [st, sta,sc, mDate, id],
                      app2.onSuccess,
                      app2.onError);
		});
	}
	//delete record
	app2.deleteRecord = function(id,t) {
		var delQ = confirm("¿Está seguro que desea borrar este sermón: "+t+"");
		if(delQ == true){
		app2.db.transaction(function(tx) {
			tx.executeSql("DELETE FROM sermon WHERE id = ?",
                      [id],
                      app2.onDeleteSuccess,
                      app2.onError);
		});
		
	}else{ 
		return false;
		}
		
	}
	//select all from sermon_db
	app2.selectAllRecords = function(fn) {
		app2.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM sermon ORDER BY id", [],
                      fn,
                      app2.onError);
		});
	}
	function getAllTheData2() {
		var render = function (tx2, rs) {
			// rs contains our SQLite recordset, at this point you can do anything with it
			// in this case we'll just loop through it and output the results to the console
			for (var i = 0; i < rs.rows.length; i++) {
				var rows = rs.rows.item(i);
				$('.sermoncount').text(i+1);
				var fecha = rows['sermoncreated'];
				$('#sermonlist').append('<li><a href="#" data-transition="slide"><h3>'+rows['sermontitle']+'</h3><p><strong>Tema: '+rows['sermontag']+'</strong></p><p>Creado en '+fecha+'</p><a id="del-opt" data-id="'+rows['id']+'"href="#optionsPopup" data-rel="popup" data-position-to="window" data-theme="b" data-icon="gear" class="ui-btn-right">Opciones</a></a></li>');
			}
			$('#sermonlist #del-opt').on('click', function(){
				var sId = $(this).attr("data-id");
				$('#optionsPopup #del-sermon').attr('onclick','app2.deleteRecord('+sId+',\'' +rows['sermontitle']+'\');');
			});
			$('#sermonlist').listview().listview("refresh");
		}
		app2.selectAllRecords(render);
	}