// on sauvegarde l'url de la page et enregistre l'id s'il y en a un
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const comm = url.searchParams.get("comm");

const verifyname = (input) => {

  var validRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

  if (input.match(validRegex)) {

    return true;

  } else {

    return false;

  }
}

const verifyemail = (input) => {
  
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {

    return true;

  } else {

    return false;

  }

}

module.exports = {
  url,
  id,
  comm,
  verifyemail,
  verifyname,
};