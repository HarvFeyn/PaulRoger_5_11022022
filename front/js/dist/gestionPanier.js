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

module.exports = {
    panierJson,
  };