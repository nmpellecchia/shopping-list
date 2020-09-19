const addItems = document.querySelector('.add-items');
const itemList = document.querySelector('.items');
const deleteButton = document.querySelector('.delete');
const items = [];

function addItem(e) {
    e.preventDefault(); // Stops the page from refreshing;
    
    const name = this.querySelector("[name=item]").value;
    const newItem = {
        name,
        checked: false
    };

    items.push(newItem);
    addToList(items, itemList);
    this.reset();
};

function addToList(products, productList) {
    productList.innerHTML = products.map((product, i) => {
        return `<li>
            <input type="checkbox" data-index=${i} id="item${i}" ${product.checked ? 'checked' : ''} />
            <label for="item${i}">${product.name}</label>
            <button class="delete">X</button>
        </li>
        `;
    }).join('');
};

function deleteFromList() {
    const itemToRemove = this.parentElement;
    itemToRemove.remove();
};

function toggleChecked(e) {
    if (!e.target.matches('input')) return; //skip function unless it's an input;
    const index = e.target.dataset.index;
    console.log(index);
};

addItems.addEventListener('submit', addItem);
deleteButton.addEventListener('click', deleteFromList);
itemList.addEventListener('click', toggleChecked);