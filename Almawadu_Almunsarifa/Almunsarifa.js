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
  axios.get("https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almunsarifas")
    .then((res) => {
      ShowData(res.data.data);
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
        <td>${item.attributes.almustalam}</td>
        <td>${item.attributes.aljihatAltaaliba}</td>
        <td>${item.attributes.data}</td>
        <td>${item.attributes.RaqmAltalab}</td>
        <td>${item.attributes.Quantity}</td>
        <td>${item.attributes.alwahda}</td>
        <td>${item.attributes.ItemNameAndDescription}</td>
        <td>${item.attributes.ItemNo}</td>
        <td><button onclick="updateAlmunsarifa(${item.id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
        <td><button onclick="deleteAlmunsarifa(${item.id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
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
  
  const data =  {
    almustalam: almustalam.value,
    aljihatAltaaliba: aljihatAltaaliba.value,
    RaqmAltalab: RaqmAltalab.value,
    alwahda: alwahda.value,
    Quantity: Quantity.value,
    ItemNo: ItemNo.value,
    ItemNameAndDescription: ItemNameAndDescription.value,
    data: splitData(data.value),
  }

  axios.post("https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almunsarifas", {data:data})
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
      getData();
    })
    .catch((err) => {
      console.log(err);
      createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
    });
});

