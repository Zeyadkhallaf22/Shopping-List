// function NewItem2(item) {
//   const li = document.createElement('li');
//   li.appendChild(document.createTextNode(item));

//   const button =createButton( 'remove-item btn-link text-red')
  
//   li.appendChild(button)

//   document.querySelector('.items').appendChild(li)
// }
// function createButton(classes) {
//    const button = document.createElement('button');
//   button.className = classes;

//   const icon = createIcon('fa-solid fa-xmark')
//   button.appendChild(icon)
//   return button;
// }
// function createIcon(classes) {
//   const icon = document.createElement('i')
//   icon.className = classes;
//   return icon;
// }

// NewItem2('cheese')
// NewItem2('lion cornflex')


const logo = document.querySelector('img')
// const onMouseup=()=>console.log('mouse up event')
// const onMousedown = () => console.log('mouse down event')
const onMouseover = () => logo.style.backgroundColor='purple'
const onMouseout = () => logo.style.backgroundColor='white'

// logo.addEventListener('mousedown', onMousedown)
// logo.addEventListener('mouseup', onMouseup)
logo.addEventListener('mouseover',onMouseover)
logo.addEventListener('mouseout',onMouseout)


// starting project
const itemForm=document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList=document.getElementById('item-list')
const Filter = document.getElementById('filter')
const clearBtn = document.getElementById('clear')
const formBtn=itemForm.querySelector('button')
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAdditemSubmit(e) {
  e.preventDefault();
  const input = itemInput.value;
  if (input ==='') {
    alert('please add an item')
    return;
  }
// check for edt mode
  if (isEditMode) {
  const itemToEdit= itemList.querySelector('.edit-mode')
    
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove();
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(input)) {
      alert('That item already exists!')
      return;
    }
  }


  addItemToDOM(input);

  // add item to localstorage
  addItemToStorage(input);

  // to make clear and filter return
  checkUI();
  itemInput.value = '';

}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item))

  const button =createButton( 'remove-item btn-link text-red')
  li.appendChild(button);

  itemList.appendChild(li)
  
}

function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  // add new item to array
  itemsFromStorage.push(item);

  // convert to json string AND SET TO STORAGE
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage
}
  
// prevent duplicate items
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
  // includes is method to check for item in that array
}


function onClickItem(e) {
  if (e.target.parentElement.classList
    .contains('remove-item')) {
    removeitem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
    }
  
}
function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i > Update Item'
  formBtn.style.backgroundColor = '#228B22';

  itemInput.value = item.textContent;
}

// activating removing icon 
function removeitem(item) {

  if (confirm('Are you sure?')) {
      // remove item from DOM
    item.remove();
    // remove item from storage
    removeItemFromStorage(item.textContent);

      checkUI();  }
}
  
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  // re-set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// making the clear button active
function clearitems(){
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  // clear from localstorage
  localStorage.removeItem('items');

  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach((item ) => {
    const itemName = item.firstChild.textContent
      .toLowerCase();
    
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  });
}

function checkUI() {
  itemInput.value = '';

  const items=itemList.querySelectorAll('li')
  if (items.length === 0) {
    clearBtn.style.display = 'none'
    Filter.style.display='none'
  } else {
    clearBtn.style.display = 'block'
    Filter.style.display='block'
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';


  isEditMode = false;
  
}

//adding data  


function initialize() {
  itemForm.addEventListener('submit', onAdditemSubmit)
  itemList.addEventListener('click', onClickItem)
  clearBtn.addEventListener('click', clearitems)
  Filter.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)

  checkUI();
}
initialize();