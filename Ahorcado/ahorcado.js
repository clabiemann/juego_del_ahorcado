var bienvenida = document.querySelector(".bienvenida");
var tituloBienvenida = document.querySelector(".titulo_bienvenida");
var botonComienzo = document.querySelector(".btn_comienzo");
var palabraIngresada = document.querySelector(".ingreso_palabra");
var txtPalabraIngresada = document.querySelector(".txt_ingreso_palabra");
var ingresoLetras = document.querySelector(".ingreso_letras");
var advertencia = document.querySelector(".advertencia");
var botonGuardar = document.querySelector(".btn_guardar");
var botonCancelar = document.querySelector(".btn_cancelar");
var botonNuevoJuego = document.querySelector(".btn_nuevo_juego");
var botonDesistir = document.querySelector(".btn_desistir");
var juego = document.querySelector(".juego");
var dibujos = document.querySelector(".canvas");
var lineas = dibujos.getContext("2d");
var letrasDibujadas = dibujos.getContext("2d");
var letras_palabra=[];
var letras_ingresadas=[];
var letras_incorrectas=[];
var letras_correctas=[];
var x=0;
var y=0;
var timeout;
var chance = 0;
var posicionLetrasIncorrectas = 0;



function mostrarPrimerPantalla(){
    palabraIngresada.classList.add("ocultar");
    bienvenida.classList.remove("ocultar");
    juego.classList.add("ocultar");
}

function mostrarSegundaPantalla(){
    bienvenida.classList.add("ocultar");
    palabraIngresada.classList.remove("ocultar");
    txtPalabraIngresada.focus();
}

function verificarPalabra(){
    var letras = txtPalabraIngresada.value;
    var cantidad_letras = letras.length;
    if (cantidad_letras > 8) {
        alert ("La palabra ingresada tiene mas de 8 caracteres");
        //limpiar el txt
        mostrarSegundaPantalla();
    } else{
        mostrarTercerPantalla();
    }
}

function mostrarTercerPantalla(){
    palabraIngresada.classList.add("ocultar");
    juego.classList.remove("ocultar");
    ingresoLetras.focus();
    armarArray();
    dibujarLineas();
    compararLetras();
}

function armarArray(){
    var letras = txtPalabraIngresada.value;
    var cantidad_letras = letras.length;
    for (var i=0; i < cantidad_letras; i++){
        var letra = letras.charAt(i); //Devuelve el carácter que hay en la posición indicada como índice
        letras_palabra[i] = letra.toUpperCase(i);
    }
}

function dibujarLineas(){
    var letras = txtPalabraIngresada.value.toUpperCase();
    var cantidad_letras = letras.length;
    for (var i = 1; i < cantidad_letras + 1; i++) {
        lineas.strokeRect((i*50),400,40,0);
    }
}
function compararLetras(){
    ingresoLetras.addEventListener("input", function(){
        //chequeo que sea una letra
        var regEx = /[A-ZÑa-zñ]/;
        if(ingresoLetras.value.match(regEx)){
            var nueva_letra = ingresoLetras.value.toUpperCase();
            // letra nueva, ya fue ingresada anteriormente?
            var repetido = false;
            if (letras_ingresadas.length != 0){
                for(posicion = 0; posicion < letras_ingresadas.length ; posicion++){
                    if(nueva_letra == letras_ingresadas[posicion]){
                        repetido = true;
                        alert (" La letra " + nueva_letra + " ya fue ingresada anteriormente ");
                        break;
                    }
                }
            }
            if (repetido == false){
                letras_ingresadas.push(nueva_letra);
            }
            // letra nueva, coincide con letras de la palabra?
            var letraExiste = false;
            for(i = 0; i < letras_palabra.length ; i++){
                if(nueva_letra == letras_palabra[i]){
                    // letra nueva coincide
                    letraExiste=true;
                    letras_correctas.push(nueva_letra);
                    letrasDibujadas.font="20px Georgia";
                    letrasDibujadas.fillStyle="black";
                    letrasDibujadas.fillText(nueva_letra, ((i*50)+60), 390);
                    retardar()
                }
            }
        
            if(letraExiste == false){
                // letra nueva no coincide    
                if (repetido == false){
                    chance++;
                }
                letras_incorrectas.push(nueva_letra);
                letrasDibujadas.font="20px Georgia";
                letrasDibujadas.fillStyle="black";
                letrasDibujadas.fillText(nueva_letra,(posicionLetrasIncorrectas*10), 18);
                posicionLetrasIncorrectas = posicionLetrasIncorrectas + 3;
                console.log(nueva_letra);
                console.log(posicionLetrasIncorrectas);
                dibujarOrca();
                retardar();
                
            }
            letras_ingresadas.push(nueva_letra);
        }else{
            alert("Ingresar sólo letras");
            retardar()
        }
    });
}
function retardar() {
    timeout = setTimeout(alertFunc, 1000);
    
}
function alertFunc() {
    ingresoLetras.value="";
    if (letras_palabra.length == letras_correctas.length){
        alert (" ¡ G A N A S T E ! ");
    }
    if (chance == 10){
        alert (" ¡ P E R D I S T E ! " );
    }
}

function dibujarOrca(){
    
    if (chance == 1){
        //base
        lineas.strokeRect(50,355,100,0);
    }
    if (chance == 2){
        //palo mayor
        lineas.strokeRect(100,25,0,330);
    }
    if (chance == 3){
        //extension
        lineas.strokeRect(100,25,250,0);
    }
    if (chance == 4){
        //cuerda
        lineas.strokeRect(350,25,0,30);
    }
    if (chance == 5){
        //cabeza
        lineas.beginPath();
        lineas.arc(350,85,30,0,Math.PI*2,true);
        lineas.stroke();
    }
    if (chance == 6){
        //cuerpo
        lineas.strokeRect(350,115,0,100);
    }
    if (chance == 7){
        //pierna derecha
        lineas.beginPath();
        lineas.moveTo(350,215);
	    lineas.lineTo(400,305);
        lineas.stroke();
    }
    if (chance == 8){
        //pierna izquierda
        lineas.beginPath();
        lineas.moveTo(350,215);
	    lineas.lineTo(300,305);
        lineas.stroke();
    }
    if (chance == 9){
        //brazo derecho
        lineas.beginPath();
        lineas.moveTo(350,145);
	    lineas.lineTo(400,235);
        lineas.stroke();
    }
    if (chance == 10){
        //brazo izquierdo
        lineas.beginPath();
        lineas.moveTo(350,145);
	    lineas.lineTo(300,235);
        lineas.stroke();
        
    }
}
function desistirJuego(){
    for(i = 0; i < letras_palabra.length ; i++){ 
        letrasDibujadas.font="20px Georgia";
        letrasDibujadas.fillStyle="black";
        letrasDibujadas.fillText(letras_palabra[i], ((i*50)+60), 390);
    }    
}
function resetear(){
    window.location.reload()
}

mostrarPrimerPantalla();
botonComienzo.onclick = mostrarSegundaPantalla;
botonCancelar.onclick = resetear;
botonGuardar.onclick = verificarPalabra;
botonNuevoJuego.onclick = resetear;
botonDesistir.onclick = desistirJuego;









