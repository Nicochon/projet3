


//faire apparaitre et disparaitre la modal2:"Ajout photo".  OK
const modalContainer2 = document.querySelector(".modal-container2");
const modalContainer = document.querySelector(".modal-container");

const modalComeBack = document.querySelectorAll(".modal-newpic"); // on selectionne tout les elements qui ont modal-trigger dans leur nom

modalComeBack.forEach(Back => Back.addEventListener("click",toggleModal))

const closeModals = document.querySelectorAll(".modal-triger2");
closeModals.forEach(close => close.addEventListener("click", toggleModal3))


// faire apparaitre les catégories de façon dynamique. OK
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

const btnListElement = document.querySelector("select");

generateBtnTitle(categories);


//apparition de l'image. OK
const picture = document.querySelector(".picture");

document.getElementById("image_uploads").addEventListener("change", uploadPicture);


//bouton valider activation + couleur
const titleInput = document.getElementById("title")
const categoriesInput = document.getElementById('btn-categories-modale');
const input =  document.getElementById("image_uploads");

document.getElementById('formulaire-photo').addEventListener("change", btnGreen);


//envoyer photo+titre+objet a l'API. OK
const okInput=document.getElementById("btn-valider");

okInput.addEventListener("click",async function(e){
    const clefToken = window.localStorage.getItem("token");
    const titleInput = document.getElementById("title").value;    
    const categoriesInput = document.getElementById('btn-categories-modale').value;     
    const input =  document.getElementById("image_uploads"); 

    var data = new FormData();
    data.append("image", input.files[0]);//pour contourner la sécurité du navigateur 
    data.append("title", titleInput);
    data.append("category", categoriesInput);

    let response = await fetch('http://localhost:5678/api/works', {
    method:'POST',
        headers:{
            'accept':'application/json',
            'Authorization': `Bearer ` + clefToken,
        },
    body: data   
    }); 
    generateGallery();
    toggleModal3();
    picture.classList.toggle("active");
    document.querySelector("form").reset();
    btnGreen()
});




//déclaration des fonctions

    //faire apparaitre disparaitre la modale
function toggleModal(){
    modalContainer2.classList.toggle("active");
    modalContainer.classList.toggle("active");
}

function toggleModal3(){
    modalContainer2.classList.toggle("active");
}

    // creer liste déroulante avec les catégories
function generateBtnTitle(categories){
    categories.forEach(categorie => {

        const optionElement = document.createElement("option");
        
        optionElement.textContent = categorie.name;
        optionElement.value = categorie.id;
        optionElement.className = "btn-category-modal";
           
        btnListElement.appendChild(optionElement);   
    });
}

    //apparition de la photo apres upload 
function uploadPicture() {
    const preview = document.querySelector('.picture');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
   
reader.addEventListener("load", () => {
    // on convertit l'image en une chaîne de caractères base64
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    picture.classList.toggle("active");
    
  }
}


    //btn valider change de couleur et s'active. 
function btnGreen(){  
    if(titleInput.value != '' && categoriesInput.value != ""  && input.files[0] != null){
        okInput.classList.add("active");
        document.getElementById("btn-valider").disabled = false;
    } else {
        okInput.classList.remove("active");
        document.getElementById("btn-valider").disabled = true;
    }
}


    //regénérer la gallerie de l'accueil a l'ajout d'un projet
async function generateGallery(){ 
    document.querySelector(".gallery").innerHTML ="";
    const reponsePhotos = await fetch('http://localhost:5678/api/works'); 
    const photos = await reponsePhotos.json();   

    for (let i = 0; i < photos.length; i++) { 

        const figureElement = document.createElement("figure"); 
        const imageElement = document.createElement("img"); 
        const figcaptionElement = document.createElement ("figcaption"); 
       
        figureElement.inputMode = photos[i]; 

        imageElement.src = photos[i].imageUrl; 
        imageElement.crossorigin="anonymous";

        figcaptionElement.innerText = photos[i].title; 
    
        const sectionFigure = document.querySelector(".gallery"); 
        sectionFigure.appendChild (figureElement); 
    
        figureElement.appendChild(imageElement); 
        figureElement.appendChild(figcaptionElement);  
    }
}


