
// récuperer les données du formulaire. OK
const buttonInput=document.getElementById("button");

buttonInput.addEventListener("click",async function(){
    const nameInput = document.getElementById("name").value;
    const passwordInput = document.getElementById("password").value;

    const login = {
        "email": nameInput,
        "password": passwordInput,  
      };
      
// une fois récuperé envoyer les données a l'API. OK     
      let response = await fetch('http://localhost:5678/api/users/login', {
        method:'POST',
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        },
        body:JSON.stringify(login)
        
    });
    loginUser(response);  
});



// function redirection suite a un retour positif de l'API. OK    
function redirection(){
    window.location.href = "index.html";
} 

// function de réponse suite a un retour erreur de l'api. OK
function generateErreur(){
    document.querySelector(".erreur").innerHTML ="";
        const erreurElement = document.createElement("p");
        erreurElement.innerText = "Mot de passe ou adresse E-mail invalide.";
        const sectionErreur = document.querySelector(".erreur");
        sectionErreur.appendChild(erreurElement);
        }

// assembler les deux fonction pour qu'elle sactivent selon la reponse de l'API. OK 
async function loginUser(response) {
    let responseJSON = await response.json();
    //let result;
    if (response.ok === true){
        localStorage.setItem("token", responseJSON.token);
        localStorage.setItem("connected", response.ok);
        redirection()
    } else {
        generateErreur()
    }        
    //return result;       
};