function createCustody(Section,ClassResponsible,ExchangeDate,DescriptionCustody) {
  axios.post("https://positive-flower-edb7000224.strapiapp.com/admin/api/custodies", {
      data: {
        Section,
        ClassResponsible,
        ExchangeDate,
        DescriptionCustody,
      },
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
  axios.get(`https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almunsarifas/${id}`)
    .then((response) => {
      const res = response.data.data;
      almustalam.value = res.attributes.almustalam;
      aljihatAltaaliba.value = res.attributes.aljihatAltaaliba;
      RaqmAltalab.value = res.attributes.RaqmAltalab;
      alwahda.value = res.attributes.alwahda;
      Quantity.value = res.attributes.Quantity;
      ItemNameAndDescription.value = res.attributes.ItemNameAndDescription;
      ItemNo.value = res.attributes.ItemNo;
      data.value = res.attributes.data;
      return;
    })
    .catch((err) => {
      return err;
    });
}

// update
function updateAlmunsarifa(id) {
  FindOne(id);
  document.querySelector(".modal").style.display = "flex";
  document.querySelector(".buttons").innerHTML = `<button id="UpdateSubmit">تحديث المعلومات</button>`;

  document.getElementById("UpdateSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    
    const data =  {
      almustalam: almustalam.value,
      aljihatAltaaliba: aljihatAltaaliba.value,
      RaqmAltalab: RaqmAltalab.value,
      alwahda: alwahda.value,
      Quantity: Quantity.value,
      ItemNo: ItemNo.value,
      ItemNameAndDescription: ItemNameAndDescription.value,
      data: splitData(data.value),
    }

    axios.put(`https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almunsarifas/${id}`, {data:data})
      .then((res) => {
        createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت تعديل عهدة بنجاح");
        document.querySelector(".modal").style.display = "none";
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
  axios.delete(`https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almunsarifas/${id}`)
    .then((response) => {
      createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت تعديل عهدة بنجاح");
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
    console.log("hello");
    
   if(value != "" && selectSearch.value != "فلتر البحث"){
           if(selectSearch.value == "ItemNameAndDescription"){
              if(dataPro[i].attributes.ItemNameAndDescription.includes(value)){
                document.querySelector("tbody").innerHTML += `
                <tr>
                    <td>${dataPro[i].attributes.almustalam}</td>
                    <td>${dataPro[i].attributes.aljihatAltaaliba}</td>
                    <td>${dataPro[i].attributes.data}</td>
                    <td>${dataPro[i].attributes.RaqmAltalab}</td>
                    <td>${dataPro[i].attributes.Quantity}</td>
                    <td>${dataPro[i].attributes.alwahda}</td>
                    <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
                    <td>${dataPro[i].attributes.ItemNo}</td>
                    <td><button onclick="updateAlmunsarifa(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteAlmunsarifa(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
            `;
           }
           }else if(selectSearch.value == "ItemNo"){
            if(dataPro[i].attributes.ItemNo.includes(value)){
              document.querySelector("tbody").innerHTML += `
              <tr>
                  <td>${dataPro[i].attributes.almustalam}</td>
                  <td>${dataPro[i].attributes.aljihatAltaaliba}</td>
                  <td>${dataPro[i].attributes.data}</td>
                  <td>${dataPro[i].attributes.RaqmAltalab}</td>
                  <td>${dataPro[i].attributes.Quantity}</td>
                  <td>${dataPro[i].attributes.alwahda}</td>
                  <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
                  <td>${dataPro[i].attributes.ItemNo}</td>
                  <td><button onclick="updateAlmunsarifa(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
                  <td><button onclick="deleteAlmunsarifa(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
          `; }
           }else if (selectSearch.value == "alwahda"){
            if(dataPro[i].attributes.alwahda.includes(value)){
              document.querySelector("tbody").innerHTML += `
              <tr>
                  <td>${dataPro[i].attributes.almustalam}</td>
                  <td>${dataPro[i].attributes.aljihatAltaaliba}</td>
                  <td>${dataPro[i].attributes.data}</td>
                  <td>${dataPro[i].attributes.RaqmAltalab}</td>
                  <td>${dataPro[i].attributes.Quantity}</td>
                  <td>${dataPro[i].attributes.alwahda}</td>
                  <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
                  <td>${dataPro[i].attributes.ItemNo}</td>
                  <td><button onclick="updateAlmunsarifa(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
                  <td><button onclick="deleteAlmunsarifa(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
             </tr>
          `;
        } 
           } else if (selectSearch.value == "RaqmAltalab") {
            if(dataPro[i].attributes.RaqmAltalab.includes(value)){
              document.querySelector("tbody").innerHTML += `
              <tr>
                  <td>${dataPro[i].attributes.almustalam}</td>
                  <td>${dataPro[i].attributes.aljihatAltaaliba}</td>
                  <td>${dataPro[i].attributes.data}</td>
                  <td>${dataPro[i].attributes.RaqmAltalab}</td>
                  <td>${dataPro[i].attributes.Quantity}</td>
                  <td>${dataPro[i].attributes.alwahda}</td>
                  <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
                  <td>${dataPro[i].attributes.ItemNo}</td>
                  <td><button onclick="updateAlmunsarifa(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
                  <td><button onclick="deleteAlmunsarifa(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
          `;            } 
           }else if (selectSearch.value == "data"){
            if(dataPro[i].attributes.data.includes(value)){
              document.querySelector("tbody").innerHTML += `
              <tr>
                  <td>${dataPro[i].attributes.almustalam}</td>
                  <td>${dataPro[i].attributes.aljihatAltaaliba}</td>
                  <td>${dataPro[i].attributes.data}</td>
                  <td>${dataPro[i].attributes.RaqmAltalab}</td>
                  <td>${dataPro[i].attributes.Quantity}</td>
                  <td>${dataPro[i].attributes.alwahda}</td>
                  <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
                  <td>${dataPro[i].attributes.ItemNo}</td>
                  <td><button onclick="updateAlmunsarifa(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
                  <td><button onclick="deleteAlmunsarifa(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
          `;            } 
           }else if(selectSearch.value == "aljihatAltaaliba"){
            if(dataPro[i].attributes.aljihatAltaaliba.includes(value)){
              document.querySelector("tbody").innerHTML += `
              <tr>
                  <td>${dataPro[i].attributes.almustalam}</td>
                  <td>${dataPro[i].attributes.aljihatAltaaliba}</td>
                  <td>${dataPro[i].attributes.data}</td>
                  <td>${dataPro[i].attributes.RaqmAltalab}</td>
                  <td>${dataPro[i].attributes.Quantity}</td>
                  <td>${dataPro[i].attributes.alwahda}</td>
                  <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
                  <td>${dataPro[i].attributes.ItemNo}</td>
                  <td><button onclick="updateAlmunsarifa(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
                  <td><button onclick="deleteAlmunsarifa(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
          `;            } 
           }else if (selectSearch.value == "almustalam"){
            if(dataPro[i].attributes.almustalam.includes(value)){
              document.querySelector("tbody").innerHTML += `
              <tr>
                  <td>${dataPro[i].attributes.almustalam}</td>
                  <td>${dataPro[i].attributes.aljihatAltaaliba}</td>
                  <td>${dataPro[i].attributes.data}</td>
                  <td>${dataPro[i].attributes.RaqmAltalab}</td>
                  <td>${dataPro[i].attributes.Quantity}</td>
                  <td>${dataPro[i].attributes.alwahda}</td>
                  <td>${dataPro[i].attributes.ItemNameAndDescription}</td>
                  <td>${dataPro[i].attributes.ItemNo}</td>
                  <td><button onclick="updateAlmunsarifa(${dataPro[i].id})" id="update"><i class="fa-solid fa-pen"></i></button></td>
                  <td><button onclick="deleteAlmunsarifa(${dataPro[i].id})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
          `;
        } 
      }

        }
       }

       if(value == ""){
        dataPro = [];
        ShowData(await getData());
      }
   }
  
   

   // print
function Print() {
  const input = document.getElementById("InputSearch");
  window.location = `http://127.0.0.1:5500/FrontEnd/print/print.html?print=Almunsarifa&&type=${selectSearch.value}&&Filter=${input.value}`
}
