// on sauvegarde l'url de la page et enregistre l'id s'il y en a un

// l'url de la page actuelle
const url = new URL(window.location.href);
// L'id présent dans l'url de la page
const id = url.searchParams.get("id");
// le numéro de la commande présent dans l'url de la page
const comm = url.searchParams.get("comm");


/**
 * Fonction pour vérifier le format nom/prénom/ville/adresse
 * 
 * @param {string} input
 * @returns {Boolean}
 */
const verifyname = input => /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(input);


/**
 * Fonction pour vérifier le format mail
 * 
 * @param {string} input
 * @returns {Boolean}
 */
const verifyemail = (input) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input);

/**
 * Supprime le first child de l'élement envoyé en paramètre
 * 
 * @param {HTMLElement} el - target element html with all first child to remove
 */
const empty = el => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
};

// les fct et variable a exporter
module.exports = {
    url,
    id,
    comm,
    verifyemail,
    verifyname,
    empty
};