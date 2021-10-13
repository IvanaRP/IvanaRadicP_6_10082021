// function DropDown(dropDown) {
//     const [toggler, menu] = dropDown.children;
    
//     const handleClickOut = e => {
//       if(!dropDown) {
//         return document.removeEventListener('click', handleClickOut);
//       }
      
//       if(!dropDown.contains(e.target)) {
//         this.toggle(false);
//       }
//     };
    
//     const setValue = (item) => {
//       const val = item.textContent;
//       toggler.textContent = val;
//       this.value = val;
//       this.toggle(false);
//       dropDown.dispatchEvent(new Event('change'));
//       toggler.focus();
//     }
    
//     const handleItemKeyDown = (e) => {
//       e.preventDefault();
  
//       if(e.keyCode === 38 && e.target.previousElementSibling) { // up
//         e.target.previousElementSibling.focus();
//       } else if(e.keyCode === 40 && e.target.nextElementSibling) { // down
//         e.target.nextElementSibling.focus();
//       } else if(e.keyCode === 27) { // escape key
//         this.toggle(false);
//       } else if(e.keyCode === 13 || e.keyCode === 32) { // enter or spacebar key
//         setValue(e.target);
//       }
//     }
  
//     const handleToggleKeyPress = (e) => {
//       e.preventDefault();
  
//       if(e.keyCode === 27) { // escape key
//         this.toggle(false);
//       } else if(e.keyCode === 13 || e.keyCode === 32) { // enter or spacebar key
//         this.toggle(true);
//       }
//     }
    
//     toggler.addEventListener('keydown', handleToggleKeyPress);
//     toggler.addEventListener('click', () => this.toggle());
//     [...menu.children].forEach(item => {
//       item.addEventListener('keydown', handleItemKeyDown);
//       item.addEventListener('click', () => setValue(item));
//     });
    
//     this.element = dropDown;
    
//     this.value = toggler.textContent;
    
//     this.toggle = (expand = null) => {
//       expand = expand === null
//         ? menu.getAttribute('aria-expanded') !== 'true'
//         : expand;
  
//       menu.setAttribute('aria-expanded', expand);
      
//       if(expand) {
//         toggler.classList.add('active');
//         menu.children[0].focus();
//         document.addEventListener('click', handleClickOut);
//         dropDown.dispatchEvent(new Event('opened'));
//       } else {
//         toggler.classList.remove('active');
//         dropDown.dispatchEvent(new Event('closed'));
//         document.removeEventListener('click', handleClickOut);
//       }
//     }
//   }
  
//   const dropDown = new DropDown(document.querySelector('.dropdown'));
    
//   dropDown.element.addEventListener('change', e => {
//     console.log('changed', dropDown.value);
//   });
  
//   dropDown.element.addEventListener('opened', e => {
//     console.log('opened', dropDown.value);
//   });
  
//   dropDown.element.addEventListener('closed', e => {
//     console.log('closed', dropDown.value);
//   });
  
//   dropDown.toggle();




function toggleClass(elem,className){
  if (elem.className.indexOf(className) !== -1){
    elem.className = elem.className.replace(className,'');
  }
  else{
    elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
  }

  return elem;
}

function toggleDisplay(elem){
  const curDisplayStyle = elem.style.display;			

  if (curDisplayStyle === 'none' || curDisplayStyle === ''){
    elem.style.display = 'block';
  }
  else{
    elem.style.display = 'none';
  }

}

function toggleMenuDisplay(e){
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector('.menu');
  const icon = dropdown.querySelector('.fa-angle-right');

  toggleClass(menu,'hide');
  toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
  toggleClass(e.target.parentNode, 'hide');			

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('.dropdown .title');
  const icon = document.querySelector('.dropdown .title .fa');


  titleElem.textContent = newValue;
  titleElem.appendChild(icon);

  //trigger custom event
  document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
    //setTimeout is used so transition is properly shown
  setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTitleChange(e){
  const result = document.getElementById('result');

  result.innerHTML = 'The result is: ' + e.target.textContent;
}

//get elements
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);
 