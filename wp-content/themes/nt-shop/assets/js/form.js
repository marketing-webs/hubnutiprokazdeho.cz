// const amoutPageUrl = '/objednavka/index.html';

let amoutPageUrl = "potvrzeni-objednavky/index.html";

let quantityCounter = 1;
const increaseBtn = document.querySelector("[data-increase]");
const decreaseBtn = document.querySelector("[data-decrease]");

//FIRST FORM
const form = document.getElementById("form-index");
const phone = document.getElementById("form_phone");
const name = document.getElementById("form__name");
const surname = document.getElementById("form__surname");
const street = document.getElementById("form__street");
// const houseNumber = document.getElementById('house_number');
// const localNumber = document.getElementById('form__localNumber');
const postal = document.getElementById("form__postal");
const city = document.getElementById("form__city");
const email = document.getElementById("form__email");
const country = document.getElementById("form__country");
const paymentType = document.querySelector(
  'input[name="payment"]:checked'
).value;

const cartViewEmpty = document.querySelector(".checkout-empty");
const cartViewForm = document.querySelector(".checkout-form");

let storageUserData = JSON.parse(localStorage.getItem("formValue"));

let productPrice;

if (storageUserData.quantity !== 0) {
  cartViewEmpty.style.display = "none";
  cartViewForm.style.display = "block";
}

if (storageUserData.quantity === 1) {
  console.log("1", typeof storageUserData.quantity);
  productPrice = 699;
}
if (storageUserData.quantity === 2) {
  console.log("2");
  productPrice = 1398;
}
if (storageUserData.quantity === 4) {
  console.log("4");
  document.querySelector(".original-price").style.display = "block";
  productPrice = 2097;
}

increaseBtn.addEventListener("click", () => {
  if (quantityCounter >= 1) {
    quantityCounter++;
    document.querySelector(".quantityCounter").innerHTML = quantityCounter;
    document.querySelector(".price").innerHTML = `${
      productPrice * quantityCounter
    } Kč`;
    document.querySelector(".dynamic-total").innerHTML =
      productPrice * quantityCounter;
    

  }
});

decreaseBtn.addEventListener("click", () => {
  if (quantityCounter > 1) {
    quantityCounter--;
    document.querySelector(".quantityCounter").innerHTML = quantityCounter;
    document.querySelector(".price").innerHTML = `${
      productPrice * quantityCounter
    } Kč`;
    document.querySelector(".dynamic-total").innerHTML =
      productPrice * quantityCounter;
  }
});

let productQuantity = JSON.parse(localStorage.getItem("userData")).quantity;
console.log(
  productPrice,
  JSON.parse(localStorage.getItem("userData")).quantity
);

function setPrice(value, quantity) {
  productPrice = value;
  productQuantity = quantity;
  console.log(productPrice + " " + productQuantity);
}

//check is any of the input fields isn't null

let submitTriggered = false;
let formChanged = false;
const formIndex = document.getElementById("form-index");

formIndex.addEventListener("change", () => (formChanged = true));
window.addEventListener("beforeunload", (event) => {
  if (
    formChanged &&
    !submitTriggered &&
    localStorage.getItem("isVisited") != "true"
  ) {
    event.returnValue = "I tak nie widać :(";
    localStorage.setItem("isVisited", "true");
    localStorage.setItem("specialOffer", "true");
    window.setInterval(checkIfSepcial, 2000);
  }
});

//Change price

let formValue = {};

let countryCode = "";

// CHECK CHECKBOX PAYMENT TYPE
const checkpaymentType = () => {
  if (paymentType.checked) {
    return "pobranie";
  } else {
    return "pobranie";
  }
};

// SET COUNTRY PHONE PREFIX BY COUNTRY CODE
// let region = process.env.REGION;

// const options = document.querySelectorAll("[data-code]");
// options.forEach(option => {
//     if (option.getAttribute('data-code') == region) {
//         // option.selected = true;
//         option.setAttribute('selected', 'selected');
//     }
// });

// GET ATTRIBUTE COUNTRY CODE FROM SELECTED OPTION
country.addEventListener("change", () => {
  countryCode =
    country.options[country.selectedIndex].getAttribute("countryCode");
});

// FORM CHECK INPUTS
// const checkInputs = (phone, name, surname, email, street, postal, city, err) => {
//     const phoneValue = phone.value.trim();
//     const nameValue = name.value.trim();
//     const surnameValue = surname.value.trim();
//     const streetValue = street.value.trim();
//     // const houseNumberValue = houseNumber.value.trim();
//     // const localNumberValue = localNumber.value.trim();
//     const postalValue = postal.value.trim();
//     const cityValue = city.value.trim();
//     const emailValue = email.value.trim();
// };

// GET DEVICE TYPE
const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

