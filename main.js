
//Creo las variables para poder guardar los datos de carga de las facturas y clientes
let iphone12 = 50000;
let iphone13 = 70000;
let date = new Date;
let cuit;
let direccion;
let agregarProd;
let borrarProd;
let numFactura;
let fecha;
let cliente;
let productoUno;
let precioProdUno;
let totalProdUno;
let cantUno ;
let cantDos ;
let productoDos;
let precioProdDos ;
let totalProdDos ;
let Total;
let facturas=[];
let clientesCargados = []
// Variables para la carga de clientes.
let clienteNuevo;
let direccionCliente;
let cuitCliente;
// Variables de login
let usuario ;
let passUsuario;
let log;
let verPAs;
//Control de caja
let caja =[];
let cajaInicial;







//Creo un constructor para poder guardar mis facturas en un objeto
class Factura {
    constructor(numFactura, fecha,cuit, cliente, direccion, productoUno,cantUno,precioProdUno,totalProdUno, productoDos,precioProdDos,cantDos,totalProdDos, total){
        this.numFactura = numFactura;
        this.fecha = fecha;
        this.cuit = cuit;
        this.cliente = cliente;
        this.direccion = direccion;
        this.cantUno = cantUno;
        this.productoUno = productoUno;
        this.precioProdUno = precioProdUno;
        this.totalProdUno = totalProdUno;
        this.cantDos = cantDos;
        this.productoDos = productoDos;
        this.precioProdDos = precioProdDos;
        this.totalProdDos = totalProdDos;
        this.total = total;
    }
}

// constructor para guardar la carga de cliente 
class Clientes {
    constructor(clienteNuevo,direccionCliente,cuitCliente){
        this.cuit = cuitCliente;
        this.cliente = clienteNuevo;
        this.direccion = direccionCliente;
        }
}

//Creo un constructor para poder guardar el numero de factura y el total para poder hacer la caja del turno
class CajaSesion {
    constructor(numFactura, total){
        this.numFactura = numFactura;
        this.total = total;
    }
}





//************************* Eventos ****************


//login una vez que hago click griso los input si el password y contraseña correctos voy al menu correspondiente, le puse un setTimeoit para simular el control de la base de datos
log = document.querySelector('#inicio');
log.addEventListener("submit", (e) => {
    e.preventDefault();
    usuario=user.value;
    passUsuario = pass.value;
    document.getElementById('user').disabled = true;
    document.getElementById('pass').disabled = true;
    document.getElementById('btnUsr').disabled = true;
    document.getElementById('mostrarPass').disabled = true;
    let clave= "usuario";
    
    
//Si el logueo es correcto guardo en el storage el listado de clientes a modo de ser usado como pseudo base de datos para guardar mas clientes y que me agilice la carga de facturas
    if(clave == usuario.toLowerCase() && passUsuario =="usuario"){
        facturasCargadas();
        clientesGuardados();   
        
       setTimeout(()=>{
            document.getElementById("inicioF").style.display = "none";
            function guardarClientes(){
                           }
            } ,5000);
       setTimeout(()=>{
            document.getElementById("saludo").style.display = "block";
            document.getElementById("saludo").innerHTML = `Bienvenido ${usuario.toLowerCase()}`
            } ,6000);
       setTimeout(()=>{
            document.getElementById("saludo").style.display = "none";
            document.getElementById("cajaInicio").style.display = "block";   
            document.getElementById("cerrarSesion").style.display = "block";  
            document.getElementById("cerrarSes").disabled = false;        
            } ,7500);

        
    }else{
        Swal.fire('Password o contraseña incorrecta');}
})

//mostrar passwor u ocultar
let verPass = document.querySelector("#mostrarPass");
verPass.addEventListener("click",()=>{
    if(document.getElementById("pass").type === "password"){
        document.getElementById("pass").type ="text";
    }else{
        document.getElementById("pass").type = "password";
    }
    
});

