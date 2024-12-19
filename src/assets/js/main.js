// Select Elements
const main = document.querySelector('main');

setBackGroundImage();

// Functions
function setBackGroundImage() {
    const number = Math.floor(Math.random() * 10) + 1;
    const imgClass = 'bg-img-' + number;
    main.classList.add(imgClass);
    console.log(imgClass);

}