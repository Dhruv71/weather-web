console.log('client side javascript is loded');


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherform.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading...'
  fetch('/weather?address= '+ search.value +' ').then( (response) =>{
    response.json().then( data =>{
         if(data.error)
         {
           messageOne.textContent = data.error;
           messageTwo.textContent = '';
          // console.log('error found :    ' + data.error );
         }
         else {
           messageOne.textContent = data.location;
           messageTwo.textContent = data.forecast;
           //console.log(data);
         }
    } )
  })

})
