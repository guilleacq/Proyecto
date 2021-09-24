var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}

function generateStars(stars)
{
    let htmlContent = "";
    for (let i = 0; i < stars; i++) //
    {
        htmlContent += `<i class="bi bi-star-fill"></i>`;
    }
    for (i = stars; i < 5; i++) //Make the rest of the stars white until 5 stars
    {
        htmlContent += `<i class="bi bi-star"></i>`;
    }

    return htmlContent;

}

function getRating()
{
    let selectedValue;
    const ratings = document.querySelectorAll('input[name="rating3"]');
    for (const s of ratings) {
        if (s.checked) {
            selectedValue = s.value;
            break;
        }
    }
    return selectedValue;
}

function addComment()
{
	
    let previousComments = document.getElementById("comment-section").innerHTML;
    let newComments = "";

    let currentComment = "";
    let name = localStorage.getItem('username');
    let message = document.getElementById("insertcomment");

    //Get current day and display in YYYY-MM-DD format
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    //Get rating system
    let rating = getRating();

    if ((!(rating > 0 && rating <= 5)) || message.value === "")
    {
        alert("ERROR: Para comentar se necesita un puntaje y un mensaje.");
    }
    else
    {
        currentComment += `
        <div class="comment">     
                <div class="comment-title"><p class="comment-name">`+name+`</p>
                <p class="comment-date">`+date+`</div>
            <div class="comment-photo"> 
                <img src="https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png" alt="Profile Pic">
            </div>
            <div class="comment-text">`+message.value+`</div>
            <div class="comment-score">`+generateStars(rating)+`</div><br>
        </div>`;

        newComments += currentComment;
        newComments += previousComments;
        
        document.getElementById("comment-section").innerHTML = newComments;
        let commentList = document.querySelector("#send-button");
        commentList.scrollIntoView();
    }

    //Clean old comment values

    message.value = "";
    //window.scrollTo(0,document.body.scrollHeight);

    let stars = document.getElementById("full-stars-example-two");
    stars.innerHTML = `            <div class="rating-group" name = "rating-group">
    <input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio">
    <label aria-label="1 star" class="rating__label" for="rating3-1"><i class="rating__icon rating__icon--star bi bi-star-fill"></i></label>
    <input class="rating__input" name="rating3" id="rating3-1" value="1" type="radio">
    <label aria-label="2 stars" class="rating__label" for="rating3-2"><i class="rating__icon rating__icon--star bi bi-star-fill"></i></label>
    <input class="rating__input" name="rating3" id="rating3-2" value="2" type="radio">
    <label aria-label="3 stars" class="rating__label" for="rating3-3"><i class="rating__icon rating__icon--star bi bi-star-fill"></i></label>
    <input class="rating__input" name="rating3" id="rating3-3" value="3" type="radio">
    <label aria-label="4 stars" class="rating__label" for="rating3-4"><i class="rating__icon rating__icon--star bi bi-star-fill"></i></label>
    <input class="rating__input" name="rating3" id="rating3-4" value="4" type="radio">
    <label aria-label="5 stars" class="rating__label" for="rating3-5"><i class="rating__icon rating__icon--star bi bi-star-fill"></i></label>
    <input class="rating__input" name="rating3" id="rating3-5" value="5" type="radio">
</div>`;

}

function displayDefaultComments(commentList)
{
    let commentsString = "";
    let commentDate;

    for(let i = 0; i < commentList.length; i++){
        commentDate = commentList[i].dateTime.slice(0, 10);
        commentsString += `
        <div class="comment">     
                <div class="comment-title"><p class="comment-name">`+commentList[i].user+`</p>
                <p class="comment-date">`+commentDate+`</div>
            <div class="comment-photo"> 
                <img src="https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png" alt="Profile Pic">
            </div>
            <div class="comment-text">`+commentList[i].description+`</div>
            <div class="comment-score">`+generateStars(commentList[i].score)+`</div><br>
            </div>`;


        document.getElementById("comment-section").innerHTML = commentsString;
    }




}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            
            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productPriceHTML = document.getElementById("productPrice");
            let productPurchasesHTML = document.getElementById("productPurchases");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productPurchasesHTML.innerHTML = product.soldCount;
            productPriceHTML.innerHTML = product.cost;
            productPriceHTML.innerHTML += " "+product.currency;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            
            displayDefaultComments(comments);
        


        }
    });
});