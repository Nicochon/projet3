// creation de la "gallery-photo" de maniere dynamique. OK
const reponsePhotos = await fetch('http://localhost:5678/api/works'); //demande a l'api se qui se trouve dans works.
const photos = await reponsePhotos.json();  // enregistrement du retour de l'API dans une constante. 


function generateGallery(photos){ //création d'une gallery photo
    document.querySelector(".gallery").innerHTML ="";  //on place cette fonction dans .gallery bloc de notre HTML

    for (let i = 0; i < photos.length; i++) { //i est egal a zero la boucle continue tant que i n'est pas superieur aux lignes de tableau photos, i prend +1 a chaque boucle 

        const figureElement = document.createElement("figure"); // const figureElement correspond a une creation d'une balise figure
    
        const imageElement = document.createElement("img"); // cont imageElement corresspond a une creation d'image
        
        const figcaptionElement = document.createElement ("figcaption"); // const figcaptionElement correspond a une creation de balises ficaption
       
        figureElement.inputMode = photos[i]; //creation d'un element figure pour chaque ligne du tableau i
        imageElement.src = photos[i].imageUrl; //mets dans un element image l'element .imageUrl de chaque ligne i du tableau photos
        imageElement.crossorigin="anonymous";
        figcaptionElement.innerText = photos[i].title; // met dans un element figcaption l'element .title de chaque ligne i du tableau photos
    
        const sectionFigure = document.querySelector(".gallery"); // toute ses creation se font dans la balise .gallery
        sectionFigure.appendChild (figureElement); // sectionFigure est l'enfant de gallery
    
        figureElement.appendChild(imageElement); //imageElement est l'enfant de figureElement
        figureElement.appendChild(figcaptionElement);// figcaptionElement est l'enfant de figureElement 
    }
}
generateGallery(photos) // on rappelle la fonction précedente

//creation des "btn-filtre" de maniere dynamique. 
const reponseCategories = await fetch('http://localhost:5678/api/categories');  // on demande des infos a un autre dossier de l'API
const categories = await reponseCategories.json();  // on va chercher les réponse de fetch catégories qui sont maintenant dans la const categories.

const btnContainer = document.querySelector("#btn-container") // association de btnContainer a l'id btn-container html
 

categories.forEach(categorie => { //boucle infini 
    const btnElement = document.createElement("button"); //creation d'un boutton
    btnElement.textContent = categorie.name; // ce boutton créer aura le nom de categories.name
    btnElement.value = categorie.id; // le boutton aura la meme valeur que l'id de categorie
    btnElement.className = "btn-category-filter"; 
    btnContainer.appendChild(btnElement) //btnElement est l'enfant de btnContainer

    btnElement.addEventListener("click",async function(){    // au clique on fait une fonction 
        const reponsePhotos = await fetch('http://localhost:5678/api/works'); //demande a l'api se qui se trouve dans works.
        const photos = await reponsePhotos.json();  // enregistrement du retour de l'API dans une constante. 
        const photoFiltrees = photos.filter(function(photo){ //
            return photo.category.id == btnElement.value; // si la category id est egal a l'id du btnElement 
        });
        generateGallery(photoFiltrees) //on crée une galery photo des photos qui ont le meme id que le btnElement
    });    
}); 

const buttonTous = document.querySelector(".btn-category-filter-all");
    
    buttonTous.addEventListener('click',async function(){ //au clic buttonTous
        const reponsePhotos = await fetch('http://localhost:5678/api/works'); //demande a l'api se qui se trouve dans works.
        const photos = await reponsePhotos.json();  // enregistrement du retour de l'API dans une constante. 
        generateGallery(photos); // crée une gallery avec toutes les photos.    
    });


