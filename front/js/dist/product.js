let utils = require("../utils/utils");
const storage = require("../utils/storage");

// La requéte pour récupérer le produit correspondant a l'id présent dans l'url
fetch("http://localhost:3000/api/products/" + utils.id)
  .then(function(res) {
    return res.json();
  })
  .then(function(value) {

    // On construit les éléments du DOM pour le produits spécifique
    const newEltimage = document.createElement("img");
    newEltimage.src=value.imageUrl;
    newEltimage.alt=value.altTxt;
    let eltimage = document.getElementsByClassName("item__img");
    eltimage[0].appendChild(newEltimage);

    let elttitle = document.getElementById("title");
    elttitle.innerHTML = value.name;
    
    let eltprice = document.getElementById("price");
    eltprice.innerHTML = value.price;

    let eltdesc = document.getElementById("description");
    eltdesc.innerHTML = value.description;

    let eltcolors = document.getElementById("colors");
    for (let color of value.colors){
      const newEltcolor = document.createElement("option");
      newEltcolor.value = color;
      newEltcolor.innerHTML =  color;
      eltcolors.appendChild(newEltcolor);
    }
    return value;
  })
  .then(function(value) {

    // On écoute l'évenement sur le bouton pour ajouter des articles au panier

    let eltbtn = document.getElementById("addToCart");

    eltbtn.addEventListener('click', function(event) {
      event.preventDefault();
      let iditem = value._id;
      let color = document.getElementById("colors").value;
      let quantity = parseInt(document.getElementById("quantity").value);
      let price = parseInt(document.getElementById("price").textContent);

      // On construit l'objet à sauvegrarder dans le localstorage
      const data = {
        id: iditem,
        color: color,
        quantity: quantity,
        price: price
      }

      // On appel la fonction qui met a jour le local storage
      storage.upsertCart(data);

    });
  })

  .catch(function(err) {
    console.log("erreur")
  });