// INPUT TEST
const inputTest = (props) => {
  const value = /^.{1,60}$/;
  return value.test(props);
};
const postCodeText = (props) => {
  const value = /^.{1,11}$/;
  return value.test(props);
};
// const phoneCheck = (phone) => {
//     const value = /^[0-9]{9}$/g;
//     return value.test(phone);
// };

// const nameCheck = (name) => {
//   const value = /^[a-ząśżźćęółń]{2,20}$/i;
//   return value.test(name);
// };

// const surnameCheck = (surname) => {
//     const value = /^[a-ząśżźćęółń]+(?: *- *)? ?( \b[a-z]{3}\b )?[a-ząśżźćęółń]+$/i;
//     return value.test(surname);
// };

// const streetCheck = (street) => {
//     const value = /^[\d\s\p{L}]{1,50}$/u;
//     return value.test(street);
// };

// const houseNumberCheck = (houseNumber) => {
//     const value = /^[1-9]\d*(?:[ -]?(?:[a-zA-Z]+|[1-9]\d*))?$/u;
//     return value.test(houseNumber);
// };

// const localNumberCheck = (localNumber) => {
//   const value = /^[1-9]\d*(?:[ -]?(?:[a-zA-Z]+|[1-9]\d*))?$/u;
//   return value.test(localNumber);
// };

// const postCheck = (postal) => {
//     const value = /^([0-9]{2})(-[0-9]{3})?$/i;
//     return value.test(postal);
// };

// const cityCheck = (city) => {
//     const value = /^[\s\p{L}]{1,50}$/u;
//     return value.test(city);
// };

// const emailCheck = (email) => {
//     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//         email
//     );
// };

//ERROR MESSAGE
const setError = (element, err) => {
  const formControl = element.parentElement;
  const error = formControl.querySelector(".form__error");

  // formControl.className ='form__control control-error';
  formControl.classList.add(`${err}`);
  error.style.display = "block";
};

// SUCCESS MESSAGE
const setSuccess = (element, err) => {
  const formControl = element.parentElement;
  const error = formControl.querySelector(".form__error");

  // formControl.className ='form__control control-success';
  formControl.classList.remove(`${err}`);
  error.style.display = "none";
};

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}
//?utm_source=01&utm_medium=wp.pl&utm_creations=000102

if (localStorage.getItem("userData") == null) {
  const utm = new URLSearchParams(document.location.search);
  const userData = {
    sessionToken: "",
    region: "CZ",
    campaignCode: 7,
    source: document.URL,
    offerType: null,
    language: navigator.language,
    creations: utm.get("utm_creations"), //id baneru,
    device: deviceType(),
    partner: utm.get("utm_source"), //np. [1] - google.com,
    referer: utm.get("utm_medium"), //np. ["wp.pl"],
    quantity: 1,
  };

  localStorage.setItem("userData", JSON.stringify(userData));
}

//CREATE COOKIE WITH SESSION TOKEN
const createToken = () => {
  return (
    String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16).slice(4)
  );
};

const setCookie = () => {
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + 1000 * 60 * 5;
  now.setTime(expireTime);
  document.cookie = `sessionToken=${createToken()}; expires=${now.toUTCString()}; path=/;`;
};

// const getCookie = (cname) => {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// };

var url2 = self.location.href;
var p = url2.indexOf("?");
var str = url2;
var parameter = str.slice(p);
if (p >= 1 && parameter.indexOf("p") != 1 && parameter.indexOf("s") != 1) {
  url2 = str.slice(0, p);
  self.location.replace(url2);
}
//USER DATA i skończyć resztę podstron

const urlEndpoint =
  "https://lso2bk5sn8.execute-api.eu-central-1.amazonaws.com/Leads";
