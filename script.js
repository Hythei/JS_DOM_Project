//Write all the variables and such here and outside functions, unless the variable has a niche use, so they can be used globally.
let table = document.querySelector("#item_list")
let s_btn = document.querySelector("#submit_button")
let price_div = document.querySelector("#price_sum")
let item_div = document.querySelector("#item_sum")
let rem_item_div = document.querySelector("#remaining_items")

//The purpose of this function will be to take the input data from inputs "item_name" and "item_price", create a new row in the "item_list" -table and apply the values of said variables into appropriate cells.

//Write an expanded function that checks if the fields have values; name field must have something, price field must have something, error and cannot submit if not found. Validation and all that.
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


function insertItem(i_name, i_price){

    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    
    cell1.innerHTML = i_name;
    cell2.innerHTML = i_price;

    priceSum();
    updateRemainingItems();

    let delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.innerHTML = "Delete";
    delBtn.addEventListener("click", function(){
        table.deleteRow(row.rowIndex);
        priceSum();
        itemSum();
        updateRemainingItems();
    });

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

function updateRemainingItems(){
    const toggled = remItems();
    rem_item_div.textContent = itemSum() - toggled;
}


s_btn.addEventListener("click", submit_validation);


// TO DO
// Write a summary div and function that calculates the sum of items and their prices

// Write a function that enables the user to toggle an item (table row) when the item has been acquired.

// Write a deletion feature for individual items and the entire list
// function SomeDeleteRowFunction(o) {
//     //no clue what to put here?
//     var p=o.parentNode.parentNode;
//         p.parentNode.removeChild(p);
//    }

// Validation for forms

// Some CSS so it looks somewhat presentable

