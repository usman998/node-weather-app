const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidXNtYW45OCIsImEiOiJjazhheWh3b2UwNnN5M2x0cTRyeTNiOW10In0.TSLCPFfAyDLxWf-uylq9rg'
    request({url : url, json : true}, (error, response)=>{
        if(error){
            callback('network issue', undefined)
        }
        else if(response.body.features.length === 0) {
            callback('invalid country search again', undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                placename: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode