let generatedColors = [];
let savedPalettes = [];
let i = 0;

function generateColorPalette() {
	const colors = document.querySelector('.colors');
	colors.innerHTML = '';
	generatedColors = [];

	for (let i = 0; i < 6; i++) {
		let color = document.createElement('div');
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		color.classList.add('fade-in');
		setTimeout(() => color.classList.remove('fade-in'), 400);
		color.innerHTML = `
			<h4 class="hex">${randomColor}</h4>
			<div class="color" style='background: #${randomColor}'></div>
		`
		colors.appendChild(color);
		generatedColors.push(`#${randomColor}`);
	}
}

function savePalette() {
	const savedInLocalStorage = localStorage.getItem('palletes');
	if (savedInLocalStorage) {
		savedPalettes = JSON.parse(savedInLocalStorage);
	}

	const paletteName = document.getElementById('myPalette').value;
	if (generatedColors.length > 0 && paletteName.value != "") {
		const newPalette = { name: paletteName, colors: generatedColors }
		savedPalettes.push(newPalette);
		localStorage.setItem('palletes', JSON.stringify(savedPalettes));
		generatedColors = [];
		showPalettes();
	}
	else {
		alert("No has generado tu paleta de colores o puede ser que no escribiste un nombre para tu paletas de colores")
	}

}

function showPalettes() {
	let palletes = localStorage.getItem('palletes') || [];
	palletes = JSON.parse(palletes);
	const palettesHistory = document.querySelectorAll('.pallete')[1];
	palettesHistory.innerHTML = `
		<div>
			<h1>History</h1>
		</div>
	`;

	for (let i = 0; i < palletes.length; i++) {
		let colorsDiv = document.createElement('div');
		colorsDiv.classList.add('colors');
		let palette = palletes[i];
		let headerNode = document.createElement('div');
		headerNode.innerText = palette.name;
		colorsDiv.appendChild(headerNode);

		for (let c of palette.colors) {
			let color = document.createElement('div');
			color.classList.add('fade-in');
			setTimeout(() => color.classList.remove('fade-in'), 400);
			color.innerHTML = `
				<h4 class="hex">${c}</h4>
				<div class="color" style='background: ${c}'></div>
			`
			colorsDiv.appendChild(color);

		}

		let parentDiv = document.createElement('div');
		parentDiv.classList.add('parent-div');
		parentDiv.appendChild(colorsDiv);
		palettesHistory.appendChild(parentDiv);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	showPalettes();
  });