console.log('Add')

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const hbsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(hbsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Mazin'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Mazin'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        message: 'Message',
        name: 'Mazin'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address;

    address ? 
        geocode(address, (error, {lat, long, location} = {}) =>{
            if(error) return res.send(error);
            
            forecast(lat, long, (error, forecastData)=>{
                if(error) return respond.send(error);
                
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address 
                }) 
            })
        })
        : 
        res.send({error: 'You must provide an address'})
    
})

app.get('/products', (req, res)=>{
    req.query.search ? res.send({products:[]}) : res.send({error: 'You must provide a search term'})
})  

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: '404',
        name:'Mazin',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name:'Mazin'
    })
})

app.listen(port , ()=>{
    console.log('Server is up on port port '+ port )
})