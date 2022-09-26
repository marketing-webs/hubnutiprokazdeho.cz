let amoutPageUrl = "objednavka/index.html";

const additionalInformation = "arthral forte";
// const paymentType = document.querySelector('input[name="payment"]:checked').value;

let storageUserData = JSON.parse(localStorage.getItem("formValue"));
let productPrice = 0;

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
    campaignCode: "7",
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
        additionalInfo:
          newFormValue.additionalInformation == null
            ? ""
            : newFormValue.additionalInformation,
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
        quantity: newUserData.quantity,
        price: 0,
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
        additionalInfo:
          newFormValue.additionalInformation == null
            ? ""
            : newFormValue.additionalInformation,
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
        quantity: newUserData.quantity,
        price: 0,
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
      window.location = amoutPageUrl;
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
      window.location = amoutPageUrl;
    })
    .catch((error) => console.error("[Update] Error:", error));
}

let submitBtn = document.getElementById("submitBtn");
function sendData(e) {
  document.body.style.cursor = "wait";
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
    price: productPrice,
    product: "null",
    paymentType: null,
    img: e.currentTarget.getAttribute("data-image"),
  };
  console.log(formValue);
  localStorage.setItem("formValue", JSON.stringify(formValue));
  sendValueToEndPoint();
}

//FORM SUBMIT

let lpBtn = document.querySelectorAll(".formButton");
lpBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    submitTriggered = true;

    if (+e.currentTarget.value === 1) {
      console.log(e.currentTarget.value);
      productPrice = 699;
    }
    if (+e.currentTarget.value === 2) {
      console.log(e.currentTarget.value);
      productPrice = 1398;
    }
    if (+e.currentTarget.value === 4) {
      console.log(e.currentTarget.value);
      productPrice = 2097;
    }

    sendData(e);
  });
});
