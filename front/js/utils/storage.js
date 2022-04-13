const _ = require("lodash");

/**
 * Fonction pour récupérer le panier depuis le local storage
 * 
 * @returns {Array}
 */
const getCart = () => {
   const cart = JSON.parse(localStorage.getItem("panier")) === null ? [] : JSON.parse(localStorage.getItem("panier"));

   return cart;
};

/**
 * Fonction pour mettre à jour le panier avec un nouvel item ou mettre à jour un item déjà existant
 * 
 * @param {object} item
 * @param {number} quantityValue
 */
const upsertCart = (item, quantityValue) => {

    // on récupére le panier depuis le local storage
   const cart = getCart();
   // on cherche si l'item que l'on veut mettre a jour est déjà présent dans la sauvegarde
   const itemFound = _.find(cart, {"id": item.id, "color": item.color});

   // On vérifie si l'item est déjà présent
   if (typeof itemFound !== "undefined") {
       //  si une quantité est précisée en entrée on la met à jour
       if (typeof quantityValue !== "undefined") {
           itemFound.quantity = parseInt(quantityValue);
       } else {
           // Si l'item existe on met a jour la quantitée en incrémentant la valeur
           itemFound.quantity += item.quantity;
       }
   } else {
       // Si l'item n'est pas déjà présent on le rajoute au panier
       cart.push(item);
   }

   // On met a jour le localstorage avec le nouveau panier
   localStorage.setItem("panier", JSON.stringify(cart));
};

/**
 * Fonction pour supprimer un item du panier
 * 
 * @param {object} query
 */
const deleteItem = query => {

    // on récupére le panier
    const cart = getCart();

    // On supprime l'item avec les données d'entré
    _.remove(cart, query);

    // on met a jour le localstorage avec le nouveau panier
    localStorage.setItem("panier", JSON.stringify(cart));
};

/**
 * Fonction pour compter le nombre d'item dans le panier
 * 
 * @returns {Number}
 */
const getNbrItem = () => {
    let nbrItem = 0;
    // On récupére le panier
    const panier = getCart();
    // Pour chaque item on ajouter la quantité
    for (let reserv of panier) {
        nbrItem += reserv.quantity;
    }
    // On retourne la quantité totale
    return nbrItem;
};

/**
 * Fonction pour calculer le prix total du panier
 * 
 * @returns {Number}
 */
const getPriceAll = () => {
    let priceAll = 0;
    // On récupére le panier
    const panier = getCart();
    // Pour chaque item on rajoute son prix multiplié par la quantité
    for (let reserv of panier) {
        priceAll += ( reserv.price * reserv.quantity );
    }
    // On retourne le prix total
    return priceAll;
};


/**
 * Fonction pour créer l'objet a envoyer a l'API
 * 
 * @returns {Object}
 */
const getProductToPost = () => {
    let productToPost = [];
    const panier = getCart();
    // Pour chaque item on rajoute l'id dans l'objet
    for (let reserv of panier) {
        productToPost.push(reserv.id)
    }
    // On retourne l'objet
    return productToPost;
}

// export des fct
module.exports = {
   getCart,
   upsertCart,
   deleteItem,
   getNbrItem,
   getPriceAll,
   getProductToPost,
};