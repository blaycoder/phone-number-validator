"use strict";

const btn = document.querySelector(".submit-btn");
const countryCode = document.querySelector("#countryCode");
const phoneNumber = document.querySelector("#phoneNumber");
const statusResponse = document.querySelector(".status-response");
const resetForm = document.querySelector(".reset");
const statusNumber = document.querySelector(".status");
const phoneRegion = document.querySelector(".phone_region");
const carrierName = document.querySelector(".carrier_name");


const renderStatus = function (msg, phone_region, carrier_name) {
  // let html = `
  // <h4>Status: <span class="status"> ${msg}</span> </h4>
  // <p>
  //    <h4>Phone-Region: <span class="phone_region"${phone_region}</span> </h4>
  // </p>
  // `;
  // statusResponse.insertAdjacentHTML('beforeend', html);
  statusNumber.insertAdjacentText("beforeend", msg);
  phoneRegion.insertAdjacentText("beforeend", phone_region);
  carrierName.insertAdjacentText("beforeend", carrier_name);
};

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'f3ac58eedcmsh158cae8631cd06ep1ae4a0jsnce95e6464a1d',
// 		'X-RapidAPI-Host': 'veriphone.p.rapidapi.com'
// 	}
// };

//numVerify API key = 84b292f040580e9324b9880b07a25fef

const verifyStatus = async function (telNumber) {
  try {
    const response = await fetch(
      `http://apilayer.net/api/validate?access_key=84b292f040580e9324b9880b07a25fef&number=${telNumber}`
    );
    if (!response.ok) throw new Error("Problem getting the result");
    const data = await response.json();
    console.log(data);
    if (data.valid) {
      statusNumber.classList.toggle("success");
      phoneRegion.classList.toggle("success");
      carrierName.classList.toggle("success")
      renderStatus("Valid", data.country_name, data.carrier);
    } else {
      statusNumber.classList.toggle("fail");
      phoneRegion.classList.toggle("fail");
      carrierName.classList.toggle("fail");
      renderStatus("Invalid", "Phone region not found");
    }
  } catch (err) {
    statusNumber.classList.toggle("fail");
    renderStatus(
      `Something went wrong ${err.message}`,
      "Phone region not found"
    );
  }
};

btn.addEventListener("click", function (e) {
  const concatNumber = countryCode.value + phoneNumber.value.slice(1);
  verifyStatus(concatNumber);
  e.preventDefault();
});

resetForm.addEventListener("click", function (e) {
    resetForm.reset();
});
