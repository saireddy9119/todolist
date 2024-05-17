//ADDING NEW ITEMS IN TODO LIST
function addItem() {
    let todoValue = document.getElementById("new-todo").value;
    //CHECKING WHETHER INPUT FIELD IS EMPTY OR NOT
    if (todoValue.length == 0) {
        alert("Please Enter A Task");
    } else {
        let id = Date.now().toString(36);
        let newObject = { name: todoValue, checked: false, id: id }
        addItemToDOM(newObject);

        let items = JSON.parse(localStorage.getItem("todos")) || [];
        items.push(newObject);
        saveItemsToStorage(items);
    }

    document.getElementById("new-todo").value = "";
}

//ADDING TO DOCUMENT OBJECT MODEL
function addItemToDOM(newObject) {
    let todoValue = newObject.name;
    let newItemDiv = document.createElement("div");
    newItemDiv.className = "new-item";
    newItemDiv.id = newObject.id;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.name = "todo-checkbox";
    checkbox.onclick = function () {
        selectOrUnselect(newObject.id, checkbox.checked);
    }
    checkbox.checked = newObject.checked;

    let textDiv = document.createElement("div");
    textDiv.textContent = todoValue;
    textDiv.className = "todo-text";

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () { deleteItem(newObject.id) };

    newItemDiv.append(checkbox);
    newItemDiv.append(textDiv);
    newItemDiv.append(deleteButton);

    let containerDiv = document.getElementById("new-items");
    containerDiv.append(newItemDiv);
}

//SAVING ITEMS OF TODO LIST INTO LOCAL STORAGE
function saveItemsToStorage(items) {
    localStorage.setItem("todos", JSON.stringify(items));
}

//LOADING ITEMS WHEN WE REFRESH THE PAGE
function loadItemsFromStorage() {
    let storedItems = JSON.parse(localStorage.getItem("todos")) || [];
    storedItems.forEach((item) => addItemToDOM(item));
}

//CHECK WHETHER CHECKBOX IS SELECTED OR NOT
function selectOrUnselect(id, checked) {
    let items = JSON.parse(localStorage.getItem("todos")) || [];
    items.find(item => item.id == id).checked = checked;
    saveItemsToStorage(items);
}

//WHEN WE REFRESH OR LOAD THE PAGE IT FETCHES STORED VALUES
window.onload = loadItemsFromStorage;

//DELETING ITEMS IN TODO LIST
function deleteItem(id) {
    document.getElementById("new-items").querySelector("#" + id).remove();

    let items = JSON.parse(localStorage.getItem("todos")) || [];
    items = items.filter((item) => item.id !== id);
    saveItemsToStorage(items);
}