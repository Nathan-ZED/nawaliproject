const radioTerrain = document.querySelector('#terrain');
const radioConstruction = document.querySelector('#construction');
const radioTerrainEtConstruction = document.querySelector('#terrain_and_construct')
const typeDeMaison = document.querySelector('#house_type').parentElement;
const budgetTerrain = document.querySelector('.input-block.terrain');
const budgetConstruction = document.querySelector('.input-block.construction');
const copyrights = document.querySelector('#copyrights');
const actualYear = new Date().getFullYear();
const form = document.querySelector('#sheetdb-form');
const inputs = form.querySelectorAll('input')
const successMsg = form.querySelector('span')
const host = window.location.host
const protocol = window.location.protocol


//Mise à jour automatique de l'année des copyrights du footer
copyrights.textContent = `Copyrights ©${actualYear}`


//Fonction permettant d'afficher le bon budget pour terrain
//et masquer le type de maison

const changeForTerrain = () => {
    if(radioTerrain.checked) {
        budgetTerrain.classList.contains('d-none')
            ? budgetTerrain.classList.remove('d-none')
            : null
        !budgetConstruction.classList.contains('d-none')
            ? budgetConstruction.classList.add('d-none')
            : null 
        !typeDeMaison.classList.contains('d-none')
            ? typeDeMaison.classList.add('d-none')
            : null 
        
    }
}

//Fonction permettant d'afficher le bon budget pour construction
//et afficher le type de maison

const changeForConstruction = () => {
    if(radioConstruction.checked) {
        checkClass(typeDeMaison, 'd-none');
        checkClass(budgetConstruction, 'd-none')
        !budgetTerrain.classList.contains('d-none')
            ? budgetTerrain.classList.add('d-none')
            : null
    }
}

const showAll = () => {
    checkClass(typeDeMaison, 'd-none')
    checkClass(budgetTerrain, 'd-none')
    checkClass(budgetConstruction, 'd-none')
}

const checkClass = (el, delClass) => {
    if(el.classList.contains(delClass)) {
        el.classList.remove(delClass)
    }
        
}

//Ecoute le radio bouton "terrain"
radioTerrain.addEventListener('change', () => changeForTerrain())

//Ecoute le radio bouton "construction"
radioConstruction.addEventListener('change', () => changeForConstruction())

radioTerrainEtConstruction.addEventListener('change', () => showAll())


//Envoi du form
    form.addEventListener("submit", e => {
        e.preventDefault();
        fetch(form.action, {
              method : "POST",
              body: new FormData(document.getElementById("sheetdb-form")),
          }).then(
              response => response.json()
          ).then((html) => {
            window.location.replace(`${protocol}//${host}/thanks.html`)
          });
        });