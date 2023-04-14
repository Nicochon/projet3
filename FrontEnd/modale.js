
// apparition de la "nav modal". OK
const recupStorageConnected = window.localStorage.getItem("connected");
const modalModal = document.querySelector("#modal");
const loginLogout = document.querySelector(".login");
const logoutLogin = document.querySelector(".logout");

function modalOrNotModal(){
    if (recupStorageConnected === "true"){
        modalModal.classList.toggle("active");
        loginLogout.classList.toggle("active");
        logoutLogin.classList.toggle("active");

    }
}
modalOrNotModal();


// logout fonctionnel
function clearStorage(){
    localStorage.clear();
    modalOrNotModal();
};
logoutLogin.addEventListener("click", clearStorage);

// apparition disparition du mode édition au click du btn-mode-édition. OK
const modifier = document.querySelector(".modifier");
const modifier2 = document.querySelector(".modifier2");
const modifier3 = document.querySelector(".modifier3")
const btnNone = document.querySelector("#btn-container");
const editionMode = document.querySelectorAll(".edition-mode"); // on selectionne tout les elements qui ont modal-trigger dans leur nom

editionMode.forEach(trigger => trigger.addEventListener("click",toggleModal))

function toggleModal(){   
    modifier.classList.toggle("active");
    modifier2.classList.toggle("active");
    modifier3.classList.toggle("active");
    btnNone.classList.toggle("active");  
}


// apparition disparition de la modale. OK
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger"); // on selectionne tout les elements qui ont modal-trigger dans leur nom

modalTriggers.forEach(trigger => trigger.addEventListener("click",toggleModal2))

function toggleModal2(){
    modalContainer.classList.toggle("active");  
};

// création de la gallery-photo ainsi que les boutons "poubelle" de façon dynamique. OK
const modalBtn = document.querySelector(".modal-btn");
modalBtn.addEventListener("click",generateNewGallery);


//supprimer des photos. OK
const clefToken = window.localStorage.getItem("token");

function view(){
    deleteWork(this.getAttribute('data-id'));
    generateNewGallery(); 
    generateGallery();
}
















//fonction demande de DELETE
async function deleteWork(id){
    const response = await fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ` + clefToken, 
        },        
    })
    console.log(response);    
}


// fonction génère gallerie suppression.
async function generateNewGallery(){ 
    const reponsePhotos = await fetch('http://localhost:5678/api/works'); 
    const photos = await reponsePhotos.json(); 

    document.querySelector(".gallery1").innerHTML =""; 

    for (let i = 0; i < photos.length; i++) { 

        const figureElement = document.createElement("figure"); 
        figureElement.inputMode = photos[i];

        const imageElement = document.createElement("img"); 
        imageElement.src = photos[i].imageUrl; 
        imageElement.crossorigin="anonymous";

        const aElement = document.createElement("a");
        aElement.innerText = "éditer";
        
        const buttonElement = document.createElement('button');
        buttonElement.className = 'button-delete';
        buttonElement.setAttribute('data-id', photos[i].id);
        buttonElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
        buttonElement.type = "button";
         
        const sectionFigure = document.querySelector(".gallery1");

        sectionFigure.appendChild(figureElement);    
        figureElement.appendChild(imageElement); 
        figureElement.appendChild(buttonElement);
        figureElement.appendChild(aElement);

    }    
    const buttonsDelete = document.querySelectorAll(".button-delete");
    buttonsDelete.forEach( input => input.addEventListener('click', view));    
};


// fonction gallerie des projets.
async function generateGallery(){ 
    const reponsePhotos = await fetch('http://localhost:5678/api/works'); 
    const photos = await reponsePhotos.json(); 
    document.querySelector(".gallery").innerHTML ="";  

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



