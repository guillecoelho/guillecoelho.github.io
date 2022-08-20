const mail = document.getElementById('floatingInput');
const divmail = document.getElementById('mailInputError');
const pass = document.getElementById('floatingPassword');
const divpass = document.getElementById('passInputError');

document.addEventListener('DOMContentLoaded', () => {
	mail.value = '';
	pass.value = '';
	mail.style.borderColor = 'grey';
	pass.style.borderColor = 'grey';

	document.getElementById('formLogin').addEventListener('submit', (e) => {
		e.preventDefault();

		if (mail.value == '') {
			mail.style.borderColor = 'red';
			mostrarError('No puede estar vacio', 1);
		}
		if (pass.value == '') {
			pass.style.borderColor = 'red';
			mostrarError('No puede estar vacio', 2);
		}
		if (mail.value != '' && pass.value != '') {
			window.location.href = 'principal.html';
		}
	});
});

function mostrarError(mensaje, tipo) {
	if (tipo == 1) {
		const mailError = document.createElement('p');
		mailError.textContent = mensaje;
		mailError.classList.add('text-red-500');
		divmail.appendChild(mailError);
	} else if (tipo == 2) {
		const passError = document.createElement('p');
		passError.textContent = mensaje;
		passError.classList.add('text-red-500');
		divpass.appendChild(passError);
	}
}

function onSignIn(googleUser) {
	console.log('Entro');
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
	console.log('Full Name: ' + profile.getName());
	console.log('Given Name: ' + profile.getGivenName());
	console.log('Family Name: ' + profile.getFamilyName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	console.log('ID Token: ' + id_token);
}
