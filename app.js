// Clave de acceso a la API de OpenWeatherMap
const API_KEY = 'tu_api_key'
const button=document.querySelector('.button');
const input=document.querySelector('input')
const main=document.querySelector('main')

// Función asíncrona que recibe una ciudad y consulta la API
const fetchClima = async (ciudad) => {
    // Petición a la API con la ciudad, la key, unidades en celsius y respuesta en español
    const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`)
    const datos = await respuesta.json()
    
    // Si la API devuelve 404 la ciudad no existe, muestra error y detiene la función
    if(datos.cod==='404'){
        main.innerHTML=`<p>Ciudad no encontrada</p>`
        return
    }
    // Pinta los datos del clima en pantalla incluyendo ícono, temperatura y demas 
    // Ícono del clima generado con el código que devuelve la API <IMG>
    main.innerHTML= `<div class="tarjeta">
                        <div class="tarjeta-header">
                            <img src="https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png">   
                            <h2>Ciudad: ${datos.name}</h2>
                        </div>
                            <div class="tarjeta-datos">
                            <p>Temperatura ${datos.main.temp}°C</p>
                            <p>sensacion termina ${datos.main.feels_like}°C</p>
                            <p>humedad ${datos.main.humidity}%</p>
                            <p>descripcion: ${datos.weather[0].description}</p>
                            <p>velocidad del viento ${datos.wind.speed}Km/h</p>
                        </div>
                     </div>
    `
}
// Evento del botón, valida que el input no esté vacío antes de buscar
button.addEventListener('click', () => {
    if(input.value){
        fetchClima(input.value)
    }else{
        main.innerHTML= `<p>Por favor escribe una ciudad</p>`
    }
})
// Evento del teclado, busca cuando el usuario presiona Enter
input.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        if(input.value){
            fetchClima(input.value)
        } else {
            main.innerHTML = `<p>Por favor escribe una ciudad</p>`
        }
    }
})