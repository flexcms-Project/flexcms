window.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.tema === "dark") {
      document.documentElement.classList.toggle("dark");
    } else {
      return;
    }
  });

  let btnToggleDarkMode = document.querySelector("nav .nav-link button");

btnToggleDarkMode.addEventListener("click", function () {
  document.body.parentElement.classList.toggle("dark");
  if (localStorage.tema === undefined) {
    window.localStorage.setItem("tema", "dark");
  } else {
    window.localStorage.removeItem("tema");
  }
});

let toggle = document.querySelector(".toggle");
let navlink = document.querySelector(".nav-link");
let closeToggle = document.querySelector(".close");
let openToggle = document.querySelector(".open");




toggle.addEventListener("click", function () {
  navlink.classList.toggle("hidden");
  navlink.classList.toggle("flex");
  closeToggle.classList.toggle("hidden");
  openToggle.classList.toggle("hidden");
  document.body.classList.toggle('overflow-hidden')
});

window.addEventListener('scroll',function(){
  let navbar = document.querySelector('nav');
  navbar.classList.toggle('sticky',window.scrollY > 300)
  navbar.classList.toggle('top-0',window.scrollY > 300)
})

let imagePost = document.querySelectorAll('article img');

imagePost.forEach(imageel => {
  imageel.addEventListener('click',function(){
    let imageBigger = document.querySelectorAll('.bigger')
    imageBigger.forEach(imageactive => {
      imageactive.classList.remove('bigger')
    })
    imageel.classList.toggle('bigger')
  })
});

imagePost.forEach(imageActive => {
  imageActive.addEventListener('dblclick',function(){
    imageActive.classList.toggle('bigger')
  })
});