// get data 
function getData(){
  const FindData = axios.get("https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almurjieas").then(res=>res).catch(err=>console.log(err));
  return FindData;
}

// Show Data

let dataPro = [];

async function ShowData(){
  document.querySelector("tbody").innerHTML = ''
  const FindData = await getData();
  const res = FindData.data.data;
  res.map(item=>{
    dataPro.push(item);
    document.querySelector("tbody").innerHTML += `
    <tr>
         <td>${item.attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${item.attributes.ReasonsForReturn}</td>
         <td>${item.attributes.AljihatAlmurjiea}</td>
         <td>${item.attributes.data}</td>
         <td>${item.attributes.Quantity}</td>
         <td>${item.attributes.alwahda}</td>
         <td>${item.attributes.ItemNameAndDescription}</td>
         <td>${item.attributes.ItemNo}</td>
         <td><button onclick="updateDate(${item.id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${item.id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
`
  })

}
ShowData();

// split data

function splitData(data) {
  const cut = data.split("/");
  return cut[0];
}

// delete 

async function DeleteDate(id){
   console.log(id);
   axios.delete(`https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almurjieas/${id}`)
   .then(res =>{
    createToast("succses","#2d6a4f","fa-solid fa-circle-check","تم حذف  بنجاح")
    ShowData();
  })
  .catch(err=>{
    console.log(err);
    createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
    });
}


// Find One 

 function FindOne(id){
  const getOne = axios.get(`https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almurjieas/${id}`).then(res=>res).catch(err=>err);
  return getOne;
 }

 
async function updateDate(id){
  document.querySelector('.modal').style.display = "flex" 
  const response = await FindOne(id);
  const res = await response.data.data;

  document.querySelector(".ItemNo").value = res.attributes.ItemNo;
  document.querySelector(".ItemNameAndDescription").value = res.attributes.ItemNameAndDescription;
  document.querySelector(".alwahda").value = res.attributes.alwahda;
  document.querySelector(".Quantity").value = res.attributes.Quantity;
  document.querySelector(".data").value = res.attributes.data;
  document.querySelector(".AljihatAlmurjiea").value = res.attributes.AljihatAlmurjiea;
  document.querySelector(".almaswuwl_fi_aljihat_almurjiea").value = res.attributes.almaswuwl_fi_aljihat_almurjiea;
  document.querySelector(".ReasonsForReturn").value = res.attributes.ReasonsForReturn;

  // click submit 

  document.getElementById("submit").addEventListener("click", (e)=>{
     e.preventDefault();

     const data = {
      ItemNo: document.querySelector(".ItemNo").value,
      ItemNameAndDescription: document.querySelector(".ItemNameAndDescription").value,
      alwahda:document.querySelector(".alwahda").value,
      Quantity: document.querySelector(".Quantity").value,
      data: splitData(document.querySelector(".data").value),
      AljihatAlmurjiea: document.querySelector(".AljihatAlmurjiea").value,
      ReasonsForReturn: document.querySelector(".ReasonsForReturn").value,
      almaswuwl_fi_aljihat_almurjiea:document.querySelector(".almaswuwl_fi_aljihat_almurjiea").value
    }

      axios.put(`https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almurjieas/${id}`, {data : data}).then(res=>{
        createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت تعديل عهدة بنجاح");
        ShowData();
      })
      .catch(err=>{
        createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
        console.log(err);
      })
  })
  
}

document.querySelector(".close").addEventListener("click", ()=>{
  document.querySelector(".modal").style.display = "none";

  document.querySelectorAll("input").forEach(item=>{
    item.value = "";
  })
  
})




// toast
const notification = document.querySelector(".box-toast");
function createToast(type, color, icon, text) {
  let newToast = document.createElement("div");
  newToast.innerHTML = `
       <div class="toast ${type}">
  <i class="${icon}" style="color:${color}"></i>
  <div class="massage"><strong>${text}</strong></div>
  <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
</div>
  `;
  notification.appendChild(newToast);

  newToast.timOut = setTimeout(() => {
    newToast.remove();
  }, 5000);
}


// search 
const selectSearch = document.querySelector("select");

