// on sauvegarde l'url de la page et enregistre l'id s'il y en a un
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

module.exports = {
  url,
  id,
};