function cargarCalculadora() {
    let mercadoPotencial = 0;
    let mercadoDisponible = 0;
    let mercadoEfectivo = 0;
    let consumidoresActualesGlobal=0
    let metodosMercadoDisponibleGlobal=0
    let metodosMercadoEfectivoGlobal=0

    let botonMercadoPotencial = document.getElementById('boton-mercado-potencial');
    botonMercadoPotencial.addEventListener('click', calcularMercadoPotencial);
    let botonPorcentajeMercadoDisponible=document.getElementById('metodo-porcentaje-mercado-disponible');
    let botonEncuestaMercadoDisponible=document.getElementById('metodo-encuesta-mercado-disponible');
    let botonPorcentajeMercadoEfectivo=document.getElementById('metodo-porcentaje-mercado-efectivo');
    let botonEncuestaMercadoEfectivo=document.getElementById('metodo-encuesta-mercado-efectivo');
    
    botonEncuestaMercadoDisponible.addEventListener('click',function() {metodoMercadoDisponible('mercado-disponible-encuesta') });
    botonPorcentajeMercadoDisponible.addEventListener('click', function(){ metodoMercadoDisponible('mercado-disponible-porcentaje')});
    botonEncuestaMercadoEfectivo.addEventListener('click',function() {metodoMercadoEfectivo('mercado-efectivo-encuesta') });
    botonPorcentajeMercadoEfectivo.addEventListener('click', function(){ metodoMercadoEfectivo('mercado-efectivo-porcentaje')});
    
    let sectionPorcentajeMercadoDisponible=document.getElementById('mercado-disponible-porcentaje');
    sectionPorcentajeMercadoDisponible.style.display="none"
    let sectionEncuestaMercadoDisponible=document.getElementById('mercado-disponible-encuesta');       
    sectionEncuestaMercadoDisponible.style.display="none"
    let sectionPorcentajeMercadoEfectivo=document.getElementById('mercado-efectivo-porcentaje');
    sectionPorcentajeMercadoEfectivo.style.display="none"
    let sectionEncuestaMercadoEfectivo=document.getElementById('mercado-efectivo-encuesta');       
    sectionEncuestaMercadoEfectivo.style.display="none"

    let botonMercadoDisponible=document.getElementById('boton-mercado-disponible');
    botonMercadoDisponible.addEventListener('click',calcularMercadoDisponible);
    let botonMercadoEfectivo=document.getElementById('boton-mercado-efectivo');
    botonMercadoEfectivo.addEventListener('click', calcularMercadoEfectivo);
    let botonMercadoObjetivo=document.getElementById('boton-mercado-objetivo');
    botonMercadoObjetivo.addEventListener('click',calcularMercadoObjetivo);
function calcularMercadoPotencial() {

    const poblacion = parseFloat(document.getElementById('lugar').value);
    const sexo = parseFloat(document.getElementById('sexo').value) / 100;
    const edad = parseFloat(document.getElementById('edad').value) / 100;
    const nse = parseFloat(document.getElementById('nse').value) / 100;

    mercadoPotencial = Math.round(poblacion * sexo * edad * nse);
    document.getElementById('resultadoMercadoPotencial').innerHTML =
        `Mercado Potencial: ${mercadoPotencial.toLocaleString()} personas`;
}

function metodoMercadoDisponible(metodoIdMercadoDisponible) {
    metodosMercadoDisponibleGlobal=metodoIdMercadoDisponible
    
    document.getElementById(metodoIdMercadoDisponible).style.display = "block";
        // Ocultar la otra sección
    if (metodoIdMercadoDisponible === 'mercado-disponible-porcentaje') {
        sectionEncuestaMercadoDisponible.style.display = "none";

    } else {
        sectionPorcentajeMercadoDisponible.style.display = "none";
    }
}

function calcularMercadoDisponible(){
    if (mercadoPotencial===0){
        alert("por favor calcule primero el mercado potencial");
       return;
    }

    if (metodosMercadoDisponibleGlobal === 'mercado-disponible-porcentaje') {
        const consumidores=parseFloat(document.getElementById('consumidores').value)/100;
        mercadoDisponible=Math.round(mercadoPotencial* consumidores);
        document.getElementById('resultadoMercadoDisponible').innerHTML=
        `Mercado Disponible: ${mercadoDisponible.toLocaleString()} personas`;
        
    } else {
        
        const encuestados=parseFloat(document.getElementById("total-encuestados").value);
        const consumidoresactuales=parseFloat(document.getElementById("total-consumidores").value);
        consumidoresActualesGlobal = consumidoresactuales; 
        mercadoDisponible=Math.round(mercadoPotencial*(consumidoresactuales/encuestados));
        document.getElementById('resultadoMercadoDisponible').innerHTML=
        `Mercado Disponible: ${mercadoDisponible.toLocaleString()} personas`;

    }
    
   
}

function metodoMercadoEfectivo(metodoIdMercadoEfectivo) {
    metodosMercadoEfectivoGlobal=metodoIdMercadoEfectivo
    
    document.getElementById(metodoIdMercadoEfectivo).style.display = "block";
        // Ocultar la otra sección
    if (metodoIdMercadoEfectivo === 'mercado-efectivo-porcentaje') {
        sectionEncuestaMercadoEfectivo.style.display = "none";

    } else {
        sectionPorcentajeMercadoEfectivo.style.display = "none";
    }
}


function calcularMercadoEfectivo(){
    if (mercadoDisponible===0){
        alert("por favor calcule primero el mercado Disponible");
       return;
    }
    if (metodosMercadoEfectivoGlobal === 'mercado-efectivo-porcentaje') {
        
        const interesados=parseFloat(document.getElementById('interesados-comprar-producto').value)/100;
        mercadoEfectivo=Math.round(mercadoDisponible* interesados);
        document.getElementById('resultadoMercadoEfectivo').innerHTML=
        `Mercado Efectivo: ${mercadoEfectivo.toLocaleString()} personas`;

    } else {

        const futurosCompradores=parseFloat(document.getElementById('total-futuros-compradores').value);
        mercadoEfectivo=Math.round(mercadoDisponible*(futurosCompradores/consumidoresActualesGlobal));
        document.getElementById('resultadoMercadoEfectivo').innerHTML=
        `Mercado Efectivo: ${mercadoEfectivo.toLocaleString()} personas`;
    }
    
   
}

function calcularMercadoObjetivo(){
    if (mercadoEfectivo===0){
        alert("por favor calcule primero el mercado Efectivo");
       return;
    }
    
    const cuotaMercado=parseFloat(document.getElementById('clientes-potenciales').value)/100;
    const mercadoObjetivo=Math.round(mercadoEfectivo* cuotaMercado);
    document.getElementById('resultadoMercadoObjetivo').innerHTML=
    `Mercado Objetivo: ${mercadoObjetivo.toLocaleString()} personas`;
}
}
window.addEventListener("load",cargarCalculadora);