//Cerrar sesion
const cerrarS = document.querySelector('#cerrarSes');
cerrarS.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("cerrarSes").disabled = true; 
    
    setTimeout(()=>{
        document.getElementById("menu").style.display = "none";
        document.getElementById("nuevaFactura").style.display = "none";
        document.getElementById("nuevoCliente").style.display = "none";
        document.getElementById("cajaInicio").style.display = "none";
        document.getElementById("cerrarSesion").style.display = "none";
        } ,2000);
        setTimeout(()=>{        
        document.getElementById("saludo").style.display = "block";
        document.getElementById("saludo").innerHTML = `Hasta la proxima ${usuario.toLowerCase()}!!!`
        } ,5000);
   setTimeout(()=>{
        location.reload();   
        localStorage.clear();
        
        } ,6500);
});

//Guarda el inicio de caja en el localstorage
const initCaja = document.querySelector('#ingresarCaja');
initCaja.addEventListener("click", (e) => {
    e.preventDefault();
    cajaInicial = ingresoCaja.value;
    if(cajaInicial != "") {
        localStorage.setItem("Caja Inicial",JSON.stringify(cajaInicial));
        document.getElementById("menu").style.display = "block";
        document.getElementById("cajaInicio").style.display = "none";  
        
    }else{
        Swal.fire('La caja inicial debe ser mayor o igual a 0');
        
    }
    
});

// ME lleva al menu de facturas
let seleccionarFac = document.querySelector("#btnFac");
seleccionarFac.addEventListener("click", menuFac);

// voy a la carga de facturas nuevas
let crearFac = document.querySelector("#btnFacNew");
crearFac.addEventListener("click", cargarFactura);

// voy a la pantalla de busqueda de facturas
let busFac = document.querySelector("#btnFacBusc");
busFac.addEventListener("click", buscarFac);

//voy a la edicion de facturas
let editarFac = document.querySelector("#edit");
editarFac.addEventListener("click", editarFactura);

// agregar producto
agregarProd= document.querySelector('#addProd');
agregarProd.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("todoSegundo").style.display = "block";
    document.getElementById("deletProd").style.display = "block";
    document.getElementById("cantSeg").style.display = "block";
    document.getElementById("segProd").style.display = "block";
    document.getElementById("precioUniSeg").style.display = "block";
    document.getElementById("valorDos").style.display = "block";
   
    document.getElementById("addProd").style.display = "none";
    document.getElementById("lsegProd").style.visibility = "visible";
    document.getElementById("lCantSeg").style.visibility = "visible";
    document.getElementById("lCantSeg").style.visibility = "visible";
    document.getElementById("lPrecioUniSeg").style.visibility = "visible";
    document.getElementById("lValorDos").style.visibility = "visible";
    
 

})

//Elimino el producto agregado y dejo el total de la factura solo con el primer producto
borrarProd= document.querySelector('#deletProd');
borrarProd.addEventListener("click", (e) => {
    e.preventDefault();
    valorDos.value ="0";
    precioUniSeg.value ="0";
    segProd.value ="";
    cantSeg.value="";
    document.getElementById("todoSegundo").style.display = "none";
    document.getElementById("cantSeg").style.display = "none";
    document.getElementById("segProd").style.display = "none";
    document.getElementById("precioUniSeg").style.display = "none";
    document.getElementById("valorDos").style.display = "none";
    document.getElementById("addProd").style.display = "block";
    document.getElementById("lsegProd").style.visibility = "hidden";
    document.getElementById("lCantSeg").style.visibility = "hidden";
    document.getElementById("lPrecioUniSeg").style.visibility = "hidden";
    document.getElementById("lValorDos").style.visibility = "hidden";
    document.getElementById("deletProd").style.display = "none";
    
    valor.value = (precioUniPri.value*cantPrim.value);


})


