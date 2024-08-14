const ul_li = document.querySelectorAll("li");
const loader = document.querySelector(".loader");


// link li
ul_li.forEach(item=>{
  item.addEventListener("click", (e)=>{
    if(e.target.innerText == "العهدة"){
      window.location  = `http://127.0.0.1:5500/FrontEnd/Custody/Custody.html`
    }else if(e.target.innerText == "المواد المرجعة"){
      window.location = "http://127.0.0.1:5500/FrontEnd/Almawadu_Almurjiea/Almawadu_Almurjiea.html"
    }else if(e.target.innerText == "المواد المنصرفة"){
      window.location = `http://127.0.0.1:5500/FrontEnd/Almawadu_Almunsarifa/Almunsarifa.html`
    }
  })
});

setTimeout(()=> {
  loader.style.opacity = "0";

  setTimeout(()=> loader.style.display= "none" , 1000)
}, 10000);