function sendValueToEndPoint() {
  let newFormValue = JSON.parse(localStorage.getItem("formValue"));
  let newUserData = JSON.parse(localStorage.getItem("userData"));
  if (
    localStorage.getItem("sentUserData") != localStorage.getItem("userData") ||
    localStorage.getItem("sentFormValue") != localStorage.getItem("formValue")
  ) {
    if (getCookie("sessionToken") == null) {
      console.error("Wysyłanie!");
      setCookie();
      const postOrderData = {
        sessionToken: getCookie("sessionToken"),
        firstName: newFormValue.name,
        lastName: newFormValue.surname,
        street: newFormValue.street,
        city: newFormValue.city,
        postCode: newFormValue.postal,
        houseNumber: "",
        localNumber: "",
        phone: newFormValue.phonePrefix + newFormValue.phone,
        email: newFormValue.email,
        additionalInfo: "",
        paymentType: newFormValue.paymentType,
        region: newUserData.region,
        campaignCode: parseInt(newUserData.campaignCode, 10),
        source: newUserData.source,
        offerType: newUserData.offerType != null ? newUserData.offerType : "",
        language: newUserData.language,
        creations: newUserData.creations != null ? newUserData.creations : "",
        device: newUserData.device,
        partner:
          newUserData.partner != null ? parseInt(newUserData.partner, 10) : 0,
        referer: newUserData.referer != null ? newUserData.referer : "",
        product: newFormValue.product,
        quantity: newFormValue.quantity,
        price: newFormValue.price,
        leadType: 1,
      };
      newUserData.sessionToken = getCookie("sessionToken");
      localStorage.setItem("sentUserData", JSON.stringify(newUserData));
      localStorage.setItem("sentFormValue", JSON.stringify(newFormValue));
      submitData(postOrderData, urlEndpoint);
      console.log(postOrderData);
    } else {
      console.error("Update!");
      const putOrderData = {
        firstName: newFormValue.name,
        lastName: newFormValue.surname,
        street: newFormValue.street,
        houseNumber: "",
        localNumber: "",
        city: newFormValue.city,
        postCode: newFormValue.postal,
        phone: newFormValue.phonePrefix + newFormValue.phone,
        email: newFormValue.email,
        additionalInfo: "",
        paymentType: newFormValue.paymentType,
        region: newUserData.region,
        campaignCode: parseInt(newUserData.campaignCode, 10),
        source: newUserData.source,
        offerType: newUserData.offerType,
        language: newUserData.language,
        creations: newUserData.creations != null ? newUserData.creations : "",
        device: newUserData.device,
        partner:
          newUserData.partner != null ? parseInt(newUserData.partner, 10) : 0,
        referer: newUserData.referer != null ? newUserData.referer : "",
        product: newFormValue.product,
        quantity: newFormValue.quantity,
        price: newFormValue.price,
        leadType: 1,
      };
      newUserData.sessionToken = getCookie("sessionToken");
      localStorage.setItem("sentUserData", JSON.stringify(newUserData));
      localStorage.setItem("sentFormValue", JSON.stringify(newFormValue));
      updateData(getCookie("sessionToken"), putOrderData, urlEndpoint);
      console.log(putOrderData);
    }
  }
}

// function submitData(data, url) {
//   const response = fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//       'accept': 'text/plain',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   }).catch((err) => {
//       console.log(err);
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

function submitData(data, url) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(console.log(JSON.stringify(data)))
    .then((response) =>
      console.log("[Post] Success:", JSON.stringify(response))
    )
    .then(() => {
      window.location.pathname = amoutPageUrl;
    })
    .catch((error) => console.error("[Update] Error:", error));
}

function updateData(sessionToken, data, url) {
  fetch(url + "/" + sessionToken, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(console.log(JSON.stringify(data)))
    .then((response) =>
      console.log("[Update] Success:", JSON.stringify(response))
    )
    .then(() => {
      window.location.pathname = amoutPageUrl;
    })
    .catch((error) => console.error("[Update] Error:", error));
}

let submitBtn = document.getElementById("submitBtn");
function sendData() {
  // checkInputs(phone, name, surname, email, street, postal, city, additionalInformation, 'error-2');
  submitTriggered = true;
  if (document.querySelectorAll(".error-2").length === 0) {
    document.body.style.cursor = "wait";
    formValue = {
      name: name.value.trim(),
      surname: surname.value.trim(),
      street: street.value.trim(),
      city: city.value.trim(),
      postal: postal.value.trim(),
      phone: phone.value.trim(),
      phonePrefix: 420,
      email: email.value.trim(),
      countryCode: countryCode,
      countryValue: country.value,
      additionalInformation: "",
      price: productPrice * quantityCounter,
      product: "PRO223",
      paymentType: checkpaymentType(),
      quantity: quantityCounter,
      img: storageUserData.img,
    };
    console.log(formValue);
    localStorage.setItem("formValue", JSON.stringify(formValue));
    sendValueToEndPoint();
  }
}

//set product image
document.querySelector(".thumb").src = storageUserData.img;

//set product name
document.querySelector(
  ".name"
).innerHTML = `Lady GOYA ${storageUserData.quantity}x`;

//set product price
document.querySelector(".price").innerHTML = `${productPrice} Kč`;

//set total price
document.querySelector(".dynamic-total").innerHTML = productPrice;

//FORM SUBMIT
submitBtn.addEventListener("click", (e) => {
  submitTriggered = true;
  e.preventDefault();
  sendData();

  formValue = {
    name: "",
    surname: "",
    street: "",
    city: "",
    postal: "",
    phone: "",
    phonePrefix: 420,
    email: "",
    countryCode: "",
    countryValue: "",
    additionalInformation: "",
    quantity: 0,
    price: 0,
    product: "PRO240",
    paymentType: null,
  };
  console.log(formValue);
  localStorage.setItem("formValue", JSON.stringify(formValue));
});
