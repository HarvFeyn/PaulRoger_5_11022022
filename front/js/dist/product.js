let utils = require("./utils");
let panier = require("./gestionPanier");
let panierJson = panier.panierJson;

console.log(panierJson)

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
      let quantity = document.getElementById("quantity").value;

      let alreadyReserv = 0;

      // On met a jour la nouvelle valeur de quantité de ce produit s'il est déja dans le localstorage
      for (let reservs of panierJson) {
        if (reservs[0] == iditem && reservs[1] == color) {
          reservs[2] =  parseInt(reservs[2]) + parseInt(quantity);
          alreadyReserv=1;
        }
      }

      // Si le produit n'est pas encore dans le local storage on le rajoute avec la nouvelle valeur de quantité
      if(alreadyReserv == 0){
        let newitem = [iditem,color,quantity];
        panierJson.push(newitem);
      }
      
      localStorage.setItem("panier", JSON.stringify(panierJson));
    });
  })

  .catch(function(err) {
    console.log("erreur")
  });