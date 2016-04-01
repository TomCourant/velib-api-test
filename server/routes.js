var express = require('express'),
	bodyParser = require('body-parser'),
	router = express.Router(),
	request = require('request')
	config = require('./config');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// =====================================
// HOME ===============================
// =====================================

router.get('/', function (req, res) {
	console.log('Home API server route');

    request({
        url: config.apiUrl,
        qs: {
        	contract: 'Paris',
        	apiKey: config.apiKey
        },
        json: true,
        timeout: 10000
    }, function (error, response, body) {
        if (error) throw error;
        res.json(body);
    });
});

router.get('/radius/:radius/:lat/:lng', function (req, res) {
    console.log('Home API server route');

    var radius = req.params.radius,
        place = {lat: req.params.lat, lng: req.params.lng};

    request({
        url: config.apiUrl,
        qs: {
            contract: 'Paris',
            apiKey: config.apiKey
        },
        json: true,
        timeout: 10000
    }, function (error, response, body) {
        if (error) throw error;
        var allStations = [];
        body.forEach(function (v,i) {
            var station = v.position;
            var distance = calculate(place, station);
            if (distance < radius) allStations.push(v)
        });
        res.json(allStations);
    });

    function toRadians (degrees) {
      return degrees * Math.PI / 180;
    };

    function calculate(coordPlace, coordVelib) {
        var dist;

        var R = 6371; // km
        var dLat = toRadians(coordVelib.lat - coordPlace.lat);
        var dLon = toRadians(coordVelib.lng - coordPlace.lng);
        var lat1 = toRadians(coordVelib.lat);
        var lat2 = toRadians(coordPlace.lat);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        dist = R * c;

        return dist;
    }





});

module.exports = router;



// Constructeur de Vecteurs en 3D
function Vct(x,y,z){this.x=x; this.y=y; this.z=z}
// Fonctions de clonage, multiplication par un scalaire, addition d'un ou plusieurs vecteurs
// produit scalaire, vectoriel, norme et facilité d'affichage.
with({o:Vct.prototype}){
    o.cln=function(){return new Vct(this.x,this.y,this.z)}
    o.mlt=function(k){return new Vct(k*this.x,k*this.y,k*this.z)}
    o.add=function(){var a=arguments,x=this.x,y=this.y,z=this.z,r;
       for (i=0; i<a.length; i++) {x+= a[i].x; y+= a[i].y,z+= a[i].z}
        return new Vct(x,y,z)}
    o.scl=function(v){return this.x*v.x + this.y*v.y + this.z*v.z}
    o.prd=function(v){return new Vct(this.y*v.z-v.y*this.z,this.z*v.x-v.z*this.x,this.x*v.y-v.x*this.y)}
    o.nrm=function(){var t=Math.sqrt(this.scl(this));return new Vct(this.x/t,this.y/t,this.z/t)}
    o.toString=function(){return JSON.stringify(this)}
}
// Coordonnées d'un point défini par latitude et longitudes en degré décimaux
function pllToVct(pt){
    var lt=pt.lat*Math.PI/180,ln=pt.lng*Math.PI/180;
    return new Vct(Math.cos(lt)*Math.cos(ln),Math.cos(lt)*Math.sin(ln),Math.sin(lt))}
 
// Distance entre deux points par leurs latitude et longitude {lat:value,lng:value}
function dist(a,b){
    return Math.acos(pllToVct(a).scl(pllToVct(b)))*20000/Math.PI;
}
// Coordonnées (approximatives car lues sur Google Maps)
var Paris={lat:48.8645278209514,lng:2.416170724425901}
var New_York={lat:48.87242006305313,lng:2.348395236282807}
 
console.log (dist(Paris,New_York));// =>5831 km








function toRadians (degrees) {
  return degrees * Math.PI / 180;
};

function calculate(coordPlace, coordVelib) {
        var distance;

        var R = 6371; // km
        var dLat = toRadians(coordVelib.lat - coordPlace.lat);
        var dLon = toRadians(coordVelib.lng - coordPlace.lng);
        var lat1 = toRadians(coordVelib.lat);
        var lat2 = toRadians(coordPlace.lat);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        distance = R * c;

        return distance;
    }

console.log(calculate(Paris,New_York));
 
