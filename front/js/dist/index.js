let utils = require("./utils");

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