// on sauvegarde l'url de la page et enregistre l'id s'il y en a un

// l'url de la page actuelle
const url = new URL(window.location.href);
// L'id présent dans l'url de la page
const id = url.searchParams.get("id");
// le numéro de la commande présent dans l'url de la page
const comm = url.searchParams.get("comm");


// Fonction pour vérifier le format nom/prénom/ville/adresse
const verifyname = (input) => {

  // La regex qui vérifie le bon format
  var validRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

  // Si l'entrée match la regex on retourne vrai sinon faux
  if (input.match(validRegex)) {

    return true;

  } else {

    return false;

  }
}

// Fonction pour vérifier le format mail
const verifyemail = (input) => {
  
  // La regex qui vérifie le bon format
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Si l'entrée match la regex on retourne vrai sinon faux
  if (input.match(validRegex)) {

    return true;

  } else {

    return false;

  }

}

// les fct et variable a exporter
module.exports = {
  url,
  id,
  comm,
  verifyemail,
  verifyname,
};