// En este evento creo un nuevo objeto(factura) le grego numero de factura y lo empujo al array y lo dejo en el storage guardado
const factura = document.querySelector('#cargaFactura');
factura.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Con este if controlo que esten todos los campos completados, que el cuit este completo y que si tengo dos productos facturados no sean el mismo.
    if(cui.value.length !== 11)  {
    Swal.fire('Debe ingresar los 11 numeros del CUIT sin puntos ni guiones');
    }else if(document.getElementById("segProd").style.display == "block" && (fechas.value == "" ||cui  .value ==""|| clientes.value == "" || address.value == ""|| cantPrim.value == "" || primProd.value == "" || cantSeg.value =="" || segProd.value ==""||  valor.value == "")){

        Swal.fire('Los datos cargados no estan completos');
    //si estoy repitiendo el mismo producto que me avise   
    }else if(document.getElementById("segProd").style.display == "block" &&  primProd.value == segProd.value ){

        Swal.fire('Los productos seleccionados son iguales');

    }else if(document.getElementById("segProd").style.display == "none" && (fechas.value == "" ||cui.value =="" || clientes.value == "" || address.value == "" || cantPrim.value == "" || primProd.value == "" ||valor.value == "" || valor.value == "0")){

            Swal.fire('Los datos cargados no estan completos');
    }else{

        numFactura = (facturas.length)+1;
        numFac.value = numFactura;
        fecha = fechas.value;
        cuit = cui.value;
        cliente = clientes.value;
        direccion = address.value;
        productoUno = primProd.value; 
        totalProdUno = valorUno.value;
        totalProdDos = valorDos.value;
        cantDos = cantSeg.value;
        productoDos = segProd.value;  
        precioProdDos= precioUniSeg.value ;
        precioProdUno = precioUniPri.value;
        total = valor.value;  
        
        
        let nFactura = new Factura(numFactura, fecha,cuit, cliente, direccion, productoUno,cantUno,precioProdUno,totalProdUno, productoDos,precioProdDos,cantDos,totalProdDos, total);
        facturas.push(nFactura);
        localStorage.setItem("facturas", JSON.stringify(facturas));
        let nIngreso = new CajaSesion (numFactura,total );
        caja.push(nIngreso);
        localStorage.setItem("Caja sesion",JSON.stringify(caja));
        mostrarFacturaCargada();
    }
})







// Busco la factura y la mando a la funcion mostrar
let searchFac = document.querySelector('#btnSearchFac');
searchFac.addEventListener("click", (e) => {
        document.getElementById("cantSeg").style.display = "none";
        document.getElementById("precioUniSeg").style.display = "none";
        document.getElementById("segProd").style.display = "none";
        document.getElementById("valorDos").style.display = "none"; 
        localStorage.setItem("facturas", JSON.stringify(facturas));    
    facturas = JSON.parse(localStorage.getItem("facturas")) ;  
 //Chequeo que exista la factura con  una funcion de orden superior   
    let buscar = facturas.find( fel => fel.numFactura == numFac.value);
    
    if (buscar !== undefined){

        numFactura = numFac.value;
        fechas.value  = facturas[(numFactura-1)].fecha ;
        cui.value = parseInt( facturas[(numFactura-1)].cuit) ;
        clientes.value = facturas[(numFactura-1)].cliente ;
        address.value =  facturas[(numFactura-1)].direccion ;
        cantPrim.value = parseInt( facturas[(numFactura-1)].cantUno );
        primProd.value =   facturas[(numFactura-1)].productoUno; 
        valorUno.value =  parseInt( facturas[(numFactura-1)].totalProdUno ) ;   
        precioUniPri.value = parseInt( facturas[(numFactura-1)].precioProdUno );
        precioUniSeg.value = parseInt( facturas[(numFactura-1)].precioProdDos );
        cantSeg.value = facturas[(numFactura-1)].cantDos;
        valorDos.value =  facturas[(numFactura-1)].totalProdDos;
        segProd.value =  facturas[(numFactura-1)].productoDos ; 
        valor.value = parseInt( facturas[(numFactura-1)].total );
            
        if(valorDos.value !== "0"){
            document.getElementById("cantSeg").style.display = "block";
            document.getElementById("precioUniSeg").style.display = "block";
            document.getElementById("segProd").style.display = "block";
            document.getElementById("valorDos").style.display = "block";
            document.getElementById("lsegProd").style.visibility = "visible";
            document.getElementById("lCantSeg").style.visibility = "visible";
            document.getElementById("lPrecioUniSeg").style.visibility = "visible";
            document.getElementById("lValorDos").style.visibility = "visible";
        }
            
        mostrarFacturaCargada();
         
        }else {
            Swal.fire(`La factura Numero ${numFac.value} no existe en el sistema`);
            } 
    
    

})


