// URL de l'API Studio Ghibli
const apiUrl = "https://ghibliapi.vercel.app/films";

// Utilisation de la fonction fetch pour effectuer une requête GET
fetch(apiUrl)
  .then(response => {
    // Vérifier si la requête a réussi (code de statut 200)
    if (!response.ok) {
      throw new Error(`Échec de la requête. Code de statut : ${response.status}`);
    }
    // Convertir la réponse en JSON
    return response.json();
  })
  .then(films => {
    // Maintenant, vous pouvez travailler avec les données

   

    // Sélectionner les éléments HTML par leur identifiant
    const directorsList = document.getElementById("directors");
    const directorsfilmsList = document.getElementById("directorsfilmsList");
    const filmsByList = document.getElementById("filmsBy");

    // Regrouper les films par réalisateur
    let director_films = films.reduce(function (acc, Director) {
      if (!acc[Director.director]) acc[Director.director] = [];
      acc[Director.director].push(Director);
      return acc;
    }, {});

    // Extraire la liste des réalisateurs uniques
    let directorsData = [];
    for (let key in director_films) {
      directorsData.push(key);
    }

    // Insérer les films dans une liste avec mise en surbrillance pour un réalisateur spécifique
    const targetDirector = "Hayao Miyazaki";
    filmsByList.insertAdjacentHTML("beforeend", films.map(film =>
      `<li class="${film.director === targetDirector ? 'highlighted' : ''}">
        ${film.title} : ${film.director}
      </li>`
    ).join(""));

    // Insérer la liste des réalisateurs dans une liste non ordonnée
    directorsList.insertAdjacentHTML("beforeend", directorsData.map(director => `<li>${director}</li>`).join(""));

    // Insérer les films regroupés par réalisateur dans une liste imbriquée
    directorsfilmsList.insertAdjacentHTML("beforeend", directorsData.map(director =>
      `<li>
        ${director}
        <ul>
          ${director_films[director].map(movie => `<li>${movie.title}</li>`).join("")}
        </ul>
      </li>`
    ).join(""));
  })
  .catch(error => {
    console.error(`Erreur lors de la récupération des données : ${error.message}`);
  });
