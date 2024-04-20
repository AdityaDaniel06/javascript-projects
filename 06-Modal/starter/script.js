'use strict';

// The select elements we need(HTML) and store it in varible(JS)
//  So, usually when you need to manipulate styles on a page, then always just export the styles into a class,
// and then use the class just like we did here.
const modal = document.querySelector('.modal'); // line 15
const overlay = document.querySelector('.overlay'); // line 28
const btnCloseModal = document.querySelector('.close-modal'); //line 17
const btnsOpenModal = document.querySelectorAll('.show-modal'); //buttons Review

const openModal = function () {
  // to open the modal by removing the hidden class from Html
  modal.classList.remove('hidden'); // Review classList is a property
  overlay.classList.remove('hidden'); // removes the class  , No dot required
  // modal.style.display = 'block'; this does the same thing as above but only for one style in a class
};
const closeModal = function () {
  // for closing the modal fn: stored it in varible
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// one class on more than one element (ALL 3 buttons have same class)
for (
  let i = 0;
  i < btnsOpenModal.length;
  i++ //same as array holding all 3 buttons
) {
  // console.log(btnsOpenModal[i].textContent);
  btnsOpenModal[i].addEventListener('click', openModal);
}
btnCloseModal.addEventListener('click', closeModal); // close modal on clicking X
overlay.addEventListener('click', closeModal); // close modal by clicking on overlay

document.addEventListener('keydown', function (event) {
  //keydown = as we hit any key down;keyup =lift our key of the keyboard ; keypress= continously fires until a key is pressed
  console.log('A key was pressed', event, event.key); // Event listened for all the keys
  // How do we know which key was pressed?
  // the information about which key was pressed will be stored in the (keydown)event that is going to occur as soon as any key is pressed.
  // And anytime that an event like this occurs JavaScript generates an object.And that object contains all the information about the event itself,
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    // if modal does not contain 'hidden' class
    closeModal();
  }
});
