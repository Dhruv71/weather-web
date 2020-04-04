const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port =process.env.PORT || 3000

// console.log(__dirname);
// console.log(__filename);
// Creating path address for express config

const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partial');
// seting up handelbar engine views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
// use static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
  res.render('index',{
        title: 'Weather App',
        name: 'Dhruv'
  })
})


app.get('/help', (req,res) => {
  res.render('help',{
      title: 'Help',
      describe: 'How can I help you ?',
      name: 'Dhruv'
  })
})
// app.get('/try', (req,res) => {
//   res.send('<h1>header</h1>')
// })
app.get('/about', (req,res) => {
  res.render('about',{
      title:' About',
      name: 'Dhruv'
  })
})


app.get('/weather', (req,res) => {
  if (!req.query.address) {
    return res.send({error:'Error! Please provide address for weather'})
  }
 const address = req.query.address;
 geocode(address,(error,{latitude,longitude,location}= {}) => {
     if (error) {
       return res.send({error:error})
     }
     forecast(latitude,longitude, (error,forecastData) => {
       if (error) {
         return res.send({error:error})
       }
       res.send({
         forecast: forecastData,
         address: address,
         //latitude: data.latitude,
         //longitude: data.longitude,
         location
       })
     })

 })

})

app.get('/help/*', (req,res) =>{
  res.render('404error',{
    errmsg: 'help article not found!!!',
    name: 'Dhruv'
  })
})

app.get('/about/*', (req,res) =>{
  res.render('404error',{
    errmsg: 'no about article found!!!',
    name: 'Dhruv'
  })
})



app.get('*', (req,res) =>{
  res.render('404error',{
    errmsg: 'Page not Found!!!',
    name: 'Dhruv'
  })
})

app.listen(port, () => {
  console.log('web is port on ' + port);
})
