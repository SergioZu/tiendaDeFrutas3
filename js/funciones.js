//Base de datos del ejercicio Fruteria
var precioFruta = new Array(0.80, 1.20, 2, 3.60, 1.10, 3.40, 6, 0.90, 1.60, 2.10);
var proximidadFruta = new Array(true, true, false, true, false, false, true, false, true, false);
var regionFruta = new Array("Canarias", "Leon", "Zamora", "Avila", "Caceres", "Barcelona", "Madrid", "Galicia", "Valencia", "Albacete");
var conservaFruta = new Array(false, true, true, true, true, false, true, false, false, true);
var nombrefruta = new Array("Platano", "Manzana", "Pera", "Sandia", "Melon", "Kiwi", "Naranja", "Pomelo", "Melocoton", "Cereza");


var almacenObjeto=new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var cantidadFruta = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var precioTotal = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

//Clases requeridas para la fruta, la cantidad y el precio;
class Fruta{
    constructor(nombre,precio){
        this.nombre=nombre;
        this.precio=precio;
        this.cantidad=0;
    }
}

class FrutaVerano extends Fruta{
    constructor(nombre,precio,proximidad,region){
           super(nombre,precio);
           this.proximidad=proximidad;
           this.region=region;
    }
}

class FrutaInvierno extends Fruta{
    constructor(nombre,precio,conserva){
        super(nombre,precio);
        this.conserva=conserva;
 }
}



//variables auxiliares
var inputs=document.getElementsByTagName("input");

var total = 0;
var aux=0;
var divEscribir;
var divLateral;
var colores;


//Ejercicio

function almacen(num) {
    for (var i = 0; i < 10; i++) {
        if (i == num) {
            if(almacenObjeto[i]==0 && i%2==0){
                let frutaV=new FrutaVerano();
                frutaV.nombre=nombrefruta[i];
                frutaV.precio=precioFruta[i];
                frutaV.proximidad=proximidadFruta[i];
                frutaV.region=regionFruta[i];
                almacenObjeto[i]=frutaV;

            }else if(almacenObjeto[i]==0 && i%2!=0){
                let frutaI=new FrutaInvierno();
                frutaI.nombre=nombrefruta[i];
                frutaI.precio=precioFruta[i];
                almacenObjeto[i]=frutaI;

            }
            cantidad(num);
            precioTotal[i] = almacenObjeto[i].cantidad * almacenObjeto[i].precio;
        }
    }

}

function cantidad(num){
    if(inputs[num].value==""){
        alert("No has introducido un numero")
    }else{
        almacenObjeto[num].cantidad+=Number(inputs[num].value);
        lateral(num, almacenObjeto[num].nombre);
        inputs[num].value="";
    }
    
}

function lateral(num,nombre){
    divLateral=document.getElementById("lateral");
    divLateral.innerHTML += "<p class='fruta' name='"+almacenObjeto[num].nombre+"'> Nombre: " + almacenObjeto[num].nombre + " ---  Kilos"+ " --- "+almacenObjeto[num].cantidad+"</p>";
    colores=document.getElementsByClassName('fruta');
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";

   for (let index = 0; index < colores.length; index++) {
       if(colores[index].getAttribute("name")==nombre){
        colores[index].style.backgroundColor =bgColor;
       }
       if(colores[index].getAttribute("name")!=nombre){
        colores[index].removeAttribute("style");
       }
       
   }
}



function enviar() {
    divEscribir = document.getElementById("final");
    divEscribir.innerHTML = "";
    divEscribir.innerHTML +=new Date()
    for (var i = 0; i < 10; i++) {
        if (almacenObjeto[i] != 0) {
            divEscribir.innerHTML += "<p>" + almacenObjeto[i].nombre + " --- " + almacenObjeto[i].cantidad + " Kilo"+ " --- "+almacenObjeto[i].precio.toFixed(2)+ "€ "+ " --- "+(almacenObjeto[i].cantidad*almacenObjeto[i].precio).toFixed(2)+ "€ </p>";
            total += precioTotal[i]
            aux+=almacenObjeto[i].cantidad;
        }
        inputs[i].value="";
       
    }
    divEscribir.innerHTML += "<p> Precio Total: " + total.toFixed(2) + " Kilo</p>";
    divEscribir.innerHTML += "<p> Precio Medio:" + (total / aux).toFixed(3) + "€</p>";

    total = 0;
    aux = 0;

    ventana()

    setTimeout("reiniciar()",10000);
    
}

function ventana(){
    var texto="";
    for (var i = 0; i < 10; i++) {
        if ( almacenObjeto[i]!=0 && i%2==0) {
            if(almacenObjeto[i].proximidad==true){
               texto+=  " Las "+almacenObjeto[i].nombre+" son fruta de verano, de proximidad y de "+almacenObjeto[i].region+"\n";
            }else{
                texto+= " Las "+almacenObjeto[i].nombre+" son fruta de verano,no de proximidad y de "+almacenObjeto[i].region+"\n";
            }
        }else if(almacenObjeto[i]!=0 && i%2!=0){
            if(almacenObjeto[i].conserva==true){
                texto+= " Las "+almacenObjeto[i].nombre+ "son frutas de inverno y es recomendable conservarlas en fuera de la nevera "+"\n"
           }else{
            texto+= " Las "+almacenObjeto[i].nombre+ "son frutas de inverno y no es recomendable conservarlas en fuera de la nevera "+"\n"
           }
            
        }
    }
    alert(texto);
    
}


function reiniciar(){
    divEscribir.innerHTML = '';
    divLateral.innerHTML="";

    for (var i = 0; i < 10; i++) {
        almacenObjeto[i]=0
        cantidadFruta[i]=0
        precioTotal[i]=0
    }
     inputs=document.getElementsByTagName("input");

   total = 0;
   aux=0;
   divEscribir="";
   divLateral="";
   colores="";
}
