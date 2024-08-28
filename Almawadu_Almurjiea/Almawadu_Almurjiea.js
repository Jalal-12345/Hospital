// get data 
function getData(){
  document.getElementById("loader-model").style.display="flex";
  const FindData = axios.get("https://hospital-admin-1yqz.onrender.com/api/almawadu-almurjieas")
  .then(res=>{
    
    document.getElementById("loader-model").style.opacity="0";
  setTimeout(()=>  document.getElementById("loader-model").style.display="none", 1000);
  return res;  
  })
  .catch(err=>console.log(err));
  return FindData;
}

// Show Data

let dataPro = [];

async function ShowData(){
  document.querySelector("tbody").innerHTML = '';
  const FindData = await getData();
  console.log(FindData);
  
  const res = FindData.data;
  res.map(item=>{
    dataPro.push(item);
    document.querySelector("tbody").innerHTML += `
    <tr>
         <td>${item.almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${item.ReasonsForReturn}</td>
         <td>${item.AljihatAlmurjiea}</td>
         <td>${item.data}</td>
         <td>${item.Quantity}</td>
         <td>${item.alwahda}</td>
         <td>${item.ItemNameAndDescription}</td>
         <td>${item.ItemNo}</td>
         <td><button onclick="updateDate('${item._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${item._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
`
  })

};
ShowData();

// split data

function splitData(data) {
  const cut = data.split("/");
  return cut[0];
}

// delete 

async function DeleteDate(id){
   console.log(id);
   axios.delete(`https://hospital-admin-1yqz.onrender.com/api/almawadu-almurjieas/${id}`)
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
  const getOne = axios.get(`https://hospital-admin-1yqz.onrender.com/api/almawadu-almurjieas/${id}`).then(res=>res).catch(err=>err);
  return getOne;
 }

 
