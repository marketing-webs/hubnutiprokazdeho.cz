let cartPrice = document.querySelector('.amount');
let cartQuantity = document.querySelector('.number');
let userStorage = JSON.parse(localStorage.getItem('formValue'));

if(userStorage !== null) {
    if(userStorage.quantity !== 0 ) {
        cartQuantity.innerHTML = userStorage.quantity;
        cartPrice.innerHTML = userStorage.price + " Kč";
    } 
} else {
    cartQuantity.style.display = "none";
    cartPrice.innerHTML = "0 Kč";
}


console.log(cartPrice, cartQuantity, userStorage)