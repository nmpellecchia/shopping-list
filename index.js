const addItems = document.querySelector('.add-items');
const itemList = document.querySelector('.items');
const clearButton = document.querySelector('.clear');
const items = JSON.parse(localStorage.getItem('items')) || [];
let lastItemChecked;

function addItem(e) {
    e.preventDefault(); // Stops the page from refreshing;
    
    const name = this.querySelector("[name=item]").value;
    const newItem = {
        name,
        checked: false
    };

    items.push(newItem);
    addToList(items, itemList);
    saveToLocalStorage(items);
    
    this.reset();
};

function addToList(products = [], productList) {
    productList.innerHTML = products.map((product, i) => {
        return `<li>
            <input type="checkbox" data-index=${i} id="item${i}" ${product.checked ? 'checked' : ''} />
            <label for="item${i}">${product.name}</label>
            <button class="delete">X</button>
        </li>
        `;
    }).join('');
};

function deleteFromList(e) {
    const i = e.target.parentElement.firstElementChild.dataset.index;
    const itemToRemove = items[i];
    items.splice(i, 1);
    
    saveToLocalStorage(items);
    addToList(items, itemList);
};

function saveToLocalStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
};

function handleClick(e) {
  if(e.target.matches('.delete')) deleteFromList(e);
  if(e.target.matches('input')) toggleChecked(e);

};

function toggleChecked(e) {
    const index = e.target.dataset.index;
    items[index].checked = !items[index].checked;
    //Toggle multiple if Ctrl + Click;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let inBetween = false;
    if(e.ctrlKey && e.target.checked) {
        checkboxes.forEach(checkbox => {
            if(checkbox === e.target || checkbox === lastItemChecked) {
                inBetween = !inBetween;
            };
            if(inBetween) {
            i=checkbox.dataset.index;
            items[i].checked = true;
            checkbox.checked = true;
            };
        });
    }
    lastItemChecked = e.target;
    
    saveToLocalStorage(items);
};

function clearList() {
    localStorage.removeItem('items');
    window.location.reload() // Without reloading the page next item you add will restore all items; 
}

addToList(items, itemList);

addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', handleClick);
clearButton.addEventListener('click', clearList);