//Edito la factura y la vuelvo a guardar en el storage.
let guardar = document.querySelector('#save');

guardar.addEventListener("click", (e) => {
    e.preventDefault(); 
     // Con este if controlo que esten todos los campos completados, que el cuit este completo y que si tengo dos productos facturados no sean el mismo.
     if(cui.value.length !== 11)  {
        Swal.fire('Debe ingresar los 11 numeros del CUIT sin puntos ni guiones');
             
     }else if(document.getElementById("segProd").style.display == "block" && (fechas.value == "" ||cui  .value ==""|| clientes.value == "" || address.value == ""|| cantPrim.value == "" || primProd.value == "" || cantSeg.value =="" || segProd.value ==""|| valor.value == "" || valor.value == "0")){

        Swal.fire('Los datos cargados no estan completos');
    //si estoy repitiendo el mismo producto que me avise   
    }else if(document.getElementById("segProd").style.display == "block" &&  primProd.value == segProd.value ){

        Swal.fire('Los productos seleccionados son iguales');

    }else if(document.getElementById("segProd").style.display == "none" && (fechas.value == "" ||cui.value =="" || clientes.value == "" || address.value == "" || cantPrim.value == "" || primProd.value == "" ||valor.value == "" || valor.value == "0" )){

            Swal.fire('Los datos cargados no estan completos');
    }else{

        facturas = JSON.parse(localStorage.getItem("facturas")) ;   
    facturas[(numFactura-1)].fecha  = fechas.value;
    facturas[(numFactura-1)].cuit  = cui.value;
    facturas[(numFactura-1)].cliente  = clientes.value;
    facturas[(numFactura-1)].direccion = address.value;
    facturas[(numFactura-1)].cantUno = cantPrim.value;
    facturas[(numFactura-1)].productoUno  = primProd.value; 
    facturas[(numFactura-1)].totalProdUno  = valorUno.value;   
    facturas[(numFactura-1)].precioProdUno = precioUniPri.value;
    facturas[(numFactura-1)].precioProdDos = precioUniSeg.value;
    facturas[(numFactura-1)].cantDos  = cantSeg.value;
    facturas[(numFactura-1)].totalProdDos  = valorDos.value;
    facturas[(numFactura-1)].productoDos  = segProd.value; 
    facturas[(numFactura-1)].total  = valor.value;
    localStorage.setItem("facturas", JSON.stringify(facturas));
    
    //Controlos si las fechas son iguales al dia de hoy, si lo son, cambio el total en el storage de la caja sesiion

    const fechaHoy = new Date();
    fechaHoy.toLocaleDateString();
    
    const fechaFacturaEdit = fechas.value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$2/$3/$1');
    if(Date.parse(fechaHoy.toLocaleDateString()) == Date.parse(fechaFacturaEdit)){
        
        editarCajaSesion();
    }
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se guardaron los cambios realizados en la factura numero: '+numFactura,
        showConfirmButton: false,
        timer: 2500
})
setTimeout(()=>{
    mostrarFacturaCargada();
    } ,3000);
    }
    

})   



//Guardo la cantidad del producto uno

 
let cUno = document.querySelector('#cantPrim');
cUno.addEventListener("change", ()=>{ 
    cantUno = cantPrim.value;


})

//con este evento asigno el precio unitario del primer producto segun el producto seleccionado

