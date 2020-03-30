console.log('client side')




fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log('error')
//         }
//         else{
//             console.log(data.placename)
//             console.log(data.address)
//             console.log(data.forecaste)
//         }
//     })
// })
const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = 'loading'
    messageTwo.textContent = ''
    const location = search.value
    fetch('/weather?address=' + encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = "ENTER VALID COUNTRY"
            // messageTwo.textContent = "ENTER AGAIN"
        }
        else{
            messageOne.textContent = data.placename
            messageTwo.textContent = data.forecaste
            // console.log(data.placename)
            // console.log(data.address)
            // console.log(data.forecaste)
        }
    })
})
})





