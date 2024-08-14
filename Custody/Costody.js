// var document
const section = document.querySelector(".section");
const classResponsible = document.querySelector(".classResponsible");
const CardNumber = document.querySelector(".CardNumber");
const TypeCustody = document.querySelector(".TypeCustody");
const DescriptionCustody = document.querySelector(".DescriptionCustody");
const ManufactureCompany = document.querySelector(".ManufactureCompany");
const Code = document.querySelector(".Code");
const LocationCustody = document.querySelector(".LocationCustody");
const ExchangeDate = document.querySelector(".ExchangeDate");
const ItemCondition = document.querySelector(".ItemCondition");
const DateOfExclusion = document.querySelector(".DateOfExclusion");
const SelectSection = document.querySelector(".selectSection");
let dataPro = [];
console.log(section);

// start  get Costody //

function getData() {
  axios
    .get("https://hospital-admin-1yqz.onrender.com/api/custodies")
    .then(function (response) {
      ShowData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getData();
// end get custody //

// select section ;
SelectSection.addEventListener("change", () => {
  getData();
  document.title = "العهدة " + SelectSection.value;
});

SelectSection.value = "التمريض";

// start show data //

function ShowData(res) {
  document.querySelector("tbody").innerHTML = "";
  const resFilter = res.filter((item) => {
    return item.Section == SelectSection.value;
  });

  resFilter.reverse();

  resFilter.map((item) => {
    document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item._id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item._id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item._id}')" class="return">ترجيع</button></td>
            `;
    classResponsible.value = item.ClassResponsible;
    dataPro = resFilter;
  });
}

// end show data //

// split data
function splitData(data) {
  const cut = data.split("/");
  return cut[0];
}
// post costody
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  axios.post("https://hospital-admin-1yqz.onrender.com/api/custodies", {
    Section: section.value,
    ClassResponsible: classResponsible.value,
    CardNumber: CardNumber.value,
    TypeCustody: TypeCustody.value,
    DescriptionCustody: DescriptionCustody.value,
    ManufactureCompany: ManufactureCompany.value,
    Code: Code.value,
    LocationCustody: LocationCustody.value,
    ExchangeDate: splitData(ExchangeDate.value),
    ItemCondition: ItemCondition.value,
    })
    .then(function (response) {
      section.value = "";
      classResponsible.value = "";
      CardNumber.value = "";
      TypeCustody.value = "";
      DescriptionCustody.value = "";
      ManufactureCompany.value = "";
      Code.value = "";
      LocationCustody.value = "";
      ExchangeDate.value = "";
      ItemCondition.value = "";
      document.querySelector(".modal").style.display = "none";
      createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت إضافة عهدة جديدة");
      getData();
    })
    .catch(function (error) {
      console.log(error);
      createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
    });
});

// modal

document.querySelector(".create").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "flex";

  document.querySelector(".buttons").innerHTML = `<button type="submit" id="submit">إرسال</button>`;

  document.querySelectorAll("input , textarea").forEach((item) => {
    item.value = "";
  });

  section.value = SelectSection.value;
  getData();
});

document.querySelectorAll(".close").forEach((item) => {
  item.addEventListener("click", (e) => {
  document.querySelectorAll(".modal").forEach((item) => {
      item.style.display = "none";
    });
  });
});

// find One Date
function FindOneData(id) {
  const getOne = () =>
    axios.get(`https://hospital-admin-1yqz.onrender.com/api/custodies/${id}`).then((response) => response).catch((err) => {
        createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما"),
        console.log(err);
      });
  return getOne();
}

// update
async function updateCostody(id) {
  document.querySelector(".modal").style.display = "flex";
  document.querySelector(".buttons").innerHTML = `<button type="submit" id="SubmitUpdate"> تحديث المعلومات</button>`;

  const FindOne = await FindOneData(id);
  console.log(FindOne);
  
  const res = FindOne.data;

  section.value = res.Section;
  classResponsible.value = res.ClassResponsible;
  CardNumber.value = res.CardNumber;
  TypeCustody.value = res.TypeCustody;
  DescriptionCustody.value = res.DescriptionCustody;
  ManufactureCompany.value = res.ManufactureCompany;
  Code.value = res.Code;
  LocationCustody.value = res.LocationCustody;
  ExchangeDate.value = res.ExchangeDate;
  ItemCondition.value = res.ItemCondition;
   


  document.querySelector("form > .buttons > #SubmitUpdate").addEventListener("click", (e) => {
      e.preventDefault();
      axios.put(`https://hospital-admin-1yqz.onrender.com/api/custodies/${id}`, {
        Section: section.value,
        ClassResponsible: classResponsible.value,
        CardNumber: CardNumber.value,
        TypeCustody: TypeCustody.value,
        DescriptionCustody: DescriptionCustody.value,
        ManufactureCompany: ManufactureCompany.value,
        Code: Code.value,
        LocationCustody: LocationCustody.value,
        ExchangeDate: splitData(ExchangeDate.value),
        ItemCondition: ItemCondition.value,
      })
        .then((response) => {
          document.querySelector(".modal").style.display = "none";
          createToast("succses","#2d6a4f","fa-solid fa-circle-check","تم تحديث معلومات العهدة بنجاح");
          getData();
        })
        .catch((err) => {
          console.log(err);
          createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
        });
    });
}

// delete
function deleteCostody(id) {
  axios.delete(`https://hospital-admin-1yqz.onrender.com/api/custodies/${id}`)
  .then((response) => {
      createToast("succses","#2d6a4f","fa-solid fa-circle-check","تم حذف عهدة بنجاح");
      getData();
    })
    .catch((err) => {
      console.log(err);
      createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
    });
}



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

  newToast.timOut = setTimeout(() => newToast.remove(), 5000);
}

// return Custody

async function returnCustody(id) {
  document.querySelectorAll(".modal")[1].style.display = "flex";
  const FindOne = await FindOneData(id);
  const res = FindOne.data;

  document.querySelector(".almaswuwl_fi_aljihat_almurjiea").value =res.ClassResponsible;
  document.querySelector(".AljihatAlmurjiea").value = res.Section;
  document.querySelector(".ItemNameAndDescription").value = res.DescriptionCustody;

  document.querySelector("#return").addEventListener("click", (e) => {
    e.preventDefault();

    axios.post("https://hospital-admin-1yqz.onrender.com/api/almawadu-almurjieas", {
      ItemNo: document.querySelector(".ItemNo").value,
      ItemNameAndDescription: document.querySelector(".ItemNameAndDescription").value,
      alwahda: document.querySelector(".alwahda").value,
      Quantity: document.querySelector(".Quantity").value,
      data: splitData(document.querySelector(".data").value),
      AljihatAlmurjiea: document.querySelector(".AljihatAlmurjiea").value,
      ReasonsForReturn: document.querySelector(".ReasonsForReturn").value,
      almaswuwl_fi_aljihat_almurjiea: document.querySelector(".almaswuwl_fi_aljihat_almurjiea").value,
    })
      .then((response) => {
        createToast("succses","#2d6a4f","fa-solid fa-circle-check","تمت ترجيع عهدة بنجاح");
        document.querySelectorAll(".modal")[1].style.display = "none";
        deleteCostody(id);
      })
      .catch((err) => {
        console.log(err);
        createToast("error","#d00000","fa-solid fa-circle-exclamation","لقد حصلت مشكلة ما");
      });
  });
}

let select = "";
// select
function selectOption() {
  const selection = document.querySelector(".box-Search > select");
  selection.addEventListener("change", () => {
    select = selection.value;
  });
}
selectOption();

// search
function searchCostody(value) {
  document.querySelector("tbody").innerHTML = "";
  dataPro.map((item) => {
    if (value != "") {
      if (select == "CardNumber") {
        if (item.CardNumber.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "TypeCustody") {
        if (item.TypeCustody.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "DescriptionCustody") {
        if (item.DescriptionCustody.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "ManufactureCompany") {
        if (item.ManufactureCompany.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "Code") {
        if (item.Code.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "LocationCustody") {
        if (item.LocationCustody.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "ExchangeDate") {
        if (item.ExchangeDate.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "ItemCondition") {
        if (item.ItemCondition.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      } else if (select == "DateOfExclusion") {
        if (item.DateOfExclusion.includes(value)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.ItemCondition}</td>
             <td>${item.ExchangeDate}</td>
             <td>${item.LocationCustody}</td>
             <td>${item.Code}</td>
             <td>${item.ManufactureCompany}</td>
             <td>${item.DescriptionCustody}</td>
             <td>${item.TypeCustody}</td>
             <td>${item.CardNumber}</td>
             <td>${item.ClassResponsible}</td>
             <td><button onclick="updateCostody('${item.id}')" class="update"><i class="fa-solid fa-pen"></i></button></td>
             <td><button onclick="deleteCostody('${item.id}')" class="delete"><i class="fa-solid fa-trash"></i></button></td>
             <td><button onclick="returnCustody('${item.id}')" class="return">ترجيع</button></td>
                `;
        }
      }
    }
  });

  if (value == "") {
    getData();
  }
}
const selection = document.querySelector(".box-Search > select");
// print
function Print() {
  const input = document.getElementById("InputSearch");
  window.location = `http://127.0.0.1:5500/FrontEnd/print/print.html?print=Costody&&type=${selection.value}&&Filter=${input.value}`;
};
