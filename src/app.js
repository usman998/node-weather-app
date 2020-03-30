const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// paths defined below for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '/template/views')
const partialsDirectory = path.join(__dirname, '/template/partials')
 
const app = express()
const port = process.env.PORT || 3000
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

//setup static directory
app.use(express.static(publicDirectory))

// app.get('', (req, res)=> {
//     res.send('<h1>hello there</h1>')
// })
// HELLO THERE WONT BE DISPLAYED ON THE SERVER THE EXPRESS HAS TOKEN OVER IT

// express identifies the object and displays it as json parsed files
app.get('', (req, res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'usman'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        name:'usman',
        title:'about me'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        message:"details available",
        title:'for querries',
        name:'usman'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    } 
    geocode(req.query.address,(error , {latitude, longitude, placename} = {})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, ( error, forecastata) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecaste: forecastata,
                placename,
                address: req.query.address
            })
            
    })
})
})    




    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'quetta',
    //     address: req.query.address
    // })

app.get('/product', (req, res)=> {
    if(!req.query.search){
        return res.send(
            '<h1>you must provide a search term</h1>'
        )
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})




app.get('/help/*', (req, res)=>{
    res.render('error', {
        message:'help article not found',
        name:'usman'
    })
})
app.get('*', (req, res)=>{
    res.render('error', {
        message:'no such page found',
        name:'usman'
    })
})

app.listen(port, () =>{
    console.log('server is up on port ' + port)
})
