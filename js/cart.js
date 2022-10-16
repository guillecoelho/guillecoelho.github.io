const cartUrl = CART_INFO_URL + '25801.json';

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
	cargarUser();

	cargarDatos();
});

async function cargarDatos() {
	await getJSONData(cartUrl).then(function (resultObj) {
		if (resultObj.status === 'ok') {
			carrito = resultObj.data.articles;
		}
	});

	await agregarLista(carrito);
}

function agregarLista(carrito) {
	let itemsCarrito = '';

	let cont = 0;
	for (item of carrito) {
		itemsCarrito += `
          <tr>
               <th scope="row"><img src="${
									item.image
								}" style="width: 100px;height: auto;"></th>
                    <td>${item.name}</td>
                    <td id="costo">${item.currency} ${item.unitCost}</td>
                    <td><input id="${cont}" type="text" value="${
			item.count
		}" class="w-25 subtotal"></td>
                    <th id="sub_${cont}">${item.currency} ${
			item.unitCost * item.count
		}</th>
          </tr>
          `;
		cont++;
	}

	let listado = `
     <h4>Articulos a comprar</h4>
     <div class="table-responsive">
          <table class="table">
               <thead>
               <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
               </tr>
               </thead>
               <tbody>
                    ${itemsCarrito}
               </tbody>
          </table>
     </div>
     `;

	document.getElementById('listaCarrito').innerHTML += listado;

	document.querySelectorAll('.subtotal').forEach((item) => {
		item.addEventListener('input', () => {
			subTotal(item.value, item.id, carrito[item.id]);
		});
	});
}

function subTotal(value, id, item) {
	let subt = `${item.currency} ${item.unitCost * value}`;
	if (value != '') {
		document.getElementById('sub_' + id).innerHTML = subt;
	} else {
		document.getElementById('sub_' + id).innerHTML = 'Esperando Cantidad';
	}
}
