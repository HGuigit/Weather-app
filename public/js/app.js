
const weatherForm  = document.querySelector('form');

const inputSearch = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
   
    const location = inputSearch.value
    messageOne.textContent = 'Loading...'
    
    fetch(`http://localhost:3000/weather?adress=${location}`).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent='';
            messageTwo.textContent=data.error
        }else{
            messageOne.innerHTML = `Local:  ${data.Local}<br>Tempo:  ${data.Data.weather_description}<br>Temperatura:  ${data.Data.temperature}Cº<br>Sensação térmica:  ${data.Data.feelslike}Cº`
            messageTwo.textContent=''
        }
        })
})


})