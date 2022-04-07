let utils = require("../utils/utils");
const storage = require("../utils/storage");

let panierJson = storage.getCart();

const updatPriceAll = () => {
  let qtydisplay = document.getElementById("totalQuantity");
  qtydisplay.innerHTML = storage.getNbrItem();
  let pricedisplay = document.getElementById("totalPrice");
  pricedisplay.innerHTML = storage.getPriceAll();
}

fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    return res.json();
  })
  .then(function(value) {

    // On boucle sur toutes les commandes dans le panier
    for (let reservs of panierJson) {
      
      // On cherche le produit correspondant depuis la requette get a l'API pour avoir les spécificité du produit
      for(let product of value) {
        
        if(product._id == reservs.id) {
          // On construit les élément du DOM correspondant a cette commande
          
          let elt = document.getElementById("cart__items");

          const eltarticle = document.createElement("article");
          eltarticle.setAttribute("class", "cart__item");
          eltarticle.setAttribute("data-id", reservs.id);
          eltarticle.setAttribute("data-color", reservs.color);

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
          productcolor.innerHTML = reservs.color;
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
          producquantity.innerHTML = "Qté : ";
          divquantity.appendChild(producquantity);

          const inputquantity = document.createElement("input");
          inputquantity.setAttribute("type","Number");
          inputquantity.setAttribute("class","itemQuantity");
          inputquantity.setAttribute("name","itemQuantity");
          inputquantity.setAttribute("min","1");
          inputquantity.setAttribute("max","100");
          inputquantity.setAttribute("value",reservs.quantity);
          divquantity.appendChild(inputquantity);

          

          // On ajoute un eventlistener pour mettre a jour les quantité de ce produit de manière dynamique
          inputquantity.addEventListener('change', event => {

            const article = event.target.closest("article");
            const id = article.dataset.id;
            const color = article.dataset.color;

            storage.upsertCart({id, color}, inputquantity.value);

            updatPriceAll();
          });

          divsettings.appendChild(divquantity);

          const divdelete = document.createElement("div");
          divdelete.setAttribute("class","cart__item__content__settings__delete");

          const deleteitem = document.createElement("p");
          deleteitem.setAttribute("class","deleteItem");
          deleteitem.innerHTML = "Supprimer";
          divdelete.appendChild(deleteitem);

          // On ajoute un eventlistener pour supprimer cette commande de manière dynamique
          deleteitem.addEventListener("click", event => {

            const article = event.target.closest("article");
            const id = article.dataset.id;
            const color = article.dataset.color;

            storage.deleteItem({id, color});

            updatPriceAll();
            deleteitem.closest("article").remove();
          }); 

          divsettings.appendChild(divdelete);

          divcontent.appendChild(divsettings);

          eltarticle.appendChild(divcontent);

          elt.appendChild(eltarticle);
        }
      }
      
    }
    
    updatPriceAll();
    
  })
  .catch(function(err) {
    console.log("erreur")
  });

// On écoute le bouton pour finaliser la commande
let orderbtn = document.getElementById("order");
orderbtn.addEventListener("click", event => {

  event.preventDefault();
  let isvalide = true;
  

  if(!utils.verifyname(document.getElementById("firstName").value)){
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez remplir un prénom valide";
    isvalide = false;
  }

  if(!utils.verifyname(document.getElementById("lastName").value)){
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez remplir un nom valide";
    isvalide = false;
  }

  if(!utils.verifyname(document.getElementById("address").value)){
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez remplir une adresse valide";
    isvalide = false;
  }

  if(!utils.verifyname(document.getElementById("city").value)){
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez remplir ville valide";
    isvalide = false;
  }
  
  if(!utils.verifyemail(document.getElementById("email").value)){
    document.getElementById("emailErrorMsg").innerHTML = "Veuillez remplir une adresse email valide";
    isvalide = false;
  }

  if(isvalide){

    const productsToPost = storage.getProductToPost();

    let objectPost = {
      contact: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      },
      products: productsToPost
    };
    
    let jsonobj = JSON.stringify(objectPost);
  
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonobj
    })
    .then(res => res.json()) 
    .then(function(res) {
      console.log(JSON.stringify(res));
      window.location.href = "./confirmation.html?comm=" + res.orderId;
    })
    .catch(function(err) {
      console.log("non")
      console.log(err)
    });
  }

});