let precProdUno = document.querySelector('#primProd');
precProdUno.addEventListener("change", ()=>{
    if (precProdUno.value == "Iphone 12"){
        precioProdUno = iphone12;
        precioUniPri.value = precioProdUno;
    
    }else if(precProdUno.value == "Iphone 13"){
        precioProdUno = iphone13;
        precioUniPri.value = precioProdUno;
        }
   
})

//Guardo la cantidad del producto dos
let cDos = document.querySelector('#cantSeg');
cDos.addEventListener("change", ()=>{ 
    cantDos = cantSeg.value;
    

})

//con este evento asigno el precio unitario del primer producto segun el producto seleccionado

let precProdDos = document.querySelector('#segProd');
precProdDos.addEventListener("change", ()=>{
    if (precProdDos.value == "Iphone 12"){
        precioProdDos = iphone12;
        precioUniSeg.value = precioProdDos;
    
    }else if(precProdDos.value == "Iphone 13"){
        precioProdDos = iphone13;
        precioUniSeg.value = precioProdDos;
        }
   
})

 

// Con este evento hago que el total  del item y el total de la facturase calcule automatico
const totalFactura = document.querySelector('#cargaFactura');
totalFactura.addEventListener("change", (e) => {     
             
    valorUno.value = (precioUniPri.value*cantPrim.value);
    valorDos.value = (precioUniSeg.value*cantSeg.value);
    valor.value = (precioUniSeg.value*cantSeg.value)+(precioUniPri.value*cantPrim.value);
                      
})

// controlo que el en el input del cuit de la factura se hayan ingresado los 11 caracteres corresponndientes, chequeo si el numero de cuit esta en el storage de clientes, si es asi traigo los datos de la direccion y el nombre y los completo en la factura
const cuiFactura = document.querySelector('#cui');
cuiFactura.addEventListener("change", (e) => {   
    if(cui.value.length !== 11)  {
    Swal.fire('Debe ingresar los 11 numeros del CUIT sin puntos ni guiones');
    }else{
        clientesCargados = JSON.parse(localStorage.getItem("Clientes")) ;  
 //Chequeo que exista la factura con  una funcion de orden superior   
    let buscarCuit = clientesCargados.find( fel => fel.cuit == cui.value);
    if(buscarCuit !== undefined ){
        clientes.value = buscarCuit.cliente;
    address.value =buscarCuit.direccion;
     }else{
    
    clientes.value ="";
        address.value = "";
     }
   }
})



// controlo que el en el input del cuit de la carga de clientes se hayan ingresado los 11 caracteres corresponndientes
const cuiClientes = document.querySelector('#cuitCli');
cuiClientes.addEventListener("change", (e) => {   
    if(cuitCli.value.length !== 11)  
        Swal.fire('Debe ingresar los 11 numeros del CUIT sin puntos ni guiones');
})

const nCli = document.querySelector('#cargaClientes');
nCli.addEventListener("submit", (e) => {
    e.preventDefault();
    if(cuitCli.value.length !== 11) { 
        Swal.fire('Debe ingresar los 11 numeros del CUIT sin puntos ni guiones');
    }else if(cliNuevo.value == "" ||  direccionCli.value =="" ||cuitCli.value =="" ){
        Swal.fire('Los datos cargados no estan completos');
    }else{
        cuitCliente = cuitCli.value;
        clienteNuevo = cliNuevo.value;
        direccionCliente = direccionCli.value;
    
        let newCliente = new Clientes( clienteNuevo ,direccionCliente,cuitCliente );
        clientesCargados.push(newCliente);
     
            
        localStorage.setItem("Clientes", JSON.stringify(clientesCargados));
        mostrarClientes() ;
    }

})



