let datos = [];
const userNameNav = document.getElementById('nav-user');

document.addEventListener('DOMContentLoaded', function () {
	cargarDatos();

	console.log(datos);

	userNameNav.innerHTML += `${datos[0]}`;

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

function cargarDatos() {
	datos = JSON.parse(localStorage.getItem('Datos')) || [];
}
