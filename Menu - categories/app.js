const menu = [
  {
    id: 1,
    category: "breakfast",
    img: "./images/food1.jpg",
    name: "Buttermilk Pancakes",
    description: "Arranged with oriental food and maple syrup",
    price: "10.99$",
  },
  {
    id: 2,
    category: "breakfast",
    img: "./images/food2.jpg",
    name: "Wholegrain Sandwich",
    description: "Served with eggs, avocado and sliced lemon",
    price: "4.99$",
  },
  {
    id: 3,
    category: "drinks",
    img: "./images/food3.jpg",
    name: "Strawberry Milkshake",
    description: "Fresh strawberries with plant-based organic milk",
    price: "3.99$",
  },
  {
    id: 4,
    category: "dinner",
    img: "./images/food4.jpg",
    name: "Pizza",
    description: "Baked in oven, traditional Italian pizza",
    price: "14.49$",
  },
  {
    id: 5,
    category: "dinner",
    img: "./images/food5.jpg",
    name: "Pasta",
    description: "Fresh tomato sauce and parsley from our garden",
    price: "11.99$",
  },
  {
    id: 6,
    category: "dinner",
    img: "./images/food6.jpg",
    name: "Pumpkin Creme",
    description: "Dense and spicy pumpkin creme",
    price: "8.49$",
  },
  {
    id: 7,
    category: "dessert",
    img: "./images/food7.jpg",
    name: "Apple Pie",
    description: "Home-made charlotte with a pint of cinamonne",
    price: "3.99$/piece",
  },
  {
    id: 8,
    category: "breakfast",
    img: "./images/food8.jpg",
    name: "Fruit Salad",
    description: "Mix of season fruits and regional nuts",
    price: "5.49$",
  },
  {
    id: 9,
    category: "drinks",
    img: "./images/food9.jpg",
    name: "Lemonade",
    description: "Squished lemons, oranges and limes with a spoon of honey",
    price: "2.99$",
  },
  {
    id: 10,
    category: "drinks",
    img: "./images/food10.jpg",
    name: "Carrot Juice",
    description: "Fresh carrots, ginger and apricots seeds",
    price: "2.49$",
  },
  {
    id: 11,
    category: "dessert",
    img: "./images/food11.jpg",
    name: "Cheesecake",
    description: "Made with milk from local farm",
    price: "4.99$/piece",
  },
];

const meals = document.getElementById("meals");
const categories_div = document.querySelector("#categories");

document.addEventListener("DOMContentLoaded", () => {
  list(menu);
  selectors();
});

function list(items) {
  const display = items.map(function (el) {
    return `<article>
        <img src=${el.img} alt=${el.name} />
        <figcaption>${el.name}</figcaption>
        <p>${el.description}<span>${el.price}</span></p>
      </article>`;
  });
  meals.innerHTML = display.join("");
}

function selectors() {
  //add category buttons and assign filter function to them
  const categories = menu.reduce(
    function (arr, item) {
      if (!arr.includes(item.category)) arr.push(item.category);
      return arr;
    },
    ["all"]
  );
  categories.forEach((el) => {
    return (categories_div.innerHTML += `<button data-category=${el}>${el}</button`);
  });
  const btns = categories_div.querySelectorAll("button");
  btns.forEach(function (btn) {
    btn.addEventListener("click", filter);
  });
}

function filter(e) {
  if (e.currentTarget.dataset.category == "all") {
    list(menu);
  } else {
    const filtered = menu.filter(function (el) {
      return el.category == e.currentTarget.dataset.category;
    });
    list(filtered);
  }
}
