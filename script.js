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

// making the clear button active
const clearBtn = document.querySelector('#clear')
clearBtn.onclick = function() { document.querySelector('ul').remove() }

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


function additem(e) {
  e.preventDefault();
  const input = itemInput.value;
  if (input ==='') {
    alert('please add an item')
    return
  }
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(input))

  const button =createButton( 'remove-item btn-link text-red')
  li.appendChild(button);

itemList.appendChild(li)
input.value=''
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


itemForm.addEventListener('submit',additem)





