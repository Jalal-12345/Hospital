const urlParams = new URLSearchParams(window.location.search);
const Print = urlParams.get("print");
const type = urlParams.get("type");
const Filter = urlParams.get("Filter");
let dataPro = [];
console.log(Filter);
console.log(Print);
console.log(type);

async function getData() {
  if (Print == "Almunsarifa") {
    document.querySelector("thead").innerHTML = `
<tr>
              <th>المستلم</th>
              <th>الجهة الطالبة</th>
              <th>التاريخ</th>
              <th>رقم الطلب</th>
              <th>الكمية</th>
              <th>الوحدة</th>
              <th>إسم الصنف ووصفه</th>
              <th>رقم الصنف</th>
</tr>`;
    const response = await axios.get("https://hospital-admin-1yqz.onrender.com/almawadu-almunsarifas").then((res) => res).catch((err) => err);
    response.data.map((item) => dataPro.push(item));

    return response;
  } else if (Print == "Almawadu_Almurjiea") {
    document.querySelector("thead").innerHTML = `
    <tr>
            <th>المسؤول في الجهة الإرجاع</th>
            <th>الأسباب الإرجاع</th>
            <th>الجهة المرجعة</th>
            <th>التاريخ</th>
            <th>الكمية</th>
            <th>الوحدة</th>
            <th>إسم الصنف ووصفه</th>
            <th>رقم الصنف</th>
    </tr>`;
    const response = await axios.get("https://hospital-admin-1yqz.onrender.com/api/almawadu-almurjieas").then((res) => res).catch((err) => err);
    await response.data.map((item) => dataPro.push(item));
    
    return response;
  } else if (Print == "Costody") {
    document.querySelector("thead").innerHTML = `
    <tr>
              <th>حالة الصنف</th>
              <th>تاريخ الصرف</th>
              <th>موقع العهدة</th>
              <th>رقم المصنع(كود)</th>
              <th>الشركة المصنعة</th>
              <th>وصف العهدة</th>
              <th>نوع العهدة</th>
              <th>رقم البطاقة</th>
              <th>مسؤول القسم</th>
    </tr>`;
    const response = await axios.get("https://hospital-admin-1yqz.onrender.com/api/custodies").then((res) => res).catch((err) => err);
    await response.data.map((item) => dataPro.push(item));

    return response;
  }
}

async function ShowData() {
  if (Print == "Almunsarifa") {
    SearchAlmunsarifa();
    console.log(await getData());
    document.title = "طباعة المواد المنصرفة";
  } else if (Print == "Almawadu_Almurjiea") {
    console.log(dataPro);
    search_Almawadu_Almurjiea();
    document.title = "طباعة المواد المرجعة";
  } else if (Print == "Costody") {
    searchCostody();
    document.title = "طباعة العهدة";
  }
}
ShowData();

async function SearchAlmunsarifa() {
  await getData();
  document.querySelector("tbody").innerHTML = "";
  for (i = 0; i < dataPro.length; i++) {
    console.log("hello");

    if (Filter != "" && type != "فلتر البحث") {
      if (type == "ItemNameAndDescription") {
        if (dataPro[i].ItemNameAndDescription.includes(Filter)) {
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
                 </tr>
             `;
        }
      } else if (type == "ItemNo") {
        if (dataPro[i].ItemNo.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "alwahda") {
        if (dataPro[i].alwahda.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "RaqmAltalab") {
        if (dataPro[i].RaqmAltalab.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "data") {
        if (dataPro[i].data.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "aljihatAltaaliba") {
        if (dataPro[i].aljihatAltaaliba.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "almustalam") {
        if (dataPro[i].almustalam.includes(Filter)) {
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
                 </tr>
           `;
        }
      }
    }
  }
  if (Filter == "" || (Filter == null && type == "فلتر البحث")) {
    dataPro = [];
    getData().then((res) => {
      res.data.map((item) => {
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
        `;
      });
    });
  }
}

async function search_Almawadu_Almurjiea() {
  await getData();
  document.querySelector("tbody").innerHTML = "";
  for (i = 0; i < dataPro.length ; i++) {
    if (Filter != "" && type != "فلتر البحث") {
      if (type == "ItemNameAndDescription") {
        if (dataPro[i].ItemNameAndDescription.includes(Filter)) {
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
       </tr> 
            `;
        }
      } else if (type == "ItemNo") {
        if (dataPro[i].ItemNo.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "alwahda") {
        if (dataPro[i].alwahda.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "ReasonsForReturn") {
        if (dataPro[i].ReasonsForReturn.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "data") {
        if (dataPro[i].data.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "AljihatAlmurjiea") {
        if (dataPro[i].AljihatAlmurjiea.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "almaswuwl_fi_aljihat_almurjiea") {
        if (
          dataPro[i].almaswuwl_fi_aljihat_almurjiea.includes(Filter)
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
       </tr> 
          `;
        }
      }
    }
  }

  if (Filter == "" || Filter == null) {
    dataPro = [];
    getData().then((response) => {
      const res = response.data;
      for (i = 0; i < res.length; i++) {
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
       </tr> 
           `;
      }
    });
  }
}

async function searchCostody() {
  await getData();
  document.querySelector("tbody").innerHTML = "";
  dataPro.map((item) => {
    if (Filter != "") {
      if (type == "CardNumber") {
        if (item.CardNumber.includes(Filter)) {
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
                `;
        }
      } else if (type == "TypeCustody") {
        if (item.TypeCustody.includes(Filter)) {
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
                `;
        }
      } else if (type == "DescriptionCustody") {
        if (item.DescriptionCustody.includes(Filter)) {
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
                `;
        }
      } else if (type == "ManufactureCompany") {
        if (item.ManufactureCompany.includes(Filter)) {
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
                `;
        }
      } else if (type == "Code") {
        if (item.Code.includes(Filter)) {
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
                `;
        }
      } else if (type == "LocationCustody") {
        if (item.LocationCustody.includes(Filter)) {
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
                `;
        }
      } else if (type == "ExchangeDate") {
        if (item.ExchangeDate.includes(Filter)) {
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
                `;
        }
      } else if (type == "ItemCondition") {
        if (item.ItemCondition.includes(Filter)) {
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
                `;
        }
      } else if (type == "DateOfExclusion") {
        if (item.DateOfExclusion.includes(Filter)) {
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
                `;
        }
      }
    }
  });

  if (Filter == "") {
    document.querySelector("tbody").innerHTML = "";
    dataPro = [];
    getData().then((response) => {
      const res = response.data;
      res.map((item) => {
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
           `;
      });
    });
  }
}
