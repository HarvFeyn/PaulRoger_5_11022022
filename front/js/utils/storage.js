const _ = require("lodash");

const getCart = () => {
   const cart = JSON.parse(localStorage.getItem("panier")) === null ? [] : JSON.parse(localStorage.getItem("panier"));

   return cart;
};

const upsertCart = (item, quantityValue) => {
   const cart = getCart();
   const itemFound = _.find(cart, {"id": item.id, "color": item.color});

   if (typeof itemFound !== "undefined") {
       // only update quantity using quantityValue in param
       if (typeof quantityValue !== "undefined") {
           itemFound.quantity = parseInt(quantityValue);
       } else {
           // item exists then update by incrementing quantity with current value
           itemFound.quantity += item.quantity;
       }
   } else {
       // add new item to cart
       cart.push(item);
   }

   // update localStorage
   localStorage.setItem("panier", JSON.stringify(cart));
};

const deleteItem = query => {

    const cart = getCart();

    _.remove(cart, query);

    // update localStorage
    localStorage.setItem("panier", JSON.stringify(cart));
};

const getNbrItem = () => {
    let nbrItem = 0;
    const panier = getCart();
    for (let reserv of panier) {
        nbrItem += reserv.quantity;
    }
    return nbrItem;
};

const getPriceAll = () => {
    let priceAll = 0;
    const panier = getCart();
    for (let reserv of panier) {
        priceAll += ( reserv.price * reserv.quantity );
    }
    return priceAll;
};

const getProductToPost = () => {
    let productToPost = [];
    const panier = getCart();
    for (let reserv of panier) {
        productToPost.push(reserv.id)
    }
    return productToPost;
}

module.exports = {
   getCart,
   upsertCart,
   deleteItem,
   getNbrItem,
   getPriceAll,
   getProductToPost,
};