//muestro el total de la caja
let calCaja = document.querySelector('#btnCaja');
calCaja.addEventListener("click", (e) => {
   let totalCaja= parseInt(cajaInicial);
    
     
    if(caja == "[]"){
    console.log(totalCaja);
    Swal.fire(`El saldo de la caja es: $ ${totalCaja} `);
    
    }else{
        
        caja.forEach( sumCaja => {
            totalCaja = totalCaja + parseInt(sumCaja.total) ;
            caja = JSON.parse(localStorage.getItem("Caja sesion")) ; 
           
        })
        Swal.fire(`El saldo de la caja es: $ ${totalCaja} `);

    }

});


//Me lleva a la carga de clientes
let seleccionar = document.querySelector("#btnCli");
seleccionar.addEventListener("click",cargarClientes);

// reseteo los valores de los input y vuelvo a la carga de clientes
const volverCliente = document.querySelector('#btnClientesBack');

volverCliente.addEventListener("click",  cargarClientes);



//***************Funciones**********************************************************




// con esta funciono chequeo si no cerro cesion que le mantenga los datos cargados

function chequeoReload(){
    cajaInicial = JSON.parse(localStorage.getItem("Caja Inicial")) ;
    
if(cajaInicial !== null)
{
    document.getElementById("inicioF").style.display = "none";
    document.getElementById("saludo").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("cerrarSesion").style.display = "block";  
    document.getElementById("cerrarSes").disabled = false; 
    
    
}
}



//Creo esta funcion para poder pasar mi "base de datos" de facturas a un array  para llevarlo al storage, dado que no es posible modificar la base de datos.
const contFac = document.querySelector("#contenedor");
const facturasCargadas =  ()=>{
    fetch("./datos.json")
   .then(response => response.json())
   .then(result =>  {
        result.forEach(fact => {
            
            facturas.push(fact);
            
            
        })
    })
    .catch(error => console.log(error))
    
        
}


//Creo esta funcion para poder pasar mi "base de datos"  de clientes a un array y al storage, dado que no es posible modificar la base de datos, la idea es usuarlo como pseudo base de datos para poder actualizar
const contCli = document.querySelector("#contenedor");
const clientesGuardados =  ()=>{
    fetch("./clientes.json")
   .then(response => response.json())
   .then(result =>  {
        result.forEach(cli => {
        
        clientesCargados.push(cli);
        localStorage.setItem("Clientes", JSON.stringify(clientesCargados));
            
             
            
    })
   
  })
  .catch(error => console.log(error))
}

//muestro el menu de facturas
function menuFac(){
   
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("btnFacBusc").style.display = "block";
    document.getElementById("btnFacNew").style.display = "block";
    
   


}

//Creo una funcion para cargar la factura , si vengo de una factura ya cargada blanqueo los campos.
function cargarFactura() {
    document.getElementById("titForm").innerText = "Nueva Factura";
    document.getElementById("cargaFactura").style.display = "block";
    document.getElementById("btnSearchFac").style.display = "none";
    document.getElementById("save").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("cantSeg").style.display = "none";
    document.getElementById("segProd").style.display = "none";
    document.getElementById("addProd").style.display = "block";
    document.getElementById("deletProd").style.display = "none";
    document.getElementById("btn").style.display = "block";
    document.getElementById("numFac").style.display = "none";
    document.getElementById("buscaFac").style.display = "none";
    document.getElementById("precioUniSeg").style.display = "none";
    document.getElementById("valorDos").style.display = "none";
    document.getElementById("lsegProd").style.visibility = "hidden";
    document.getElementById("lCantSeg").style.visibility = "hidden";
    document.getElementById("lPrecioUniSeg").style.visibility = "hidden";
    document.getElementById("lValorDos").style.visibility = "hidden";
    document.getElementById("lFechas").style.visibility = "visible";
    document.getElementById("lCui").style.visibility = "visible";
    document.getElementById("lClientes").style.visibility = "visible";
    document.getElementById("lAddress").style.visibility = "visible";
    document.getElementById("lCantPrim").style.visibility = "visible";
    document.getElementById("lPrimProd").style.visibility = "visible";
    document.getElementById("lPrecioUniPri").style.visibility = "visible";
    document.getElementById("lValorUno").style.visibility = "visible";
    document.getElementById('fechas').disabled = false;    
    document.getElementById('cantPrim').disabled = false;
    document.getElementById('cui').disabled = false;    
    document.getElementById('clientes').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('primProd').disabled = false;
    document.getElementById('segProd').disabled = false;
    document.getElementById('cantSeg').disabled = false;
    document.getElementById("nuevaFactura").style.display = "block";
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("lNumfac").style.visibility = "hidden";
    cantDos=  "";
    cantUno=  "";
    precioProdDos=  "";
    precioProdUno= "";
    precioUniPri.value = "";
    precioUniSeg.value ="";
    valorUno.value = "";
    valorDos.value="";
    numFac.value = "";
    cui.value = "";
    fechas.value ="" ;
    clientes.value = "";
    address.value= "";
    primProd.value = "";
    cantPrim.value = "";
    cantSeg.value = "";
    segProd.value = "";
    valor.value = "";
  
    
}

