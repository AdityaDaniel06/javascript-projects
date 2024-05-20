'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
document.getElementsByClassName('btn');
const allButtons = document.getElementsByTagName('button'); // returns HTML Collection
console.log(allButtons);

// creating and inserting elements
// 1)insertAdjacentHTML
// 2)
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent ='We use cookies for improved funtionality and analytics';
message.innerHTML = `We use cookies for improved funtionality and analytic.<button  class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message); insert element as first child
header.append(message); // last child

// above either of one can be seen at a time
// to show mutli---- clone it
//  header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

//delete element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = ' 120%';

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// css varibles === changning values of css in js
document.documentElement.style.setProperty('--color-primary', 'pink');

//attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src); // absolute path http://127.0.0.1:5501/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.alt);
console.log(logo.className);

//custo attributes
console.log(logo.getAttribute('designer'));
logo.getAttribute('src'); // relative path

logo.alt = 'beautiful minialist logo!';
logo.setAttribute('company', 'Bankist');

// console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');
logo.classList.replace('c', 'c-new');
logo.classList.add('c', 'c-new');

//smooth scroll -->1
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  //current position
  console.log('Current Scroll', window.pageXOffset, window.pageYOffset);
  // viewport dimensions
  console.log('Height and widht', document.documentElement.clientHeight);
  // scroll
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // scroll -->2
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior:'smooth'
  // })

  //scroll--> 3  modern
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  h1.style.color = 'blue';
};
h1.addEventListener('mouseenter', alertH1);
// h1.removeEventListener('mouseenter', alertH1);
setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);

// h1.addEventListener('mouseleave', function(e){
//   h1.style.color = 'black';
// })

// old school
// h1.onmouseenter = function(e){
//   h1.style.color = 'black';
// }
