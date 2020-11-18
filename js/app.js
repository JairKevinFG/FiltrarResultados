const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year')
const yearMax = new Date().getFullYear();
const yearMin = yearMax - 10;
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//llenar años
function llenarSelect(){
    for(let i= yearMax ; i >= yearMin ; i-- ){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion)
    }
}


const datosBusqueda = {
    marca: '',
    year: '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color :''
}

document.addEventListener('DOMContentLoaded',()=> {
    obtenerAutos();
    llenarSelect();
})
//event listener para los select de busqueda
marca.addEventListener('change', event => {
    datosBusqueda.marca = event.target.value
    filtrarAuto()
})
year.addEventListener('change', event => {
    datosBusqueda.year = parseInt(event.target.value)
    filtrarAuto()
})
minimo.addEventListener('change', event => {
    datosBusqueda.minimo = parseInt(event.target.value)
    filtrarAuto()
})

maximo.addEventListener('change', event => {
    datosBusqueda.maximo = parseInt(event.target.value)
    filtrarAuto()
})

puertas.addEventListener('change', event => {
    datosBusqueda.puertas = parseInt(event.target.value)
    filtrarAuto()
})
transmision.addEventListener('change', event => {
    datosBusqueda.transmision = event.target.value
    filtrarAuto()
})
color.addEventListener('change', event => {
    datosBusqueda.color = event.target.value
    filtrarAuto()
})

async function  filtrarAuto(){
    const url = './js/datos.json'
    const respuesta = await fetch(url)
    const autos = await respuesta.json()
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarColor).filter(filtrarTransmision)
    if(resultado.length){
        mostrarAutos(resultado)
    } else{
        noResultado()
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }else{
        return auto
    }
}


function filtrarColor(auto){
    const { color} = datosBusqueda;
    if(color){
        return auto.color === color
    }else{
        return auto
    }
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas
    }else{
        return auto
    }
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca
    }else{
        return auto
    }
}
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === year
    }else{
        return auto
    }
}
function filtrarMinimo (auto){
    const {minimo } = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo
    }else{
        return auto
    }
}
function filtrarMaximo (auto){
    const {maximo } = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo
    }else{
        return auto
    }
}



//mostrar los autos
async function obtenerAutos(){
    const url = './js/datos.json'
    const respuesta = await fetch(url)
    const autos = await respuesta.json()
    mostrarAutos(autos)
}
function mostrarAutos (autos){
    limpiarHTML();
    autos.forEach( auto => {
        const autoHTML = document.createElement('p');
        const {marca, modelo, year, puertas ,transmision , precio ,color} = auto;
        autoHTML.innerHTML = `
          <ul>
              <li>Marca : ${marca}</li>
              <li>Modelo : ${modelo} </li>
              <li> Año: ${year}  </li>
              <li>Precio : ${precio}  </li>
              <li> Puertas : ${puertas}  </li>
              <li> Transmisión: ${transmision} </li>
              <li> Color : ${color}</li>
           </ul>`
        resultado.appendChild(autoHTML)
    })
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}