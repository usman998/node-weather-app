const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ef148f6c438909473349c73c6d6d977c/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    
    
    request ({ url : url, json: true}, (error, response)=>{
        if (error){
            callback('low level error', undefined)
        }
        else if (response.body.error){
            callback('coordinate error', undefined)
        }
        else {
            callback(undefined, response.body.daily.data[0].summary + ' it is currently ' + response.body.currently.temperature + ' and the chances of rain is ' + response.body.currently.precipProbability +' and the moon phase is ' + response.body.daily.data[0].moonPhase)
        }   
    })
}
module.exports = forecast

// const url = 'https://api.darksky.net/forecast/ef148f6c438909473349c73c6d6d977c/37.8267,-122.4233?units=si'

// request({ url: url, json: true }, (error, response) =>{
//     // console.log(response.body.daily.data[0].summary + ' it is currently ' + response.body.currently.temperature + ' and the chances of rain is ' + response.body.currently.precipProbability )
//     if(error) {
//         console.log('unable to connect to weather services')
//     }
//     else if(response.body.error){
//         console.log(response.body.error)
//     }
//     else{
//         console.log(response.body.daily.data[0].summary + ' it is currently ' + response.body.currently.temperature + ' and the chances of rain is ' + response.body.currently.precipProbability )
//     }
// })








