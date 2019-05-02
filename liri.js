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
                    getEventData();
                    console.log("line after get function")
            }
        })
            .catch(function(err) {
                console.log("This err is from the catch after response.event");
            });
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
                .then(function(response) {
                    if(response.event==="") {
                        const trackName = "All You Need Is Love"
                        console.log(trackName);
                    } else {
                        const trackName = response.trackName;
                        console.log("spotify song data " + trackName);
                        getSongData();
                        console.log("line after get function")
                }
            })
            .catch(function(err) {
                console.log("This err is from the catch after response.event");
            });
        }
    });

function getEventData() {
    console.log("getEventData function started");
    console.log(TICKETMASTER_KEY);
    axios
        .get("https://app.ticketmaster.com/discovery/v2/events.json?keyword="+event+"&apikey="+TICKETMASTER_KEY).then(response=> {
            console.log(response.data);
        })
        .catch(err => {
            console.log("This err is from the getEventData function"+err.response);
        });
    };

    function getSongData() {
        spotify
        .search({ type: 'track', query: trackName })
        .then(function (response) {
            console.log('Title: ' + response.tracks.items[0].name);
            console.log('Artist: ' + response.tracks.items[0].artists[0].name);
            console.log('From the album: ' + response.tracks.items[0].album.name);
            console.log('Open in browser: ' + response.tracks.items[0].external_urls.spotify)
        })
        .catch(function (err) {
            console.log("Please check your spelling and try again.");
        });
    }


    



