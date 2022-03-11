require("../css/style.css");
require("../css/cart.css");
require("../css/confirmation.css");
require("../css/product.css");

// on sauvegarde l'url de la page et enregistre l'id s'il y en a un
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// On va chercher le panier en localstorage
let panierJson = [];
let panierLinea = localStorage.getItem("panier");

// si le panier importé de localstorage n'est pas nul on le stock dans la variable panierJson
if(panierLinea !== null){

  panierJson = JSON.parse(panierLinea);

}
else{
  console.log("pas de panier enregistré");
}

// javascript a executer sur la page index
if (url.href.includes("index.html")) {

  fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    return res.json();
  })
  .then(function(value) {

      // Pour chaque produit importé par la requette get on construit les éléments du DOM
      for (let item of value) {
        const newElt = document.createElement("a");
        newElt.href = "./product.html?id=" + item._id
        const eltarticle = document.createElement("article");
        const eltimg = document.createElement("img");
        eltimg.src = item.imageUrl;
        eltimg.alt = item.altTxt;
        const elttitre = document.createElement("h3");
        elttitre.setAttribute("class", "productName");
        elttitre.innerHTML = item.name;
        const eltp = document.createElement("p");
        eltp.setAttribute("class", "productDescription");
        eltp.innerHTML = item.description;
        let elt = document.getElementById("items");
        eltarticle.appendChild(eltimg);
        eltarticle.appendChild(elttitre);
        eltarticle.appendChild(eltp);
        newElt.appendChild(eltarticle);
        elt.appendChild(newElt);
      }
  })

  .catch(function(err) {
    console.log("erreur")
  });
  
}


// Javascript a executer sur la page product (on récupére l'id du produit dans l'url)
if (id !== null) {
  
  fetch("http://localhost:3000/api/products/" + id)
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

}


// Le javascript executer sur la page panier

if (url.href.includes("cart.html")) {

  fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    return res.json();
  })
  .then(function(value) {

    let quantityitemall = 0;
    let priceitemall = 0;
    let increm = 0;

    // On boucle sur toutes les commandes dans le panier
    for (let reservs of panierJson) {

      // On cherche le produit correspondant depuis la requette get a l'API pour avoir les spécificité du produit
      for(let product of value) {
        if(product._id == reservs[0]) {
          // On construit les élément du DOM correspondant a cette commande
          let localincrem = increm;
          quantityitemall += parseInt(reservs[2]);
          priceitemall += parseInt(reservs[2])*parseInt(product.price);

          let elt = document.getElementById("cart__items");

          const eltarticle = document.createElement("article");
          eltarticle.setAttribute("class", "cart__item");
          eltarticle.setAttribute("data-id", reservs[0]);
          eltarticle.setAttribute("data-color", reservs[1]);

          const divimg = document.createElement("div");
          divimg.setAttribute("class", "cart__item__img");
          const img = document.createElement("img");
          img.src = product.imageUrl;
          img.alt = product.altTxt;
          divimg.appendChild(img);

          eltarticle.appendChild(divimg);
          
          const divcontent = document.createElement("div");
          divcontent.setAttribute("class","cart__item__content");
          
          const divdesc = document.createElement("div");
          divdesc.setAttribute("class","cart__item__content__description");
          
          const producttitre = document.createElement("h2");
          producttitre.innerHTML = product.name;
          divdesc.appendChild(producttitre);

          const productcolor = document.createElement("p");
          productcolor.innerHTML = reservs[1];
          divdesc.appendChild(productcolor);

          const productprice = document.createElement("p");
          productprice.innerHTML = product.price + "€";
          divdesc.appendChild(productprice);
          
          divcontent.appendChild(divdesc);
          
          const divsettings = document.createElement("div");
          divsettings.setAttribute("class","cart__item__content__settings");

          const divquantity = document.createElement("div");
          divquantity.setAttribute("class","cart__item__content__settings__quantity");

          const producquantity = document.createElement("p");
          producquantity.innerHTML = "Qté : " + reservs[2];
          divquantity.appendChild(producquantity);

          const inputquantity = document.createElement("input");
          inputquantity.setAttribute("type","Number");
          inputquantity.setAttribute("class","itemQuantity");
          inputquantity.setAttribute("name","itemQuantity");
          inputquantity.setAttribute("min","1");
          inputquantity.setAttribute("max","100");
          inputquantity.setAttribute("value",reservs[2]);
          divquantity.appendChild(inputquantity);

          // On ajoute un eventlistener pour mettre a jour les quantité de ce produit de manière dynamique
          inputquantity.addEventListener('change', function(){
            
            producquantity.innerHTML = "Qté : " + inputquantity.value;
            panierJson[localincrem][2] = inputquantity.value;
            localStorage.setItem("panier", JSON.stringify(panierJson));

          });

          divsettings.appendChild(divquantity);

          const divdelete = document.createElement("div");
          divdelete.setAttribute("class","cart__item__content__settings__delete");

          const deleteitem = document.createElement("p");
          deleteitem.setAttribute("class","deleteItem");
          deleteitem.innerHTML = "Supprimer";
          divdelete.appendChild(deleteitem);

          // On ajoute un eventlistener pour supprimer cette commande de manière dynamique
          deleteitem.addEventListener("click", function(){
            
            panierJson.splice(localincrem,1);
            localStorage.setItem("panier", JSON.stringify(panierJson));
            divdelete.closest("section > article").remove;

          }); 

          divsettings.appendChild(divdelete);

          divcontent.appendChild(divsettings);

          eltarticle.appendChild(divcontent);

          elt.appendChild(eltarticle);
        }
      }

      increm++;

    }

    let qtydisplay = document.getElementById("totalQuantity");
    qtydisplay.innerHTML = quantityitemall;

    let pricedisplay = document.getElementById("totalPrice");
    pricedisplay.innerHTML = priceitemall;
    
  })
  .catch(function(err) {
    console.log("erreur")
  });

}

// On écoute le bouton pour finaliser la commande
let orderbtn = document.getElementById("order");
orderbtn.addEventListener("click", function(){

  console.log("commandé !")

});