
const socket=io();

const newProduct = document.getElementById('newProduct')
newProduct.addEventListener('submit', event => {
  event.preventDefault()
  let title = document.getElementById('title').value
  let price = document.getElementById('price').value
  let thumbnail = document.getElementById('thumbnail').value
  console.log(`${title}, $${price}, ${thumbnail}`)
  socket.emit('newproduct', {
    title : title,
    price : price,
    thumbnail : thumbnail
  })
  newProduct.reset();
})
const newMensaje = document.getElementById('newMensaje')
newMensaje.addEventListener('submit', event => {
  event.preventDefault()
  let email = document.getElementById('correo').value
  // crea un nuevo objeto `Date`
  var today = new Date();
  // obtener la fecha y la hora
  var now = today.toLocaleString();
  let mensaje = document.getElementById('mensaje').value
  console.log(`${String(email)}, ${now}, ${mensaje}`)
  socket.emit('newMensaje', {
    email : String(email),
    hora : now,
    mensaje : mensaje
  })
  newMensaje.reset();
})

socket.on("connect",()=>{
    console.warn("conectado al servidor");
})

socket.on('UpdateProduct', async(products) => {
    fetch('./views/productos.handlebars')
      .then(res => {
        return res.text()
      })
      .then(plantilla=> {
        //console.log(products);
        //console.log(plantilla);
        
        let template = Handlebars.compile(plantilla);
        let booleano=!products.length
        let html = template({products,boole:booleano})
        document.getElementById('container-products').innerHTML = html;
        })
  })
  socket.on('UpdateMensaje', async(mensaje) => {
    fetch('./views/mensaje.handlebars')
      .then(res => {
        return res.text()
      })
      .then(plantilla=> {
        let template = Handlebars.compile(plantilla);
        let html = template({mensaje})
        document.getElementById('container-chat').innerHTML = html;
        })
  })