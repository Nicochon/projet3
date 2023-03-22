const reponsePhotos = await fetch('http://localhost:5678/api/works'); 
const photos = await reponsePhotos.json();
function genareFirstGallery(photos){
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

        sectionFigure.appendChild (figureElement);    
        figureElement.appendChild(imageElement); 
        figureElement.appendChild(buttonElement);
        figureElement.appendChild(aElement);
        console.log("bo");
    }        
}
genareFirstGallery(photos);

const modalBtn = document.querySelector(".modal-btn");
console.log(modalBtn);

modalBtn.addEventListener("click",generateNewGallery);

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

        sectionFigure.appendChild (figureElement);    
        figureElement.appendChild(imageElement); 
        figureElement.appendChild(buttonElement);
        figureElement.appendChild(aElement);
        console.log("bo");
    }        
}

//supprimer des photos. OK

const clefToken = window.localStorage.getItem("token");
const buttonsDelete = document.querySelectorAll(".button-delete");
console.log(buttonsDelete);

buttonsDelete.forEach( input => input.addEventListener('click', view));
function view(){
    exterminator(this.getAttribute('data-id')); 
}

async function exterminator(id){
    const deleteNow = await fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ` + clefToken, 
        },        
    })
    
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

        sectionFigure.appendChild (figureElement);    
        figureElement.appendChild(imageElement); 
        figureElement.appendChild(buttonElement);
        figureElement.appendChild(aElement);   
    }
}


  function generateNewGallery(photos){ 
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
    
            sectionFigure.appendChild (figureElement);    
            figureElement.appendChild(imageElement); 
            figureElement.appendChild(buttonElement)
            figureElement.appendChild(aElement);
        }
        const buttonsDelete = document.querySelectorAll(".button-delete");
        buttonsDelete.forEach( input => input.addEventListener('click', view));   
    }
    generateNewGallery(photos);