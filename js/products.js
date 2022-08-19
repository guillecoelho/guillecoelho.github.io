const url_prod =
	'https://japceibal.github.io/emercado-api/cats_products/101.json';

document.addEventListener('DOMContentLoaded', function (e) {
	getJSONData(url_prod).then(function (resultObj) {
		if (resultObj.status === 'ok') {
			currentProductList = resultObj.data;
			console.log(currentProductList);
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
