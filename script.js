//Write all the variables and such here and outside functions, unless the variable has a niche use, so they can be used globally.
let table = document.querySelector("#item_list")
let s_btn = document.querySelector("#submit_button")

//The purpose of this function will be to take the input data from inputs "item_name" and "item_price", create a new row in the "item_list" -table and apply the values of said variables into appropriate cells.

//Write an expanded function that checks if the fields have values; name field must have something, price field must have something, error and cannot submit if not found. Validation and all that.
function submit_validation(){
    let i_name = document.querySelector("#item_name").value;
    let i_price = document.querySelector("#item_price").value;

    if (i_name === ""){
        alert("Please enter an Item Name!")
        return;
    }
    if (i_price === "" || isNaN(i_price)){
        alert("A price should be declared in valid numerical values!")
        return;
    }

    insertItem(i_name, i_price);
}


function insertItem(i_name, i_price){

    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    
    cell1.innerHTML = i_name;
    cell2.innerHTML = i_price;

    let delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.innerHTML = "Delete";
    delBtn.addEventListener("click", function(){
        table.deleteRow(row.rowIndex);
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
    });


    cell3.appendChild(delBtn);
    cell4.appendChild(toggleBtn);
    document.querySelector("#item_name").value="";
    document.querySelector("#item_price").value="";
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

