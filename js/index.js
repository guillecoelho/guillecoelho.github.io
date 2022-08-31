const userNameNav = document.getElementById('nav-user');

document.addEventListener('DOMContentLoaded', function () {
	// PARTE 1
	userNameNav.innerHTML += `<a class="nav-link active" href="">${localStorage.getItem(
		'userID'
	)}</a>`;

	document.getElementById('autos').addEventListener('click', function () {
		localStorage.setItem('catID', 101);
		window.location = 'products.html';
	});
	document.getElementById('juguetes').addEventListener('click', function () {
		localStorage.setItem('catID', 102);
		window.location = 'products.html';
	});
	document.getElementById('muebles').addEventListener('click', function () {
		localStorage.setItem('catID', 103);
		window.location = 'products.html';
	});
});
