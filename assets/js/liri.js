require("dotenv").config();

const fs = require("fs");

const keys = require("./keys.js");

const axios = require("axios");

const inquirer = requqire("inquirer");

const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const topic = process.argv[3];

// const spotifyUrl = https://api.spotify.com;

//axios.get("url") for ticket master, spotify, omdb



