const utils = require("../utils/utils");
const storage = require("../utils/storage");

// On appel la fonction pour récupérer le panier depuis le localstorage
const panierJson = storage.getCart();

// Fonction pour mettre à jour l'afficage du prix et quantité d'item total
const updatPriceAll = async () => {
  const qtydisplay = document.getElementById("totalQuantity");
  // On appel la fonction qui compte le nombre d'item et on met a jour le DOM
  qtydisplay.innerHTML = storage.getNbrItem();
  const pricedisplay = document.getElementById("totalPrice");
  // On appel la fonction qui compte le prix total et on met a jour le DOM
  pricedisplay.innerHTML = await storage.getPriceAll();
}

fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    return res.json();
  })
  .then(function(value) {

    // On boucle sur toutes les commandes dans le panier
    for (const reservs of panierJson) {
      
      // On cherche le produit correspondant depuis la requette get a l'API pour avoir les spécificité du produit
      for(const product of value) {
        
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

            // On appel la fonction qui met a jour le panier dans le local storage
            storage.upsertCart({id, color}, inputquantity.value);

            // On appel la fonction pour mettre à jour les quantités et prix
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

            // On appel la fonction qui supprime un item du panier dans le localstorage
            storage.deleteItem({id, color});

            // On appel la fonction pour mettre à jour les quantités et prix
            updatPriceAll();

            // on met à jour le DOM en retirant l'article supprimé
            deleteitem.closest("article").remove();
          }); 

          divsettings.appendChild(divdelete);

          divcontent.appendChild(divsettings);

          eltarticle.appendChild(divcontent);

          elt.appendChild(eltarticle);
        }
      }
      
    }
    
    // On appel la fonction pour mettre à jour les quantités et prix
    updatPriceAll();
    
  })
  .catch(function(err) {
    console.log("erreur")
  });

  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  
  /**
   * Supprime les messages d'erreur du dom
   */
  const removeErrorsMsg = () => {
      for (const element of[firstNameErrorMsg, lastNameErrorMsg, addressErrorMsg, cityErrorMsg, emailErrorMsg]) {
          utils.empty(element);
      }
  };

  // On écoute le bouton pour finaliser la commande
  let orderbtn = document.getElementById("order");
  orderbtn.addEventListener("click", event => {
  
      // On empéche le fonctionnement normal du bouton pour éviter une actualisation de la page
      event.preventDefault();
      let isvalide = true;
  
      removeErrorsMsg();
  
      // On vérifie tous les paramètres entré dans le formulaire pour qu'ils correspondent bien aux formats attendu
      if (!utils.verifyname(document.getElementById("firstName").value)) {
          firstNameErrorMsg.innerHTML = "Veuillez remplir un prénom valide";
          isvalide = false;
      }
  
      if (!utils.verifyname(document.getElementById("lastName").value)) {
          lastNameErrorMsg.innerHTML = "Veuillez remplir un nom valide";
          isvalide = false;
      }
  
      if (!utils.verifyname(document.getElementById("address").value)) {
          addressErrorMsg.innerHTML = "Veuillez remplir une adresse valide";
          isvalide = false;
      }
  
      if (!utils.verifyname(document.getElementById("city").value)) {
          cityErrorMsg.innerHTML = "Veuillez remplir ville valide";
          isvalide = false;
      }
  
      if (!utils.verifyemail(document.getElementById("email").value)) {
          emailErrorMsg.innerHTML = "Veuillez remplir une adresse email valide";
          isvalide = false;
      }

      const productsToPost = storage.getProductToPost();

      if (productsToPost.length > 0) {
  
          // On construit l'objet a envoyer a l'API

          if (productsToPost) {

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
    
            // On transforme l'objet au format JSON pour l'envois a l'API
            let jsonobj = JSON.stringify(objectPost);
          
          
                // La requéte a l'API pour envoyer la commande
              fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: jsonobj
            })
            .then(res => res.json())
            .then(res => {
                // On supprime le localstorage pour vider le panier
                localStorage.clear();
                // Si la requéte est bien passée on renvoi vers la page de validation de commande avec le numéro de commande en url
                window.location.href = "./confirmation.html?comm=" + res.orderId;
            })
            .catch(err => {
                console.log(err)
            });
          }

      }
  
  });