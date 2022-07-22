const carrito = document.getElementById('carrito');
const lentes = document.getElementById('container-products');
const listaLentes = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


cargarEventListeners();

function cargarEventListeners() {
    lentes.addEventListener('click', comprarLentes);
    carrito.addEventListener('click', eliminarLentes);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarLentes(e) {/*LISTO */
    e.preventDefault();
    if (e.target.classList.contains('product__icon')) {
        const lente = e.target.parentElement.parentElement;
        leerDatosLentes(lente);
    }
}

function leerDatosLentes(lente) {/*LISTO*/
    const infoLentes = {
        imagen: lente.querySelector('.product__img').src,
        titulo: lente.querySelector('.product__title').textContent,
        precio: lente.querySelector('.product__price').textContent,
        id: lente.querySelector('.product__icon').getAttribute('data-id')
    }

    insertarCarrito(infoLentes);
}

/*Mostrar los productos */

function insertarCarrito(lente) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${lente.imagen}" width=100>
    </td>
    <td>${lente.titulo}</td>
    <td>${lente.precio}</td>
    <td>
        <a href="#" class="borrar-lente fa-solid fa-trash-can" data-id="${lente.id}"></a>
    </td> `;
    listaLentes.appendChild(row);
    guardarLenteLocalStorage(lente);
}

/*Eliminar lentes uno por uno */

function eliminarLentes(e) {
    e.preventDefault();

    let lente, lenteId;

    if (e.target.classList.contains('borrar-lente')) {
        e.target.parentElement.parentElement.remove();
        lente = e.target.parentElement.parentElement;
        lenteId = lente.querySelector('a').getAttribute('data-id');
    }
    eliminarLenteLocalStorage(lenteId);
}

/*Eliminar por completo el carrito */

function vaciarCarrito() {
    while (listaLentes.firstChild) {
        listaLentes.removeChild(listaLentes.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarLenteLocalStorage(lente) {
    let lentes;

    lentes = obtenerLentesLocalStorage();
    lentes.push(lente);

    localStorage.setItem('lentes', JSON.stringify(lentes));
}

function obtenerLentesLocalStorage() {
    let lentesLS;

    if (localStorage.getItem('lentes') === null) {
        lentesLS = [];
    } else {
        lentesLS = JSON.parse(localStorage.getItem('lentes'));
    }
    return lentesLS;
}  

function leerLocalStorage() {
    let lentesLS;

    lentesLS = obtenerLentesLocalStorage();

    lentesLS.forEach(function(lente) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src= "${lente.imagen}" width=100>
        </td>
        <td>${lente.titulo}</td>
        <td>${lente.precio}</td>
        <td>
            <a href="#" class="borrar-lente fa-solid fa-trash-can" data-id="${lente.id}"></a>
        </td> `;
        listaLentes.appendChild(row);
    });
}

function eliminarLenteLocalStorage(lente) {
    let lentesLS;
    lentesLS = obtenerLentesLocalStorage();

    lentesLS.forEach(function (lentesLS, index) {
        if (lentesLS.id === lente) {
            lentesLS.splice(index, 1);
        }
    });

    localStorage.setItem('lentes', JSON.stringify(lentesLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}