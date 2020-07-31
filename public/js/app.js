
const weatherForm  = document.querySelector('form');

const inputSearch = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
   
    const location = inputSearch.value
    messageOne.textContent = 'Loading...'
    
    fetch(`/weather?adress=${location}`).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent='';
            messageTwo.textContent=data.error
        }else{
            messageOne.innerHTML = `Local:  ${data.Local}<br>Tempo:  ${data.Data.weather_description}<br>Temperatura:  ${data.Data.temperature}Cº<br>Sensação térmica:  ${data.Data.feelslike}Cº<br>Chance de chuva:  ${data.Data.precip}<br>Umidade do Ar:  ${data.Data.humidity}<br>Velocidade do Vento:  ${data.Data.wind_speed}<br>Hora Local:  ${data.Data.time}`
            messageTwo.textContent=''
        }
        })
})


})