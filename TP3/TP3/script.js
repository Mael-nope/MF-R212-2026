/*Données présentes pour la création des cartes*/
const projets = [
    { id: 1, titre: "Portfolio", description: "Mon site personnel responsive.", tags: ["HTML", "CSS"] },
    { id: 2, titre: "Blog tech", description: "Articles sur le développement web.", tags: ["JS", "API"] },
    { id: 3, titre: "App météo", description: "Application de météo en temps réel.", tags: ["JS", "API"] },
    { id: 4, titre: "Refonte asso", description: "Nouveau site pour une association.", tags: ["HTML", "CSS", "Figma"] },
    { id: 5, titre: "Mini-jeu", description: "Jeu de mémoire en JavaScript.", tags: ["JS", "DOM"] },
];


const conteneur = document.querySelector('#projets-liste');

/*Définit une fontion pour créer ou vider une carte*/
function afficherProjets(listeProjets) {
    conteneur.innerHTML = ''; // Vider le conteneur

    listeProjets.forEach((projet) => {
        const carte = document.createElement('article'); //Créer un nouvel élément
        carte.classList.add('carte');

        carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <div class="tags">
        ${projet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <button class="btn-supprimer" data-id="${projet.id}">Supprimer</button>
    `; //innerHTML implémente du HTML avec des variables

        conteneur.append(carte);
    });
}

/*Affiche les données sous formes de cartes*/
afficherProjets(projets);

/*Filtre grâce à des class et de tags*/
const boutonsFiltres = document.querySelectorAll('.filtre');

boutonsFiltres.forEach((btn) => {
    btn.addEventListener('click', () => {
        // 1. Mettre à jour le bouton actif
        document.querySelector('.filtre.active').classList.remove('active');
        btn.classList.add('active');

        // 2. Filtrer les données
        const tag = btn.dataset.tag;
        if (tag === 'tous') {
            afficherProjets(projets);
        } else {
            const projetsFiltres = projets.filter(p => p.tags.includes(tag));
            afficherProjets(projetsFiltres);
        }
    });
});

/*Permet de rendre un formulaire utilisable*/
const form = document.querySelector('#form-ajout');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    const titre = document.querySelector('#input-titre').value.trim();
    const description = document.querySelector('#input-desc').value.trim();
    const tagsTexte = document.querySelector('#input-tags').value.trim();

    if (!titre || !description) return; // Ne rien faire si vide

    const nouveauProjet = {
        id: projets.length + 1,
        titre: titre,
        description: description,
        tags: tagsTexte ? tagsTexte.split(',').map(t => t.trim()) : [],
    };

    projets.push(nouveauProjet);
    afficherProjets(projets);
    form.reset(); // Vider le formulaire
    sauvegarder(); //appelle la fonction pour sauvegarder
});

/*Créer une fonction pour sauvegarder sur le stockage local les projets créés dans le navigateur*/
function sauvegarder() {
    localStorage.setItem('projets', JSON.stringify(projets));
}

/*Créer une autre fonction qui charge les projets présents dans l'autre fonction*/
function charger() {
    const donnees = localStorage.getItem('projets');
    if (donnees) {
        // Remplacer le contenu du tableau (sans réassigner la variable)
        projets.length = 0;
        JSON.parse(donnees).forEach(p => projets.push(p));
    }
}

// Au chargement de la page
charger();
afficherProjets(projets);

/*Détecte le clic sur le bouton Supprimer*/
document.querySelectorAll('.btn-supprimer').forEach((btn) => {
    btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);

        //Supprime après le clic*/
        const index = projets.findIndex(p => p.id === id);
        projets.splice(index, 1);

        /*Met à jour l'affichage*/
        afficherProjets(projets);
        sauvegarder();
    });
});

const selectTri = document.querySelector('#tri');

selectTri.addEventListener('change', () => {
  const valeur = selectTri.value;

  if (valeur === 'az') {
  projets.sort((a, b) => a.titre.localeCompare(b.titre));
} else {
  projets.sort((a, b) => b.titre.localeCompare(a.titre));
}

afficherProjets(projets);
});