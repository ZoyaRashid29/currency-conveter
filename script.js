// Base URL for the currency conversion API
const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".get-exchange");
const reset=document.querySelector(".reset-exchange");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const themeToggleBtn = document.querySelector("#theme-toggle");


// Loop through each dropdown element
for(let select of dropdown)
{
    //to add list of country in dropdown
    for(currcode in countryList)   //countrylist is the variable in code.js
    {
      let newoption=document.createElement("option");
       newoption.innerText=currcode;
       newoption.value=currcode;
      if(select.name==="From" && currcode==="USD")
      {
       newoption.selected="selected";
       }
      else if(select.name==="to" && currcode==="PKR")
       {
       newoption.selected="selected";
        }
       select.append(newoption) ;
       select.addEventListener("change",(evt)=>{
         updateflag(evt.target);
       })

       }
    }


    //to update flag according to country name
const updateflag =(element) =>{
    let currcode=element.value; //INR,PKR,USD
    let countrycode=countryList[currcode]; //IN,EU,PK
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newsrc;
}
// Add a click event listener to the button for fetching exchange rates
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();  //prevents default submission
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amt === "" || amt <1)    // If no amount is entered or the amount is less than 1, set it to 1
    {
        amt=1;
        amount.value="1";
    }
    // Create the API URL for fetching the exchange rate for the 'from' currency
    const URL=`${base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    console.log(response);
   // Parse the response JSON data
    let data=await response.json();

    // Get the exchange rate from 'from' currency to 'to' currency
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

    let finalamount=amt*rate;
    //to upadate msg text
    msg.innerText=`${amt} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
});

reset.addEventListener("click", (evt) => {
  evt.preventDefault(); // Prevent the default form action if inside a form

  fromcurr.value = "USD"; // Set to default 'USD' for 'from' currency
  tocurr.value = "PKR";   // Set to default 'PKR' for 'to' currency

  document.querySelector(".amount input").value = "1";
  msg.innerText = "";
  updateflag(fromcurr); // Update the flag for the 'from' currency
  updateflag(tocurr);   // Update the flag for the 'to' currency
});


// Add a click event listener to the toggle button
themeToggleBtn.addEventListener('click', () => {
    // Toggle the 'dark-theme' class on the body element
    document.body.classList.toggle('dark-theme');

    // Optional: Change the icon based on the theme
    if (document.body.classList.contains('light-theme')) {
        themeToggleButton.classList.remove('fa-toggle-on');
        themeToggleButton.classList.add('fa-toggle-off');
    } else {
        themeToggleButton.classList.remove('fa-toggle-off');
        themeToggleButton.classList.add('fa-toggle-on');
    }
});
