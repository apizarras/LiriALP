inquirer
    .prompt([

        {
            type: 'list',
            message: 'Choose an search engine!',
            choices: ['spotify', 'movie-search', 'concert-search', 'do-what-it-says'],
            name: 'searchEngine'

        }
    ])

    .then(function (inquirerResponse) {
        if (inquirerResponse.searchEngine === 'spotify') {
            inquirer
                .prompt([

                    {
                        type: 'input',
                        message: 'Enter a song name',
                        name: 'name'
                    }
                ])
            
                .then(function (response) {
                    if (response.name == '') {
                        var trackName = 'All Too Well'
                    } else {
                        var trackName = response.name;
                    }
                    
                    spotify
                        .search({ type: 'track', query: trackName })
                        .then(function (response) {
                            console.log('Title: ' + response.tracks.items[0].name);
                            console.log('Artist: ' + response.tracks.items[0].artists[0].name);
                            console.log('From the album: ' + response.tracks.items[0].album.name);
                            console.log('Open in browser: ' + response.tracks.items[0].external_urls.spotify)
                        })
                        .catch(function (err) {
                            console.log("Perhaps you have mispelled your query. Please try again.");
                        });
                });
        }