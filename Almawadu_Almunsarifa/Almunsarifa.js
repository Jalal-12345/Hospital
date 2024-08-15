

// var document
const almustalam = document.querySelector(".almustalam");
const aljihatAltaaliba = document.querySelector(".aljihatAltaaliba");
const RaqmAltalab = document.querySelector(".RaqmAltalab");
const alwahda = document.querySelector(".alwahda");
const Quantity = document.querySelector(".Quantity");
const ItemNo = document.querySelector(".ItemNo");
const ItemNameAndDescription = document.querySelector(".ItemNameAndDescription");
const data = document.querySelector(".data");
let dataPro = [];
// get data and show data

function getData() {
  axios.get("https://hospital-admin-1yqz.onrender.com/api/almawadu-almunsarifas")
    .then((res) => {
      console.log(res);
      ShowData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
getData();

function ShowData(res) {
  document.querySelector("tbody").innerHTML = "";
  res.map((item) => {
    dataPro.push(item);
    document.querySelector("tbody").innerHTML += `
    <tr>
        <td>${item.almustalam}</td>
        <td>${item.aljihatAltaaliba}</td>
        <td>${item.data}</td>
        <td>${item.RaqmAltalab}</td>
        <td>${item.Quantity}</td>
        <td>${item.alwahda}</td>
        <td>${item.ItemNameAndDescription}</td>
        <td>${item.ItemNo}</td>
        <td><button onclick="updateAlmunsarifa('${item._id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
        <td><button onclick="deleteAlmunsarifa('${item._id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
      </tr>
`;
  });
}

// split data
function splitData(data) {
  const cut = data.split("/");
  return cut[0];
}

// modal start //

document.querySelector(".create").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "flex";
  document.querySelector(".buttons").innerHTML = `<button id="submit">إرسال</button>`;
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
  almustalam.value = "";
  aljihatAltaaliba.value = "";
  RaqmAltalab.value = "";
  alwahda.value = "";
  Quantity.value = "";
  ItemNo.value = "";
  ItemNameAndDescription.value = "";
  data.value = "";
});

// modal end //

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

  newToast.timOut = setTimeout(() =>  newToast.remove(), 5000);
}

// toast end //

// create start //

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();


  axios.post("https://hospital-admin-1yqz.onrender.com/api/almawadu-almunsarifas", {
    almustalam: almustalam.value,
    aljihatAltaaliba: aljihatAltaaliba.value,
    RaqmAltalab: RaqmAltalab.value,
    alwahda: alwahda.value,
    Quantity: Quantity.value,
    ItemNo: ItemNo.value,
    ItemNameAndDescription: ItemNameAndDescription.value,
    data: splitData(data.value),
  })
    .then((response) => {
      createCustody(
        aljihatAltaaliba.value,
        almustalam.value,
        splitData(data.value),
        ItemNameAndDescription.value
      );
      almustalam.value = "";
      aljihatAltaaliba.value = "";
      RaqmAltalab.value = "";
      alwahda.value = "";
      Quantity.value = "";
      ItemNo.value = "";
      ItemNameAndDescription.value = "";
      data.value = "";
      document.querySelector(".modal").style.display = "none";
      createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت إضافة عهدة جديدة");
      dataPro = [];
      getData();
    })
    .catch((err) => {
      console.log(err);
      createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
    });
});

