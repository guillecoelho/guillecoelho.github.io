const url_prod =
	'https://japceibal.github.io/emercado-api/cats_products/' +
	localStorage.getItem('catID') +
	'.json';

let currentProductList;

document.addEventListener('DOMContentLoaded', function (e) {
	getJSONData(url_prod).then(function (resultObj) {
		console.log(resultObj.status);
		if (resultObj.status === 'ok') {
			currentProductList = resultObj.data;
			console.log(currentProductList);
			mostrarDatosMain();
			showProductsList();
		}
	});
});

function showProductsList() {
	let htmlContentToAppend = '';
	for (let i = 0; i < currentProductList.products.length; i++) {
		let product = currentProductList.products[i];
		htmlContentToAppend += `
          <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
               <div class="row">
                    <div class="col-3">
                         <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                         <div class="d-flex w-100 justify-content-between">
                              <h4 class="mb-1">${product.name} - USD ${product.cost}</h4>
                              <small class="text-muted">${product.soldCount} artículos</small>
                         </div>
                         <p class="mb-1">${product.description}</p>
                    </div>
               </div>
          </div>
          `;

		document.getElementById('prod-list-container').innerHTML =
			htmlContentToAppend;
	}
}

// PARTE 2
function mostrarDatosMain() {
	let mainHTML = `
     <div class="text-center p-4">
          <h2>Productos</h2>
          <p class="lead">
               Verás aquí todos los productos de la categoría <strong>${currentProductList.catName}</strong>.
          </p>
     </div>
     <div class="row">
          <div class="col text-end">
               <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
                    <input type="radio" class="btn-check" name="options" id="sortAsc">
                    <label class="btn btn-light" for="sortAsc">A-Z</label>
                    <input type="radio" class="btn-check" name="options" id="sortDesc">
                    <label class="btn btn-light" for="sortDesc">Z-A</label>
                    <input type="radio" class="btn-check" name="options" id="sortByCount" checked>
                    <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1"></i></label>
               </div>
          </div>
     </div>
     <div class="row">
          <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
               <div class="row container p-0 m-0">
                    <div class="col">
                         <p class="font-weight-normal text-end my-2">Cant.</p>
                    </div>
                    <div class="col">
                         <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
                    </div>
                    <div class="col">
                         <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
                    </div>
                    <div class="col-3 p-0">
                         <div class="btn-group" role="group">
                              <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                              <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
                         </div>
                    </div>
               </div>
          </div>
     </div>
     <div class="container">
          <div class="row">
               <div class="list-group" id="prod-list-container"></div>
          </div>
     </div>
     `;

	document.getElementById('mainID').innerHTML = mainHTML;
}

// PARTE 3

function sortCategories(criteria, array) {
	let result = [];
	if (criteria === ORDER_ASC_BY_NAME) {
		result = array.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});
	} else if (criteria === ORDER_DESC_BY_NAME) {
		result = array.sort(function (a, b) {
			if (a.name > b.name) {
				return -1;
			}
			if (a.name < b.name) {
				return 1;
			}
			return 0;
		});
	} else if (criteria === ORDER_BY_PROD_COUNT) {
		result = array.sort(function (a, b) {
			let aCount = parseInt(a.productCount);
			let bCount = parseInt(b.productCount);

			if (aCount > bCount) {
				return -1;
			}
			if (aCount < bCount) {
				return 1;
			}
			return 0;
		});
	}

	return result;
}
