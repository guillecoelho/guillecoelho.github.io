const cartUrl = CART_INFO_URL + '25801.json';

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
	cargarDatos();
});

async function cargarDatos() {
	await getJSONData(cartUrl).then(function (resultObj) {
		if (resultObj.status === 'ok') {
			carrito = resultObj.data;
		}
	});

	let itemsCarrito = '';

	let cont = 0;
	for (item of carrito.articles) {
		itemsCarrito += `
          <tr>
               <th scope="row"><img src="${
									item.image
								}" style="width: 100px;height: auto;"></th>
               <td>${item.name}</td>
               <td id="costo">${item.currency} ${item.unitCost}</td>
               <td><input id="inputCount_${cont}" type="text" value="${
			item.count
		}" class="w-25" onchange="subTotal(this.value, this.id)"></td>
               <th id="subtotal">${item.currency} ${
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
}

function subTotal(value, id) {
	if (value != '') {
		let precio = document.getElementById('costo').value.toString().split('');
		let sub = precio * value;
		console.log(sub);
	}
}
