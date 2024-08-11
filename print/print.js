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
    const response = await axios.get("https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almunsarifas").then((res) => res).catch((err) => err);
    response.data.data.map((item) => dataPro.push(item));

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
    const response = await axios.get("https://positive-flower-edb7000224.strapiapp.com/admin/api/almawadu-almurjieas").then((res) => res).catch((err) => err);
    await response.data.data.map((item) => dataPro.push(item));

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
    const response = await axios.get("https://positive-flower-edb7000224.strapiapp.com/admin/api/custodies").then((res) => res).catch((err) => err);
    await response.data.data.map((item) => dataPro.push(item));

    return response;
  }
}

async function ShowData() {
  if (Print == "Almunsarifa") {
    SearchAlmunsarifa();
    document.title = "طباعة المواد المنصرفة";
  } else if (Print == "Almawadu_Almurjiea") {
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
        if (dataPro[i].attributes.ItemNameAndDescription.includes(Filter)) {
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
                 </tr>
             `;
        }
      } else if (type == "ItemNo") {
        if (dataPro[i].attributes.ItemNo.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "alwahda") {
        if (dataPro[i].attributes.alwahda.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "RaqmAltalab") {
        if (dataPro[i].attributes.RaqmAltalab.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "data") {
        if (dataPro[i].attributes.data.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "aljihatAltaaliba") {
        if (dataPro[i].attributes.aljihatAltaaliba.includes(Filter)) {
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
                 </tr>
           `;
        }
      } else if (type == "almustalam") {
        if (dataPro[i].attributes.almustalam.includes(Filter)) {
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
                 </tr>
           `;
        }
      }
    }
  }
  if (Filter == "" || (Filter == null && type == "فلتر البحث")) {
    dataPro = [];
    getData().then((res) => {
      res.data.data.map((item) => {
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
        `;
      });
    });
  }
}

async function search_Almawadu_Almurjiea() {
  await getData();
  document.querySelector("tbody").innerHTML = "";
  for (i = 0; i < dataPro.length; i++) {
    if (Filter != "" && type != "فلتر البحث") {
      if (type == "ItemNameAndDescription") {
        if (dataPro[i].attributes.ItemNameAndDescription.includes(Filter)) {
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
       </tr> 
            `;
        }
      } else if (type == "ItemNo") {
        if (dataPro[i].attributes.ItemNo.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "alwahda") {
        if (dataPro[i].attributes.alwahda.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "ReasonsForReturn") {
        if (dataPro[i].attributes.ReasonsForReturn.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "data") {
        if (dataPro[i].attributes.data.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "AljihatAlmurjiea") {
        if (dataPro[i].attributes.AljihatAlmurjiea.includes(Filter)) {
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
       </tr> 
          `;
        }
      } else if (type == "almaswuwl_fi_aljihat_almurjiea") {
        if (
          dataPro[i].attributes.almaswuwl_fi_aljihat_almurjiea.includes(Filter)
        ) {
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
       </tr> 
          `;
        }
      }
    }
  }

  if (Filter == "" || Filter == null) {
    dataPro = [];
    getData().then((response) => {
      const res = response.data.data;
      for (i = 0; i < res.length; i++) {
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
        if (item.attributes.CardNumber.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "TypeCustody") {
        if (item.attributes.TypeCustody.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "DescriptionCustody") {
        if (item.attributes.DescriptionCustody.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "ManufactureCompany") {
        if (item.attributes.ManufactureCompany.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "Code") {
        if (item.attributes.Code.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "LocationCustody") {
        if (item.attributes.LocationCustody.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "ExchangeDate") {
        if (item.attributes.ExchangeDate.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "ItemCondition") {
        if (item.attributes.ItemCondition.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      } else if (type == "DateOfExclusion") {
        if (item.attributes.DateOfExclusion.includes(Filter)) {
          document.querySelector("tbody").innerHTML += `
             <td>${item.attributes.ItemCondition}</td>
             <td>${item.attributes.ExchangeDate}</td>
             <td>${item.attributes.LocationCustody}</td>
             <td>${item.attributes.Code}</td>
             <td>${item.attributes.ManufactureCompany}</td>
             <td>${item.attributes.DescriptionCustody}</td>
             <td>${item.attributes.TypeCustody}</td>
             <td>${item.attributes.CardNumber}</td>
             <td>${item.attributes.ClassResponsible}</td>
                `;
        }
      }
    }
  });

  if (Filter == "") {
    document.querySelector("tbody").innerHTML = "";
    dataPro = [];
    getData().then((response) => {
      const res = response.data.data;
      res.map((item) => {
        document.querySelector("tbody").innerHTML += `
        <td>${item.attributes.ItemCondition}</td>
        <td>${item.attributes.ExchangeDate}</td>
        <td>${item.attributes.LocationCustody}</td>
        <td>${item.attributes.Code}</td>
        <td>${item.attributes.ManufactureCompany}</td>
        <td>${item.attributes.DescriptionCustody}</td>
        <td>${item.attributes.TypeCustody}</td>
        <td>${item.attributes.CardNumber}</td>
        <td>${item.attributes.ClassResponsible}</td>
           `;
      });
    });
  }
}
