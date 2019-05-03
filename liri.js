require("dotenv").config();

const fs = require("fs");

const keys = require("./keys.js");

const axios = require("axios");
const axiosDebug = require('axios-debug')(axios);

const inquirer = require("inquirer");

const moment = require("moment");

const ticketmaster = require("ticketmaster");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

//inquirer to ask the user to select a command
//inquirer to ask the user to select option(artist, song, movie, etc.)
//use if statement

//axios.get("url") for ticket master, spotify, omdb

inquirer
    .prompt([
    {
        type: "list",
        name: "searchType",
        message: "What would you like to search for?",
        choices: ["search-concerts", "search-songs", "search-movies", "feeling-lucky"]
    }
])
    .then(function(search) {
     if(search.searchType==="search-concerts") {
        console.log("user selected concerts");
        inquirer
            .prompt([
            {
                type: "input",
                name: "event",
                message: "What artist or band are you searching for?"
            }
        ])
            .then(function(response) {
                if(response.event==="") {
                    const event = "Houston Symphony"
                    console.log(event);
                } else {
                    const event = response.event;
                    console.log("upcoming shows for " + event);
                    axios
                        .get("https://app.ticketmaster.com/discovery/v2/classifications.json?keyword="+event+"&apikey="+keys.ticketmaster.id)
                        .then(response2=> {
                            console.log(response2);
                        })
                        .catch(err => {
                            console.log("This err is from the getEventData function"+err);
                        });
                    console.log("line after get function")
            }
        })
            .catch(function(err) {
                console.log("This err is from the catch after response.event");
            });
        };
        if(search.searchType==="search-movies"){
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "movie",
                        message: "What movie would you like to look up?"
                    }
                ])
                .then(function(response3){
                    if(response3.event==="") {
                        const movie = "The Matrix"
                        console.log(movie);
                    } else {
                        const movie = response3.movie;
                        console.log("omdb movie data " + movie);
                            axios
                                .get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey="+keys.omdb.id)
                                .then(function(response4) {
                                    console.log(response4.data);
                                    console.log("Title: " + response4.data.Title)
                                })
                            }
                })
                .catch(function(err) {
                    console.log("This err is from the catch"+error);
                })
        };
        if(search.searchType==="search-songs") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "trackName",
                        message: "What is the song title you would like to search?"
                    }
                ])
                .then(function(response5) {
                    if(response5.event==="") {
                        const trackName = "All You Need Is Love"
                        console.log("default when nothing entered: "+trackName);
                    } else {
                        const trackName = response5.trackName;
                        console.log("spotify song data " + trackName);
                    
                        spotify
                        .search({ type: 'track', query: trackName })
                        .then(function (response6) {
                            console.log('Title: ' + response6.tracks.items[0].name);
                            console.log('Artist: ' + response6.tracks.items[0].artists[0].name);
                            console.log('From the album: ' + response6.tracks.items[0].album.name);
                            console.log('Open in browser: ' + response6.tracks.items[0].external_urls.spotify)
                        })
                        .catch(function (err) {
                            console.log("Please check your spelling and try again.");
                        });
                        console.log("line after get function")
                }
            })
            .catch(function(err) {
                console.log("This err is from the catch after response.event");
            });
        }
    });



    



