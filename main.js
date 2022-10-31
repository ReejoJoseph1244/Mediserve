var slideIndex =1;
showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n);
}
function currentSlides(n){
    showSlides(slideIndex = n);
}
function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if(n > slides.length) { slideIndex = 1}
    if(n < 1) { slideIndex = slides.length }
    for( i=0;i<slides.length;i++){
        slides[i].style.display = "none";
    }
    for ( i =0; i< dots.length;i++){
        dots[i].className = dots[i].className.replace(" active","");
    }
    slides[slideIndex -1].style.display = "block";
    dots[slideIndex - 1].className += "active";
}

// Auto Slide
// Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
//To open cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};
//To close cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

//Cart working Js
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
}
else{
    ready();
}

function ready(){
    //Remove iteams
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i=0;i<removeCartButtons.length;i++)
    {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total=0;
    for(var i=0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace('₹',""));
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var quantity = quantityElement.value;

        total = total + (price*quantity);

        document.getElementsByClassName('total-price')[0].innerHTML = '₹' + total;


    }
}