function search_Almawadu_Almurjiea(value){
  document.querySelector("tbody").innerHTML = "";
  for(i=0; i<dataPro.length; i++){
   if(value != "" && selectSearch.value != "فلتر البحث"){
           if(selectSearch.value == "ItemNameAndDescription"){
              if(dataPro[i].attributes.ItemNameAndDescription.includes(value)){
                document.querySelector("tbody").innerHTML += `
              <tr>
         <td>${dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].attributes.ReasonsForReturn}</td>
         <td>${dataPro[i].attributes.AljihatAlmurjiea}</td>
         <td>${dataPro[i].attributes.data}</td>
         <td>${dataPro[i].attributes.Quantity}</td>
         <td>${dataPro[i].attributes.alwahda}</td>
         <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
         <td>${dataPro[i].attributes.ItemNo}</td>
         <td><button onclick="updateDate(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
            `;
           }
           }else if(selectSearch.value == "ItemNo"){
            if(dataPro[i].attributes.ItemNo.includes(value)){
              document.querySelector("tbody").innerHTML += `
            <tr>
         <td>${dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].attributes.ReasonsForReturn}</td>
         <td>${dataPro[i].attributes.AljihatAlmurjiea}</td>
         <td>${dataPro[i].attributes.data}</td>
         <td>${dataPro[i].attributes.Quantity}</td>
         <td>${dataPro[i].attributes.alwahda}</td>
         <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
         <td>${dataPro[i].attributes.ItemNo}</td>
         <td><button onclick="updateDate(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `; }
           }else if (selectSearch.value == "alwahda"){
            if(dataPro[i].attributes.alwahda.includes(value)){
              document.querySelector("tbody").innerHTML += `
                <tr>
         <td>${dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].attributes.ReasonsForReturn}</td>
         <td>${dataPro[i].attributes.AljihatAlmurjiea}</td>
         <td>${dataPro[i].attributes.data}</td>
         <td>${dataPro[i].attributes.Quantity}</td>
         <td>${dataPro[i].attributes.alwahda}</td>
         <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
         <td>${dataPro[i].attributes.ItemNo}</td>
         <td><button onclick="updateDate(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;            } 
           } else if (selectSearch.value == "ReasonsForReturn") {
            if(dataPro[i].attributes.ReasonsForReturn.includes(value)){
              document.querySelector("tbody").innerHTML += `
                  <tr>
         <td>${dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].attributes.ReasonsForReturn}</td>
         <td>${dataPro[i].attributes.AljihatAlmurjiea}</td>
         <td>${dataPro[i].attributes.data}</td>
         <td>${dataPro[i].attributes.Quantity}</td>
         <td>${dataPro[i].attributes.alwahda}</td>
         <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
         <td>${dataPro[i].attributes.ItemNo}</td>
         <td><button onclick="updateDate(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;            } 
           }else if (selectSearch.value == "data"){
            if(dataPro[i].attributes.data.includes(value)){
              document.querySelector("tbody").innerHTML += `
                <tr>
         <td>${dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].attributes.ReasonsForReturn}</td>
         <td>${dataPro[i].attributes.AljihatAlmurjiea}</td>
         <td>${dataPro[i].attributes.data}</td>
         <td>${dataPro[i].attributes.Quantity}</td>
         <td>${dataPro[i].attributes.alwahda}</td>
         <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
         <td>${dataPro[i].attributes.ItemNo}</td>
         <td><button onclick="updateDate(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;            } 
           }else if(selectSearch.value == "AljihatAlmurjiea"){
            if(dataPro[i].attributes.AljihatAlmurjiea.includes(value)){
              document.querySelector("tbody").innerHTML += `
                  <tr>
         <td>${dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].attributes.ReasonsForReturn}</td>
         <td>${dataPro[i].attributes.AljihatAlmurjiea}</td>
         <td>${dataPro[i].attributes.data}</td>
         <td>${dataPro[i].attributes.Quantity}</td>
         <td>${dataPro[i].attributes.alwahda}</td>
         <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
         <td>${dataPro[i].attributes.ItemNo}</td>
         <td><button onclick="updateDate(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;            } 
           }else if (selectSearch.value == "almaswuwl_fi_aljihat_almurjiea"){
            if(dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea.includes(value)){
              document.querySelector("tbody").innerHTML += `
                      <tr>
         <td>${dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].attributes.ReasonsForReturn}</td>
         <td>${dataPro[i].attributes.AljihatAlmurjiea}</td>
         <td>${dataPro[i].attributes.data}</td>
         <td>${dataPro[i].attributes.Quantity}</td>
         <td>${dataPro[i].attributes.alwahda}</td>
         <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
         <td>${dataPro[i].attributes.ItemNo}</td>
         <td><button onclick="updateDate(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;
        } 
      }

        }
       }

       if(value == ""){
        dataPro = [];
        ShowData();
      }
}


function Print(){
  const input = document.getElementById("InputSearch");
 window.location = `http://127.0.0.1:5500/FrontEnd/print/print.html?print=Almawadu_Almurjiea&&type=${selectSearch.value}&&Filter=${input.value}`
}