function createCustody(Section,ClassResponsible,ExchangeDate,DescriptionCustody) {
  axios.post("https://hospital-admin-1yqz.onrender.com/api/custodies", {
        Section,
        ClassResponsible,
        ExchangeDate,
        DescriptionCustody,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

// create end //

// FindOne

function FindOne(id) {
  axios.get(`https://hospital-admin-1yqz.onrender.com/api/almawadu-almunsarifas/${id}`)
    .then((response) => {
      console.log(response);
      const res = response.data;
      almustalam.value = res.almustalam;
      aljihatAltaaliba.value = res.aljihatAltaaliba;
      RaqmAltalab.value = res.RaqmAltalab;
      alwahda.value = res.alwahda;
      Quantity.value = res.Quantity;
      ItemNameAndDescription.value = res.ItemNameAndDescription;
      ItemNo.value = res.ItemNo;
      data.value = res.data;
      return;
    })
    .catch((err) => {
      return err;
    });
}

// update
function updateAlmunsarifa(id) {
  console.log(typeof id);
  FindOne(id);
  document.querySelector(".modal").style.display = "flex";
  document.querySelector(".buttons").innerHTML = `<button id="UpdateSubmit">تحديث المعلومات</button>`;

  document.getElementById("UpdateSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    
    axios.put(`https://hospital-admin-1yqz.onrender.com/api/almawadu-almunsarifas/${id}`, {
      almustalam: almustalam.value,
      aljihatAltaaliba: aljihatAltaaliba.value,
      RaqmAltalab: RaqmAltalab.value,
      alwahda: alwahda.value,
      Quantity: Quantity.value,
      ItemNo: ItemNo.value,
      ItemNameAndDescription: ItemNameAndDescription.value,
      data: splitData(data.value)
    })
      .then((res) => {
        createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت تعديل عهدة بنجاح");
        document.querySelector(".modal").style.display = "none";
        dataPro = [];
        getData();
      })
      .catch((err) => {
        console.log(err);
        createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
      });
  });
}

// delete

function deleteAlmunsarifa(id) {
  axios.delete(`https://hospital-admin-1yqz.onrender.com/api/almawadu-almunsarifas/${id}`)
    .then((response) => {
      createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت حذف عهدة بنجاح");
      dataPro = [];
      getData();
    })
    .catch((err) => {
      console.log(err);
      createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
    });
}

// Search
const selectSearch = document.querySelector("select")


async function Search(value){
  document.querySelector("tbody").innerHTML = "";
  for(i=0; i<dataPro.length; i++){
   if(value != "" && selectSearch.value != "فلتر البحث"){
           if(selectSearch.value == "ItemNameAndDescription"){
              if(dataPro[i].ItemNameAndDescription.includes(value)){
                document.querySelector("tbody").innerHTML += `
                <tr>
                    <td>${dataPro[i].almustalam}</td>
                    <td>${dataPro[i].aljihatAltaaliba}</td>
                    <td>${dataPro[i].data}</td>
                    <td>${dataPro[i].RaqmAltalab}</td>
                    <td>${dataPro[i].Quantity}</td>
                    <td>${dataPro[i].alwahda}</td>
                    <td>${dataPro[i].ItemNameAndDescription}</td>
                    <td>${dataPro[i].ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa('${dataPro[i].id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa('${dataPro[i].id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
            `;
           }
           }else if(selectSearch.value == "ItemNo"){
            if(dataPro[i].ItemNo.includes(value)){
              document.querySelector("tbody").innerHTML += `
                <tr>
                    <td>${dataPro[i].almustalam}</td>
                    <td>${dataPro[i].aljihatAltaaliba}</td>
                    <td>${dataPro[i].data}</td>
                    <td>${dataPro[i].RaqmAltalab}</td>
                    <td>${dataPro[i].Quantity}</td>
                    <td>${dataPro[i].alwahda}</td>
                    <td>${dataPro[i].ItemNameAndDescription}</td>
                    <td>${dataPro[i].ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa('${dataPro[i].id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa('${dataPro[i].id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
          `; }
           }else if (selectSearch.value == "alwahda"){
            if(dataPro[i].alwahda.includes(value)){
              document.querySelector("tbody").innerHTML += `
                  <tr>
                    <td>${dataPro[i].almustalam}</td>
                    <td>${dataPro[i].aljihatAltaaliba}</td>
                    <td>${dataPro[i].data}</td>
                    <td>${dataPro[i].RaqmAltalab}</td>
                    <td>${dataPro[i].Quantity}</td>
                    <td>${dataPro[i].alwahda}</td>
                    <td>${dataPro[i].ItemNameAndDescription}</td>
                    <td>${dataPro[i].ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa('${dataPro[i].id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa('${dataPro[i].id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
          `;
        } 
           } else if (selectSearch.value == "RaqmAltalab") {
            if(dataPro[i].RaqmAltalab.includes(value)){
              document.querySelector("tbody").innerHTML += `
                  <tr>
                    <td>${dataPro[i].almustalam}</td>
                    <td>${dataPro[i].aljihatAltaaliba}</td>
                    <td>${dataPro[i].data}</td>
                    <td>${dataPro[i].RaqmAltalab}</td>
                    <td>${dataPro[i].Quantity}</td>
                    <td>${dataPro[i].alwahda}</td>
                    <td>${dataPro[i].ItemNameAndDescription}</td>
                    <td>${dataPro[i].ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa('${dataPro[i].id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa('${dataPro[i].id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
          `;            } 
           }else if (selectSearch.value == "data"){
            if(dataPro[i].data.includes(value)){
              document.querySelector("tbody").innerHTML += `
            <tr>
                    <td>${dataPro[i].almustalam}</td>
                    <td>${dataPro[i].aljihatAltaaliba}</td>
                    <td>${dataPro[i].data}</td>
                    <td>${dataPro[i].RaqmAltalab}</td>
                    <td>${dataPro[i].Quantity}</td>
                    <td>${dataPro[i].alwahda}</td>
                    <td>${dataPro[i].ItemNameAndDescription}</td>
                    <td>${dataPro[i].ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa('${dataPro[i].id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa('${dataPro[i].id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
          `;            } 
           }else if(selectSearch.value == "aljihatAltaaliba"){
            if(dataPro[i].aljihatAltaaliba.includes(value)){
              document.querySelector("tbody").innerHTML += `
                <tr>
                    <td>${dataPro[i].almustalam}</td>
                    <td>${dataPro[i].aljihatAltaaliba}</td>
                    <td>${dataPro[i].data}</td>
                    <td>${dataPro[i].RaqmAltalab}</td>
                    <td>${dataPro[i].Quantity}</td>
                    <td>${dataPro[i].alwahda}</td>
                    <td>${dataPro[i].ItemNameAndDescription}</td>
                    <td>${dataPro[i].ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa('${dataPro[i].id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa('${dataPro[i].id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
          `;            } 
           }else if (selectSearch.value == "almustalam"){
            if(dataPro[i].almustalam.includes(value)){
              document.querySelector("tbody").innerHTML += `
            <tr>
                    <td>${dataPro[i].almustalam}</td>
                    <td>${dataPro[i].aljihatAltaaliba}</td>
                    <td>${dataPro[i].data}</td>
                    <td>${dataPro[i].RaqmAltalab}</td>
                    <td>${dataPro[i].Quantity}</td>
                    <td>${dataPro[i].alwahda}</td>
                    <td>${dataPro[i].ItemNameAndDescription}</td>
                    <td>${dataPro[i].ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa('${dataPro[i].id}')" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa('${dataPro[i].id}')" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
          `;
        } 
      }

        }
       }

       if(value == ""){
        dataPro = [];
        getData();
      }
   }
  
   

   // print
function Print() {
  const input = document.getElementById("InputSearch");
  window.location = `https://jalal-12345.github.io/hospital/print/print.html?print=Almunsarifa&&type=${selectSearch.value}&&Filter=${input.value}`
}
