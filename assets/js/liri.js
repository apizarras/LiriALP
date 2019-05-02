require("dotenv").config();

const fs = require("fs");

const keys = require("./keys.js");

const axios = require("axios");

const inquirer = require("inquirer");

const moment = require("moment");

// const spotify = new Spotify(keys.spotify);

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
        console.log("selected concerts");
        // const tmKey = process.env.Consumer_Key;
        // const tmSecret = process.env.Consumer_Secret;
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
                    console.log(keys.ticketmaster);
                    axios
                        .get("https://app.ticketmaster.com/discovery/v2/events.json?apikey="+"key goes here").then(function (response) {
                        console.log(response);
                })
        .catch(function(err) {
            console.log("This err is from the getEventData function");
        });
            console.log("line after get function")
                    }
                })
                .catch(function(err) {
                    console.log("Please check your spelling and try again.");
                })
        };
    });

function getEventData() {
    axios
        .get("https://app.ticketmaster.com/discovery/v2/events.json?apikey="+ticketmaster.Consumer_Key).then(function (response) {
            console.log(response);
            // for (i = 0; i < 5; i++) {
            //     console.log("Concert Venue: " + response.data[i].venue.name);
            //     console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country)
            //     console.log("Date: " + moment(response.data[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a") + "\n");
            // }
        })
        .catch(function(err) {
            console.log("This err is from the getEventData function");
        });
    };


    