//Habilito en esta version el input  para poner el numero de factura
function buscarFac(){
    document.getElementById("lNumfac").style.display = "block";
    document.getElementById("numFac").style.display = "block";
    document.getElementById("buscaFac").style.display = "block";
    document.getElementById("lNumfac").style.visibility = "visible";
    document.getElementById("titForm").innerText = "Buscar Factura x numero de factura";
    document.getElementById("save").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("cantSeg").style.display = "none";
    document.getElementById("segProd").style.display = "none";
    document.getElementById("addProd").style.display = "block";
    document.getElementById("deletProd").style.display = "none";
    document.getElementById("btn").style.display = "block";    
    document.getElementById("precioUniSeg").style.display = "none";
    document.getElementById("valorDos").style.display = "none";
    document.getElementById('fechas').disabled = false;
    document.getElementById("lsegProd").style.visibility = "hidden";
    document.getElementById("lCantSeg").style.visibility = "hidden";
    document.getElementById("lValorDos").style.visibility = "hidden";
    document.getElementById("lPrecioUniSeg").style.visibility = "hidden";
    document.getElementById("lFechas").style.visibility = "visible";
    document.getElementById("lCui").style.visibility = "visible";
    document.getElementById("lClientes").style.visibility = "visible";
    document.getElementById("lAddress").style.visibility = "visible";
    document.getElementById("lCantPrim").style.visibility = "visible";
    document.getElementById("lPrimProd").style.visibility = "visible";
    document.getElementById("lPrecioUniPri").style.visibility = "visible";
    document.getElementById("lValorUno").style.visibility = "visible";
    document.getElementById('cantPrim').disabled = false;
    document.getElementById('cui').disabled = false;
    document.getElementById('clientes').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('primProd').disabled = false;
    document.getElementById('segProd').disabled = false;
    document.getElementById('cantSeg').disabled = false;
    document.getElementById("nuevaFactura").style.display = "block";
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("cargaFactura").style.display = "none";
    document.getElementById('numFac').disabled = false;
    document.getElementById("btnSearchFac").style.display = "block";
    numFac.value ="";
  
    

}

//muestra la factura cargada una vez apretado el boton y sin poder editar, lo hice con otro formulario por el roor del storage, despues voy a usar el mismo formulario para todo
function mostrarFacturaCargada() {  
    document.getElementById("lNumfac").style.display = "block";
    document.getElementById("numFac").style.display = "block";
    document.getElementById("buscaFac").style.display = "block";
    document.getElementById("lNumfac").style.visibility = "visible";
    document.getElementById("cargaFactura").style.display = "block";
    document.getElementById("btnSearchFac").style.display = "none";
    document.getElementById("titForm").innerText = "Factura Guardada";
    document.getElementById("save").style.display = "none";
    document.getElementById("edit").style.display = "block";
    document.getElementById("addProd").style.display = "none";
    document.getElementById("deletProd").style.display = "none";
    document.getElementById("btn").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("numFac").style.display = "block";
    document.getElementById("numFac").disabled = true;
    document.getElementById("fechas").disabled = true;
    document.getElementById("lFechas").style.visibility = "visible";
    document.getElementById("lCui").style.visibility = "visible";
    document.getElementById("lClientes").style.visibility = "visible";
    document.getElementById("lAddress").style.visibility = "visible";
    document.getElementById("lCantPrim").style.visibility = "visible";
    document.getElementById("lPrimProd").style.visibility = "visible";
    document.getElementById("lPrecioUniPri").style.visibility = "visible";
    document.getElementById("lValorUno").style.visibility = "visible";
    document.getElementById('cui').disabled = true;
    document.getElementById('clientes').disabled = true;
    document.getElementById('address').disabled = true;
    document.getElementById("cantPrim").disabled = true;
    document.getElementById('primProd').disabled = true;
    document.getElementById("cantSeg").disabled = true;
    document.getElementById("segProd").disabled = true;
   
    
   
}

