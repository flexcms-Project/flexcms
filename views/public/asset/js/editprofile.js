function loadimg(event) {
	var image = document.getElementById('imgplace');
	image.src = URL.createObjectURL(event.target.files[0]);
};
function updatevalue(){
	let input = document.querySelector("#name")
	input.value = input.value;
	console.log('test')
	console.log(input.value)
}