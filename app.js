// Definicion de elementos y sus precios
const articulos = [
  { 
    id: 1,
    nombre: "Monitor 24 Pulgadas",
    precio: 1000,
    cantidad: 2, 
  },
  { 
    id: 2,
    nombre: "Teclado Inalambrico",
    precio: 350,
    cantidad: 14, 
  },
  {
    id: 3,
    nombre: "Mouse Gamer",
    precio: 250,
    cantidad: 13,
  },
  { 
    id: 4,
    nombre: "Impresora Scanner",
    precio: 1500,
    cantidad: 5,
  },
  { 
    id: 5,
    nombre: "Disco HDD 1TB",
    precio: 400,
    cantidad: 10,
  },
  { 
    id: 6,
    nombre: "Auriculares Inalambricos",
    precio: 450,
    cantidad: 10,
  },
  { 
    id: 7,
    nombre: "Gabinete Thermaltake",
    precio: 750,
    cantidad: 8,
  },
  { 
    id: 8,
    nombre: "GPU RX 580",
    precio: 2400,
    cantidad: 3,
  },
  { 
    id: 9,
    nombre: "CPU Ryzen 5 3400G",
    precio: 2100,
    cantidad: 3,
  },
  { 
    id: 10,
    nombre: "Parlante KRK",
    precio: 6000,
    cantidad: 4,
  },
];

localStorage.setItem("articulos", JSON.stringify(articulos));

const articulosEnLS = JSON.parse(localStorage.getItem("articulos"));
console.log(articulosEnLS);

// Función que permite agregar cantidades adicionales de un artículo
function agregarArticulo(nombre, precio, cantidad) {
  articulos.push({ nombre, precio, cantidad });
  alert(`Se ha agregado ${cantidad} ${nombre} a la lista de articulos.`);
}

//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
document.addEventListener('DOMContentLoaded', function() {
  // Obtén una referencia al contenedor de la animación
  const logoContainer = document.querySelector('.logo-container');

  // Crea una instancia de la animación
  const logoAnimation = lottie.loadAnimation({
    container: logoContainer, // El contenedor donde se renderizará la animación
    renderer: 'svg', // El tipo de renderizado (puede ser 'canvas', 'svg' o 'html')
    loop: true, // Repite la animación indefinidamente
    autoplay: true, // Reproduce la animación automáticamente al cargar
    path: 'animations/Animation - Nuclear.json' // La ruta a la animación
  });
});

loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque hubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }