const info = PRODUCT_INFO_URL + `${localStorage.getItem('prodId')}.json`;
const come =
	PRODUCT_INFO_COMMENTS_URL + `${localStorage.getItem('prodId')}.json`;
const contInfo = document.getElementById('infoProd');

let infoProd = [];
let comeProd = [];

document.addEventListener('DOMContentLoaded', () => {
	cargarDatos();
});

async function cargarDatos() {
	await getJSONData(info).then(function (resultObj) {
		if (resultObj.status === 'ok') {
			infoProd = resultObj.data;
		}
	});

	await getJSONData(come).then(function (resultObj) {
		if (resultObj.status === 'ok') {
			comeProd = resultObj.data;
		}
	});

	let rowImagenes = '';

	for (let i = 0; i < infoProd.images.length; i++) {
		rowImagenes += `
          <div class="col-md-auto">
               <img src="${infoProd.images[i]}" class="imgIlust rounded">
          </div>
          `;
	}

	let comentarios = '';

	for (let i = 0; i < comeProd.length; i++) {
		comentarios += `
          <li class="list-group-item">
               <p><span class="fw-bold">${comeProd[i].user}</span> - ${comeProd[i].dateTime} - `;
		for (let j = 0; j < comeProd[i].score; j++) {
			comentarios += `
               <span class="fa fa-star checked"></span>
               `;
		}
		for (let j = comeProd[i].score; j < 5; j++) {
			comentarios += `
               <span class="fa fa-star"></span>
               `;
		}
		comentarios += `
               </p>
               <p>${comeProd[i].description}</p>
          </li>`;
	}

	let htmlContentToAppend = `
     <div class="col">
          <div class="row p-4">
               <h1>${infoProd.name}</h1>
          </div>
          <hr>
          <div class="row">
               <p><span class="fw-bold">Precio</span> <br>
               ${infoProd.currency} ${infoProd.cost}</p>
          </div>
          <div class="row">
               <p><span class="fw-bold">Descripción</span> <br>
               ${infoProd.description}</p>
          </div>
          <div class="row">
               <p><span class="fw-bold">Categoría</span> <br>
               ${infoProd.category}</p>
          </div>
          <div class="row">
               <p><span class="fw-bold">Cantidad de vendidos</span> <br>
               ${infoProd.soldCount}</p>
          </div>
          <div class="row">
               <p><span class="fw-bold">Imagenes ilustrativas</span></p>
          </div>
          <div class="row d-flex gap-3 flex-wrap justify-content-around align-content-between">
               ${rowImagenes}
          </div>
          <hr>
          <div class="row p-3">
               <h4>Comentarios</h4>
               <ul class="list-group">
                    ${comentarios}
               </ul>
          </div>
          <div class="row p-3">
               <div class="col-5">
                    <h4>Comentar</h4>
                    <form>
                         <div class="form-floating p-2">
                              <textarea class="form-control" id="coment"></textarea>
                              <label for="coment">Tu opinión</label>
                         </div>
                         <div class="input-group mb-3 p-2">
                              <label class="input-group-text" for="inputGroupSelect01">Puntuación</label>
                              <select class="form-select" id="inputGroupSelect01">
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              </select>
                         </div>
                         <div class="mx-auto text-center">
                              <button type="button" class="btn btn-primary">Enviar</button>
                         </div>
                         
                    </form>
               </div>
          </div>
     </div>`;

	contInfo.innerHTML += htmlContentToAppend;
}
