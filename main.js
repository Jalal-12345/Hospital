const ul_li = document.querySelectorAll("li");
const loader = document.querySelector(".loader");


// link li
ul_li.forEach(item=>{
  item.addEventListener("click", (e)=>{
    if(e.target.innerText == "العهدة"){
      window.location  = `https://jalal-12345.github.io/hospital/Custody/Custody.html`
    }else if(e.target.innerText == "المواد المرجعة"){
      window.location = "https://jalal-12345.github.io/hospital/Almawadu_Almurjiea/Almawadu_Almurjiea.html"
    }else if(e.target.innerText == "المواد المنصرفة"){
      window.location = `https://jalal-12345.github.io/hospital/Almawadu_Almunsarifa/Almunsarifa.html`
    }
  })
});

setTimeout(()=> {
  loader.style.opacity = "0";

  setTimeout(()=> loader.style.display= "none" , 1000)
}, 10000);

loader.style.display = "none"

