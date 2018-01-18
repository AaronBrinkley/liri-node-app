require("dotenv").config();


var nodeArgs = process.argv;

var keys = require('./keys.js');

var processThree = process.argv[3]

var processTwo = process.argv[2]

var Spotify = require('node-spotify-api');
 

var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var songVar

var queryUrl

var movieName

var songName

var queryName


function requestMovie() {

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    queryName = queryName + "+" + nodeArgs[i];

  }

  else {

    queryName = nodeArgs[i];

  }
}

if (processThree == "") {
	
	queryName = "Mr.Nobody"
	
}

queryUrl = "http://www.omdbapi.com/?t=" + queryName + "&y=&plot=short&apikey=trilogy";

var requestWeb = require("request") 

requestWeb(queryUrl, function (error, response, body){
	if (!error && response.statusCode === 200) {
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
		//console.log("hello")
		
	} else {
		console.log(error)
		return
	}

})	

}


function requestTweets() {

var params = {screen_name: 'Week10Alias'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

  	for (var e = 0; e <= 20; e++) {
  		var tweetText = tweets[e].text
  		var tweetDate = tweets[e].created_at
  		console.log(tweetText)
  		console.log(tweetDate)
  		console.log("--")
  	}

  	//let outputTweets = JSON.stringify(tweets[0], null, 4);

   // console.log(outputTweets);
  }
})
}



function requestSpotify() {


for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    queryName = queryName + "+" + nodeArgs[i];

  }

  else {

    queryName = nodeArgs[i];

  }
}


 
if (processThree == "") {

	queryName = "The+Sign"

} 

	spotify.search({ type: 'track', query: queryName }, function(err, data) {
if (err) {
    return console.log('Error occurred: ' + err);
  }
 
//console.log(data.tracks);
//console.log(data.tracks); 
//console.log(data.tracks);

let outputArtName = JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 4);

let outputAlbName = JSON.stringify(data.tracks.items[0].album.name, null, 4);

let outputPrev = JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 4);

//let outputArtName = JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 4);

//let outputArtName = JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 4);

console.log("Artist: " + outputArtName)
console.log("Album: " + outputAlbName)
console.log("Song: " + processThree)
console.log("Preview Link: " + outputPrev)
//console.log("Artist: "outputArtName)
});

}

function getText() {

	
var fs = require("fs");


fs.readFile("random.txt", "utf8", function(error, data) {

  
  if (error) {
    return console.log(error);
  }

  
  var dataArr = data.split(",");


  var processTwo = dataArr[0]

  //var processThree = dataArr[1]
  console.log(processTwo)

  //requestSpotify()


});


}

if (processTwo == "my-tweets") {
		

 requestTweets()


} 

if (processTwo == "spotify-this-song") {

		requestSpotify()	

}

if (processTwo == "movie-this") {

	requestMovie()
	
} 

//else {

	//requestMovie()
	
//}

if (processTwo == "do-what-it-says") {

	getText()

} 