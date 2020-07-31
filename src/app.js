const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

//Defining paths for express configutarions
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partalsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partalsPath);

//setup static html directory to serve and css
app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Guilherme',
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Guilherme de Souza',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Some help',
        message: 'Do you need some help?',
        help: 'This is your help',
    })
})


app.get('/weather',(req, res) => {
    if(req.query.adress){
            geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
                if(error){
                    res.send({Error: error,});
                }else{
            
            
                forecast(latitude, longitude, (error, forecastdata) => {
                    if(error){
                        res.send({Error: error,});
                    }else{
                    res.send({
                        Local : location,
                        Data: forecastdata,
                    })
                    }
                  })
                }
            
            })    
            }else{
                res.send({error: 'No adress set!'});
            }
        })
    

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: [],
    })
})

app.get('/help/*', (req,res) => {
    res.render('404res', {
        error: 'Help article not found!',
        title: 'Help page'
    })
})


app.get('*', (req,res) => {
    res.render('404res', {
        error: 'Page not found!',
        title: '404',
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});