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
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    //Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i=0;i<quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChanged);
    }

    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i=0;i<addCart.length;i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

function buyBeforeload(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
// Buy button
function buyButtonClicked(){
    alert('Your Order is Placed')
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
    
}
//Quantity Change
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

// Add to Cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerHTML;
    var price = shopProducts.getElementsByClassName('price')[0].innerHTML;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
    cart.classList.add("active");
    
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i=0;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerHTML == title){
            alert('You have already add this item to cart');
        return;
        }
        
    }
var cartBoxContent= `
                <img src="${productImg}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <!-- Remove Cart -->
                <i class='bx bxs-trash-alt cart-remove'></i>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
}

function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total =0;
    for(var i=0;i< cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

        var price = parseFloat(priceElement.innerText.replace("₹",""));
        var quantity = quantityElement.value;
        total = total + (price*quantity);
    }
        total = Math.round(total * 100) /100;
        document.getElementsByClassName('total-price')[0].innerHTML = '₹' + total;
    
}

