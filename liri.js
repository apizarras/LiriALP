require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var ticketmaster = require("ticketmaster");

inquirer
    .prompt([

        {
            type: "list",
            message: "What would you like to search for today?",
            choices: ["search-concerts", "search-songs", "search-movies", "feeling-lucky"],
            name: "searchType"

        }
    ])

    .then(function (search) {
        if (search.searchType === "search-songs") {
            inquirer
                .prompt([

                    {
                        type: "input",
                        message: "Enter a song name",
                        name: "name"
                    }
                ])
                .then(function (response) {
                    if (response.name == ""
                    ) {
                        var trackName = "Closer";
                        console.log("You did not enter a song, so we chose to search for: "+trackName);
                    } else {
                        var trackName = response.name;
                    }
                    
                    spotify
                        .search({ type: "track", query: trackName })
                        .then(function (response) {
                            console.log("Title: "+response.tracks.items[0].name);
                            console.log("Artist: "+response.tracks.items[0].artists[0].name);
                            console.log("From the album: "+response.tracks.items[0].album.name);
                            console.log("Open in browser: "+response.tracks.items[0].external_urls.spotify)
                        })
                        .catch(function (err) {
                            console.log("What you entered is not recognized. Please try again and check your spelling.");
                        });
                });
        }
    

        if (search.searchType === "search-movies"
        ) {
            inquirer
                .prompt([

                    {
                        type: "input",
                        message: "Enter a movie name",
                        name: "name"
                    }
                ])
                .then(function (response) {
                    if (response.name == ""
                    ) {
                        var movieName = "Titanic";
                        console.log("You didn't enter a movie name, so we chose: "+movieName);
                    } else {
                        var movieName = response.name;
                    }
                    axios
                        .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+keys.omdb.id)
                        .then(function (response) {
                            console.log("Title: " + response.data.Title);
                            console.log("Release Year: " + response.data.Year);
                            console.log("IMDB Rating: " + response.data.imdbRating);
                            console.log("Country: " + response.data.Country);
                            console.log("Language: " + response.data.Language);
                            console.log("Plot Summary: " + response.data.Plot);
                            console.log("Cast: " + response.data.Actors)
                        })
                        .catch(function (err) {
                            console.log("What you entered is not recognized. Please try again and check your spelling.");
                        });
                })
        }
        
        if (search.searchType === "search-concerts"
        ) {
            inquirer
                .prompt([

                    {
                        type: "input",
                        message: "Enter a band/artist name",
                        name: "name"
                    }
                ])
                .then(function (response) {

                    if (response.name == ""
                    ) {
                        var artist = "Pink"
                        console.log("You didn't enter anything, so we searched for: "+artist+"\n");
                    } else {
                        var artist = response.name;
                        console.log("Upcoming shows for "+ artist + "\n");
                    }
                    axios
                        .get("https://app.ticketmaster.com/discovery/v2/events.json?&keyword="+artist+"&apikey="+keys.ticketmaster.id)
                        .then(function(result) {

                            console.log(result.data);
                        })

                    // axios
                    //     .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
                    //     .then(function (response) {
                    //         for (i = 0; i < 5; i++) {
                    //             console.log("Concert Venue: " + response.data[i].venue.name);
                    //             console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country)
                    //             console.log("Date: " + moment(response.data[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a") + "\n");
                    //         }
                    //     })
                        .catch(function (err) {
                            console.log("What you entered is not recognized. Please try again and check your spelling.");
                        });
                })
        }
        
        if (search.searchType === "do-what-it-says"
        ) {
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "confirm",
                        message: "Are you sure?",
                        default: true,
                    }
                ])
                .then(function (response) {
                    if (response) {
                        fs.readFile("random.txt", "utf8", function (error, data) {
                            if (error) {
                                return console.log(error);
                            }
                            else {
                                trackName = data;

                                axios
                                    .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=e189c826")
                                    .then(function (response) {
                                        console.log("Title: " + response.data.Title);
                                        console.log("Release Year: " + response.data.Year);
                                        console.log("IMDB Rating: " + response.data.imdbRating);
                                        console.log("Country: " + response.data.Country);
                                        console.log("Language: " + response.data.Language);
                                        console.log("Plot Summary: " + response.data.Plot);
                                        console.log("Cast: " + response.data.Actors)
                                    })
                            }
                          
                        })
                    }
                })
        }
    })