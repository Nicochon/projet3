
const picture = document.querySelector(".picture");

document.getElementById("image_uploads").addEventListener("change", myFunction);

function myFunction() {
    const preview = document.querySelector('.picture');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    console.log("toto")
reader.addEventListener("load", () => {
    // on convertit l'image en une chaîne de caractères base64
    console.log("toto");
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    picture.classList.toggle("active");
    console.log("toto");
  }
}