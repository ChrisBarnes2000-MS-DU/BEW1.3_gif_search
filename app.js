// Require Libraries
const express = require('express');
const fetch = require('node-fetch');
const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": process.env.APIKEY, // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express();

// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Routes
app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    // Tenor.Search.Query(term, "10")
    //     .then(response => {
    //         // store the gifs we get back from the search
    //         const gifs = response;
    //         // pass the gifs as an object into the home page
    //         res.render('home', { gifs })
    //     }).catch(console.error);
    get_json(res)
})

async function get_json(res) {
    try {
        const response = await fetch(`https://api.tenor.com/v1/search?q=${term}&key=${process.env.APIKEY}&limit=8`)
        const r = await response.json()
        let gifs = []
        for (let i = 0; i < r.results.length; i++) {
            gifs.push(r.results[i])
        }
        res.render('home', { gifs })
    } catch (error) {
        console.log(error)
    }
}

app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name;
    // render the greetings view, passing along the name
    res.render('greetings', { name });
})

// Start Server

app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});