function editarFactura(){
    document.getElementById("numFac").style.display = "block";
    document.getElementById("buscaFac").style.display = "block";
    document.getElementById("lNumfac").style.visibility = "visible";
    document.getElementById("titForm").innerText = "Editar Factura";
    document.getElementById("save").style.display = "block";
    document.getElementById("edit").style.display = "none";
    document.getElementById("btnSearchFac").style.display = "none";
    document.getElementById("fechas").disabled = false;
    document.getElementById("lFechas").style.visibility = "visible";
    document.getElementById("lCui").style.visibility = "visible";
    document.getElementById("lClientes").style.visibility = "visible";
    document.getElementById("lAddress").style.visibility = "visible";
    document.getElementById("lCantPrim").style.visibility = "visible";
    document.getElementById("lPrimProd").style.visibility = "visible";
    document.getElementById("lPrecioUniPri").style.visibility = "visible";
    document.getElementById("lValorUno").style.visibility = "visible";
    document.getElementById('cui').disabled = false;
    document.getElementById('clientes').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById("cantPrim").disabled = false;
    document.getElementById('primProd').disabled = false;
    document.getElementById("cantSeg").disabled = false;
    document.getElementById("segProd").disabled = false;

    if(valorDos.value == 0){
        document.getElementById("addProd").style.display = "block";
        document.getElementById("deletProd").style.display = "none";
    }else{
        document.getElementById("addProd").style.display = "none";
        document.getElementById("deletProd").style.display = "block";
    }
    



}

// Muestro el formulario cliente, por ahora sin uso
function cargarClientes() {
    cuitCli.value="";
    cliNuevo.value="";
    direccionCli.value="";
    document.getElementById("btnFacBusc").style.display = "none";
    document.getElementById("btnFacNew").style.display = "none";
    document.getElementById("nuevaFactura").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "block";
    document.getElementById("cliNuevo").disabled = false;
    document.getElementById("direccionCli").disabled = false;
    document.getElementById("cuitCli").disabled = false;
    document.getElementById("btnClientesBack").style.display = "none";
    document.getElementById("btnClientes").style.display = "block";
    document.getElementById("tituloClientes").innerText = "Nuevo cliente";
    
}


function mostrarClientes(){
    document.getElementById("cliNuevo").disabled = true;
    document.getElementById("direccionCli").disabled = true;
    document.getElementById("cuitCli").disabled = true;
    document.getElementById("btnClientes").style.display = "none";
    document.getElementById("btnClientesBack").style.display = "block";
    document.getElementById("tituloClientes").innerText = "Cliente guardado";
    


}
//Funcion para editar la caja sesion en caso de q se edite la factura dle dia

function editarCajaSesion(){

    caja = JSON.parse(localStorage.getItem("Caja sesion")) ;   
    
   
    
    caja.forEach( editCaja => {
        if(editCaja.numFactura == numFac.value){
            editCaja.total = valor.value;
        }
        localStorage.setItem("Caja sesion",JSON.stringify(caja));
    })

    
}
//cada vez que reinicio chequeo
chequeoReload();