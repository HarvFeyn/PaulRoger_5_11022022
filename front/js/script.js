require("../css/style.css");
require("../css/cart.css");
require("../css/confirmation.css");
require("../css/product.css");

let utils = require("./dist/utils");

// javascript a executer sur la page index
if (utils.url.href.includes("index.html")) {
  
  require("./dist/index");
  
};

// Javascript a executer sur la page product (on récupére l'id du produit dans l'url)
if (utils.id !== null) {
  
  require("./dist/product");

};

// Le javascript executer sur la page panier

if (utils.url.href.includes("cart.html")) {

  require("./dist/panier");

};