async function updateDate(id){
  document.querySelector('.modal').style.display = "flex" 
  const response = await FindOne(id);
  console.log(response);
  const res = await response.data;

  document.querySelector(".ItemNo").value = res.ItemNo;
  document.querySelector(".ItemNameAndDescription").value = res.ItemNameAndDescription;
  document.querySelector(".alwahda").value = res.alwahda;
  document.querySelector(".Quantity").value = res.Quantity;
  document.querySelector(".data").value = res.data;
  document.querySelector(".AljihatAlmurjiea").value = res.AljihatAlmurjiea;
  document.querySelector(".almaswuwl_fi_aljihat_almurjiea").value = res.almaswuwl_fi_aljihat_almurjiea;
  document.querySelector(".ReasonsForReturn").value = res.ReasonsForReturn;

  // click submit 

  document.getElementById("submit").addEventListener("click", (e)=>{
     e.preventDefault();


      axios.put(`https://hospital-admin-1yqz.onrender.com/api/almawadu-almurjieas/${id}`, {

      ItemNo: document.querySelector(".ItemNo").value,
      ItemNameAndDescription: document.querySelector(".ItemNameAndDescription").value,
      alwahda:document.querySelector(".alwahda").value,
      Quantity: document.querySelector(".Quantity").value,
      data: splitData(document.querySelector(".data").value),
      AljihatAlmurjiea: document.querySelector(".AljihatAlmurjiea").value,
      ReasonsForReturn: document.querySelector(".ReasonsForReturn").value,
      almaswuwl_fi_aljihat_almurjiea:document.querySelector(".almaswuwl_fi_aljihat_almurjiea").value

      }).then(res=>{
        createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت تعديل عهدة بنجاح");
        document.querySelector("tbody").innerHTML = "";
        document.querySelector('.modal').style.display = "none"; 
        ShowData();
      })
      .catch(err=>{
        createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
        console.log(err);
      });
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
  for (i = 0; i < dataPro.length ; i++) {
    if (value != "" && selectSearch.value != "فلتر البحث") {  
      if (selectSearch.value == "ItemNameAndDescription") {
        if (dataPro[i].ItemNameAndDescription.includes(value)) {
          document.querySelector("tbody").innerHTML += `
              <tr>
         <td>${dataPro[i].almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].ReasonsForReturn}</td>
         <td>${dataPro[i].AljihatAlmurjiea}</td>
         <td>${dataPro[i].data}</td>
         <td>${dataPro[i].Quantity}</td>
         <td>${dataPro[i].alwahda}</td>
         <td>${dataPro[i].ItemNameAndDescription}</td>
         <td>${dataPro[i].ItemNo}</td>
         <td><button onclick="updateDate('${dataPro[i]._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${dataPro[i]._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
            `;
        }
      } else if (selectSearch.value == "ItemNo") {
        if (dataPro[i].ItemNo.includes(value)) {
          document.querySelector("tbody").innerHTML += `
          <tr>
         <td>${dataPro[i].almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].ReasonsForReturn}</td>
         <td>${dataPro[i].AljihatAlmurjiea}</td>
         <td>${dataPro[i].data}</td>
         <td>${dataPro[i].Quantity}</td>
         <td>${dataPro[i].alwahda}</td>
         <td>${dataPro[i].ItemNameAndDescription}</td>
         <td>${dataPro[i].ItemNo}</td>
         <td><button onclick="updateDate('${dataPro[i]._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${dataPro[i]._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;
        }
      } else if (selectSearch.value == "alwahda") {
        if (dataPro[i].alwahda.includes(value)) {
          document.querySelector("tbody").innerHTML += `
          <tr>
         <td>${dataPro[i].almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].ReasonsForReturn}</td>
         <td>${dataPro[i].AljihatAlmurjiea}</td>
         <td>${dataPro[i].data}</td>
         <td>${dataPro[i].Quantity}</td>
         <td>${dataPro[i].alwahda}</td>
         <td>${dataPro[i].ItemNameAndDescription}</td>
         <td>${dataPro[i].ItemNo}</td>
         <td><button onclick="updateDate('${dataPro[i]._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${dataPro[i]._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;
        }
      } else if (selectSearch.value == "ReasonsForReturn") {
        if (dataPro[i].ReasonsForReturn.includes(value)) {
          document.querySelector("tbody").innerHTML += `
          <tr>
         <td>${dataPro[i].almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].ReasonsForReturn}</td>
         <td>${dataPro[i].AljihatAlmurjiea}</td>
         <td>${dataPro[i].data}</td>
         <td>${dataPro[i].Quantity}</td>
         <td>${dataPro[i].alwahda}</td>
         <td>${dataPro[i].ItemNameAndDescription}</td>
         <td>${dataPro[i].ItemNo}</td>
         <td><button onclick="updateDate('${dataPro[i]._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${dataPro[i]._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;
        }
      } else if (selectSearch.value == "data") {
        if (dataPro[i].data.includes(value)) {
          document.querySelector("tbody").innerHTML += `
          <tr>
         <td>${dataPro[i].almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].ReasonsForReturn}</td>
         <td>${dataPro[i].AljihatAlmurjiea}</td>
         <td>${dataPro[i].data}</td>
         <td>${dataPro[i].Quantity}</td>
         <td>${dataPro[i].alwahda}</td>
         <td>${dataPro[i].ItemNameAndDescription}</td>
         <td>${dataPro[i].ItemNo}</td>
         <td><button onclick="updateDate('${dataPro[i]._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${dataPro[i]._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;
        }
      } else if (selectSearch.value == "AljihatAlmurjiea") {
        if (dataPro[i].AljihatAlmurjiea.includes(value)) {
          document.querySelector("tbody").innerHTML += `
          <tr>
         <td>${dataPro[i].almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].ReasonsForReturn}</td>
         <td>${dataPro[i].AljihatAlmurjiea}</td>
         <td>${dataPro[i].data}</td>
         <td>${dataPro[i].Quantity}</td>
         <td>${dataPro[i].alwahda}</td>
         <td>${dataPro[i].ItemNameAndDescription}</td>
         <td>${dataPro[i].ItemNo}</td>
         <td><button onclick="updateDate('${dataPro[i]._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${dataPro[i]._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
       </tr> 
          `;
        }
      } else if (selectSearch.value == "almaswuwl_fi_aljihat_almurjiea") {
        if (
          dataPro[i].almaswuwl_fi_aljihat_almurjiea.includes(value)
        ) {
          document.querySelector("tbody").innerHTML += `
                  <tr>
         <td>${dataPro[i].almaswuwl_fi_aljihat_almurjiea}</td>
         <td>${dataPro[i].ReasonsForReturn}</td>
         <td>${dataPro[i].AljihatAlmurjiea}</td>
         <td>${dataPro[i].data}</td>
         <td>${dataPro[i].Quantity}</td>
         <td>${dataPro[i].alwahda}</td>
         <td>${dataPro[i].ItemNameAndDescription}</td>
         <td>${dataPro[i].ItemNo}</td>
         <td><button onclick="updateDate('${dataPro[i]._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
         <td><button onclick="DeleteDate('${dataPro[i]._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
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
 window.location = `http://127.0.0.1:5500/FrontEnd/print/print.html?print=Almawadu_Almurjiea&&selectSearch.value=${selectSearch.value}&&value=${input.value}`
}
