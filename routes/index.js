var express = require('express');
var router = express.Router();
var User = require('../models/user');

var Recipe = require('../models/recipe');
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb+srv://User:user12345@cluster0.fywre.mongodb.net/chunk?retryWrites=true&w=majority");
var italian;
var mexican;
var lebanese;
var american;
var irish;


router.get('/register', function (req, res, next) {

	return res.render('register.ejs');
});

router.get('/browsefood', function (req, res, next) {
	return res.render('browsefood.ejs');
});

router.get('/irish', function (req, res, next) {



	
	client.connect();

	irish = client.db("chunk").collection("recipes");
	console.log('Server is started test222 ');
	var restoname = [];
	var address = [];
	var description = [];
	var image = [];
	var cost = [];


	irish.find({ "cuisine": "Irish" }).toArray().then((ans) => {
					for(i=0;i<ans.length;i++){
							//console.log(ans[i].name);
							console.log("test2");
							restoname[i]=ans[i].name;
							address[i]=ans[i].address;
							description[i]=ans[i].description;
							image[i]=ans[i].image;
							console.log(description[i]);
							cost[i]=ans[i].cost;
							//render ('italian.ejs', {"name":ans[i].name});
							
				}

return res.render('irish.ejs', {restoname:restoname,address:address,description:description,image:image,cost:cost});
				
});

	
});


router.get('/american', function (req, res, next) {



	
	client.connect();

	american = client.db("chunk").collection("recipes");
	console.log('Server is started test222 ');
	var restoname = [];
	var address = [];
	var description = [];
	var image = [];
	var cost = [];


	american.find({ "cuisine": "American" }).toArray().then((ans) => {
					for(i=0;i<ans.length;i++){
							//console.log(ans[i].name);
							console.log("test2");
							restoname[i]=ans[i].name;
							address[i]=ans[i].address;
							description[i]=ans[i].description;
							image[i]=ans[i].image;
							console.log(description[i]);
							cost[i]=ans[i].cost;
							//render ('italian.ejs', {"name":ans[i].name});
							
				}

return res.render('american.ejs', {restoname:restoname,address:address,description:description,image:image,cost:cost});
				
});

	
});


router.get('/lebanese', function (req, res, next) {



	
	client.connect();

	lebanese = client.db("chunk").collection("recipes");
	console.log('Server is started test222 ');
	var restoname = [];
	var address = [];
	var description = [];
	var image = [];
	var cost = [];


	lebanese.find({ "cuisine": "Lebanese" }).toArray().then((ans) => {
					for(i=0;i<ans.length;i++){
							//console.log(ans[i].name);
							console.log("test2");
							restoname[i]=ans[i].name;
							address[i]=ans[i].address;
							description[i]=ans[i].description;
							image[i]=ans[i].image;
							console.log(description[i]);
							cost[i]=ans[i].cost;
							//render ('italian.ejs', {"name":ans[i].name});
							
				}

return res.render('lebanese.ejs', {restoname:restoname,address:address,description:description,image:image,cost:cost});
				
});

	
});


router.get('/mexican', function (req, res, next) {



	
	client.connect();

	mexican = client.db("chunk").collection("recipes");
	console.log('Server is started test222 ');
	var restoname = [];
	var address = [];
	var description = [];
	var image = [];
	var cost = [];


	mexican.find({ "cuisine": "Mexican" }).toArray().then((ans) => {
					for(i=0;i<ans.length;i++){
							//console.log(ans[i].name);
							console.log("test2");
							restoname[i]=ans[i].name;
							address[i]=ans[i].address;
							description[i]=ans[i].description;
							image[i]=ans[i].image;
							console.log(description[i]);
							cost[i]=ans[i].cost;

							//render ('italian.ejs', {"name":ans[i].name});
							
				}

return res.render('mexican.ejs', {restoname:restoname,address:address,description:description,image:image,cost:cost});
				
});

	
});


router.get('/italian', function (req, res, next) {
	
	client.connect();
	italian = client.db("chunk").collection("recipes");
	
	console.log('Server is started test222 ');
	var restoname = [];
	var address = [];
	var description = [];
	var image = [];
	var cost = [];
	


	italian.find({ "cuisine": "Italian" }).toArray().then((ans) => {
					for(i=0;i<ans.length;i++){
							//console.log(ans[i].name);
							console.log("test2");
							restoname[i]=ans[i].name;
							address[i]=ans[i].address;
							description[i]=ans[i].description;
							image[i]=ans[i].image;
							cost[i]=ans[i].cost;
							console.log(description[i]);

							//render ('italian.ejs', {"name":ans[i].name});
							
				}

return res.render('italian.ejs', {restoname:restoname,address:address,description:description,image:image,cost:cost});
				
});

	
});


router.get('/', function (req, res, next) {
	console.log("test");
	return res.render('new_index.ejs');
});


router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"passwords did not match!"});
		}
	}
});


router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});


router.get('/map', function (req, res, next) {
	console.log("map");
	
	recipe.find({}, { projection: { name: 0} },function(err,data){
		console.log("data");
		//console.log(data);
		
		console.log(data[1].lat);
		return res.render('index.ejs', {"namee":data[1].lat});
		
		
	});
	

	
});


router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});

				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not registered!"});
		}
	});
});


router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.username,"email":data.email});
		}
	});
});


router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});


router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});


router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Passwords donot match! Both Passwords should be same."});
		}
		}
	});
	
});


router.get('/restaurant', function (req, res, next) {
	//res.render("restaurant.ejs");
	client.connect();
	resto = client.db("chunk").collection("menu_item");
	
	var name = [];
	var description = [];
	var price = [];
	var image = [];

	resto.find({ "restaurant": req.query.resto }).toArray().then((ans) => {
		for(i=0;i<ans.length;i++){
			console.log("restooooooooo");
			name[i]=ans[i].name;
			description[i]=ans[i].description;
			price[i]=ans[i].price;
			image[i]=ans[i].image;
			console.log(description[i]);
		}
	});

	recipes = client.db("chunk").collection("recipes");
	var rest = [];
	var add = [];
	var desc = [];
	var bg = [];
	var email = [];
	var phone = [];
	var location = [];
	recipes.find({ "name": req.query.resto }).toArray().then((ans) => {
		for(i=0;i<ans.length;i++){
			console.log("recipeeessssss");
			rest[i]=ans[i].name;
			add[i]=ans[i].address;
			desc[i]=ans[i].description;
			bg[i]=ans[i].bg;
			email[i]=ans[i].email;
			phone[i]=ans[i].phone;
			location[i]=ans[i].location;
			console.log(desc[i]);
		}
		return res.render('restaurant.ejs', {name:name,description:description,price:price,image:image,rest:rest,add:add,desc:desc,bg:bg,email:email,phone:phone,location:location});
	});
});	

router.post('/send-email', function (req, res) {
	let transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'chunk.helpline@gmail.com',
			pass: 'Chunk123!'
		}
	});
	let mailOptions = {
		from: req.body.email, // sender address
		to: "chunk.helpline@gmail.com",
		subject: req.body.subject, // Subject line
		text: req.body.message, // plain text body
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
			res.send({"Failed":"There was an error. Please try again later!"});
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		res.send({"Success":"Your message has been sent. Thank you!"});
		});
	});




module.exports = router;