require("../css/style.css");
require("../css/cart.css");
require("../css/confirmation.css");
require("../css/product.css");

// on sauvegarde l'url de la page et enregistre l'id s'il y en a un
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// javascript a executer sur la page index
if (url.href.includes("index.html")) {

  fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    console.log(res)
    return res.json()
  })
  .then(function(value) {
    console.log(value)
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
    console.log(res)
    return res.json()
  })
  .then(function(value) {
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
  })

  .catch(function(err) {
    console.log("erreur")
  });

}