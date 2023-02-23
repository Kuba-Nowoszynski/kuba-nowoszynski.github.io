let section = document.querySelector("section");
const item_input = document.getElementById("item");
const add_btn = document.getElementById("add");
const clear_btn = document.getElementById("clearAll");
const alert = document.querySelector(".alert");
const keys = Object.keys(localStorage).sort();
let saved = [];
let editFlag = false;
let editID;

if (keys.length > 0) {
  //display items from localStorage if there are any
  keys.forEach((key) => saved.push(localStorage[key])); //sort items
  for (const i of saved) {
    //add every item from localStorage
    section.insertAdjacentHTML("beforeend", "" + i);
  }
  //assign delete item function to del_btn and edit item function to edit_btn
  const articles = document.querySelectorAll("article");
  articles.forEach(function (n) {
    const c = document.getElementById(n.id); //select whole article tag with x id
    //delete
    const del_btn = c.querySelector(".del");
    del_btn.onclick = () => {
      n.parentNode.removeChild(n);
      localStorage.removeItem(`${n.id}`);
      //if everything deleted, hide clear all btn
      if (localStorage.length == 0) clear_btn.style.opacity = 0;
    };
    //edit
    const edit_btn = c.querySelector(".edit");
    edit_btn.onclick = () => {
      item_input.value = c.querySelector("span").innerText;
      add_btn.innerText = "Edit";
      editFlag = true;
      editID = n.id;
      editArticle = c;
    };
  });
  //show clearAll btn
  clear_btn.style.opacity = 1;
}

//add for Enter key
document.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    add();
  }
});

add_btn.addEventListener("click", add);

function add() {
  if (!editFlag && item_input.value != "") {
    clear_btn.style.opacity = 1; //show clear all btn
    let num = new Date(); //get individual number for item(article) id
    num = num.getTime().toString();
    //add item to the list
    section.insertAdjacentHTML(
      "beforeend",
      `<article id=${num}>
        <span>${item_input.value} </span
        ><button class="btn edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn del"><i class="fa-solid fa-trash"></i></button>
      </article>`
    );
    //add item to localStorage
    localStorage.setItem(
      num,
      `<article id=${num}>
        <span>${item_input.value} </span
        ><button class="btn edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn del"><i class="fa-solid fa-trash"></i></button>
      </article>`
    );
    item_input.value = ""; //clear input box
    const current = document.getElementById(num); //select whole article tag with x id
    //assign delete item function to del_btn
    const del_btn = current.querySelector(".del");
    del_btn.onclick = () => {
      current.parentNode.removeChild(current);
      localStorage.removeItem(num);
      //if everything deleted, hide clear all btn
      if (localStorage.length == 0) clear_btn.style.opacity = 0;
    };
    //assign edit item function to edit_btn - put item to the input box
    const edit_btn = current.querySelector(".edit");
    edit_btn.onclick = () => {
      item_input.value = current.querySelector("span").innerText;
      add_btn.innerText = "Edit";
      editFlag = true;
      editArticle = current;
      editID = num;
    };
    //alert for added item
    alert.innerText = "Item succesfully added";
    toggleClass("green", 0);
    toggleClass("opacity", 30);
    toggleClass("opacity", 700);
    toggleClass("green", 1300);
    setTimeout(item_input.click(), 500);
  } //submit edited item and change its value in LocalStorage
  else if (editFlag) {
    const span = editArticle.querySelector("span");
    span.innerText = item_input.value;
    localStorage[editID] = editArticle.outerHTML;
    add_btn.innerText = "Add to the list";
    item_input.value = "";
    editFlag = false;
    //alert for edited item
    alert.innerText = "Item succesfully edited";
    toggleClass("green", 0);
    toggleClass("opacity", 30);
    toggleClass("opacity", 700);
    toggleClass("green", 1300);
  } //alert for empty string
  else {
    alert.innerText = "Please type in an item";
    toggleClass("red", 0);
    toggleClass("opacity", 30);
    toggleClass("opacity", 700);
    toggleClass("red", 1300);
  }
}

//clear all items
clear_btn.onclick = () => {
  //remove all items from HTML
  const articles = document.querySelectorAll("article");
  articles.forEach(function (n) {
    const c = document.getElementById(n.id);
    c.parentNode.removeChild(c);
  });
  //clear localStorage and hide the clear All button
  localStorage.clear();
  clear_btn.style.opacity = 0;
};

//toggle class for alert
const toggleClass = function (klasa, time) {
  setTimeout(function () {
    alert.classList.toggle(klasa);
  }, time);
};
