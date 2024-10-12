//Write all the variables and such here and outside functions, unless the variable has a niche use, so they can be used globally.
let table = document.querySelector("#item_list")
let s_btn = document.querySelector("#submit_button")
let price_div = document.querySelector("#price_sum")
let item_div = document.querySelector("#item_sum")
let rem_item_div = document.querySelector("#remaining_items")

// This event listener will call the TableFromLocalStorage function when the page is loaded, so the table will be populated with the data from the local storage.
document.addEventListener("DOMContentLoaded", function(){
    TableFromLocalStorage();
});

//The purpose of this function will be to take the input data from inputs "item_name" and "item_price", create a new row in the "item_list" -table and apply the values of said variables into appropriate cells.
function submit_validation(){
    let i_name = document.querySelector("#item_name").value;
    let i_price = document.querySelector("#item_price").value;

    if (i_name === "" || i_price === "" || isNaN(i_price) ){
        alert("Please enter a valid iten name and price.")
        return;
    }

    insertItem(i_name, i_price);
    itemSum();
    
}

// this function will insert the item into the table, and also create the delete button and checkbox for the item.
function insertItem(i_name, i_price){

    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    
    cell1.innerHTML = i_name;
    cell2.innerHTML = i_price;

    priceSum();
    itemSum();
    updateRemainingItems();

    let delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.innerHTML = "Delete";
    delBtn.addEventListener("click", function(){ // This function deletes the row and updates the price sum and item sum.
        table.deleteRow(row.rowIndex);
        priceSum(); // Updates the price sum after deleting
        itemSum(); // Updates the item sum after deleting
        updateRemainingItems(); // Updates the remaining items after deleting
        TableLocalStorage(); // Saves after deleting
    });

    // This function toggles the line-through style for the item name and price.
    let toggleBtn = document.createElement("input");
    toggleBtn.type = "checkbox";
    toggleBtn.innerHTML = "";
    toggleBtn.addEventListener("change", function(){
        if (toggleBtn.checked){
            cell1.style.textDecoration = "line-through";
            cell2.style.textDecoration = "line-through";
        } else {
            cell1.style.textDecoration = "none"
            cell2.style.textDecoration = "none"
        }
        updateRemainingItems();
        TableLocalStorage(); // Saves after toggling
    });


    cell3.appendChild(delBtn);
    cell4.appendChild(toggleBtn);
    document.querySelector("#item_name").value="";
    document.querySelector("#item_price").value="";
}   
 
// This function calculates the total prices of all items in the table.
function priceSum(){
    let total = 0;

    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
        const priceCell = row.cells[1];
        if (priceCell) {
            const price = parseFloat(priceCell.textContent);
            if (!isNaN(price)) {
                total += price;
            }
        }
    });

    price_div.textContent = total + " p";

};

// This function calculates the total amount of items in the table.
function itemSum(){
    let i_total = 0;
    const rows = table.querySelectorAll("tr")
    
    rows.forEach((row, index) =>{
        if (index > 0){
            const itemCell = row.cells[0];
            if (itemCell) {
                i_total++;
            }
        }

    });

    item_div.textContent = i_total
    return i_total;
};

// This function calculates the amount of items that are checked in the table.
function remItems(){
    let toggled = 0;
    const rows = table.querySelectorAll("tr")

    rows.forEach(row => {
        const checkbox = row.querySelector("input[type='checkbox']");

        if (checkbox && checkbox.checked) {
            toggled += 1;
        }
    });

    return toggled;

}

// This function calculates the amount of items that are not checked in the table.
function updateRemainingItems(){
    const toggled = remItems();
    rem_item_div.textContent = itemSum() - toggled;
}


// Turns the table rows into a JSON string. There's literally no other way to save this much information into local storage without using other libraries.
function TableLocalStorage(){
    const rows = table.querySelectorAll("tr");
    const tableData = [];

    rows.forEach((row, index) => {
        if (index > 0) { //Skips the header row
        const cells = row.querySelectorAll("td");
        const rowData = {
            name: cells[0].textContent,
            price: cells[1].textContent,
            checked: cells[3].querySelector("input[type='checkbox']").checked
        };
        tableData.push(rowData);    
        }
    });
    localStorage.setItem("tableData", JSON.stringify(tableData));
}

function TableFromLocalStorage(){
    const tableData = JSON.parse(localStorage.getItem("tableData"));

    if (tableData) {
            tableData.forEach(rowData => {
                insertItem(rowData.name, rowData.price, rowData.checked);
            });
        }
}   

// Per its name, this function will delete all items in the table and also remove the local storage data.
function deleteAllItems() {
    const rows = table.querySelectorAll("tr");
    rows.forEach((row, index) => {
        if (index > 0) {
            table.deleteRow(row.rowIndex);
        }
    });

    localStorage.removeItem("tableData");

    updateRemainingItems();
    priceSum();
}

// The magic behind the submit button. It will call the submit_validation function and update the remaining items.
s_btn.addEventListener("click", function(){
    submit_validation();
    updateRemainingItems();
    TableLocalStorage();
}
);

document.getElementById("delete_all_btn").addEventListener("click", deleteAllItems);




