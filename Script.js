let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("Ads");
let dis = document.getElementById("dis");
let total = document.getElementById("total");
let count = document.getElementById("count");
let Category = document.getElementById("category");
let submit = document.getElementById("submit");
let flag='create';
let tm;
let ss=document.getElementById("cleardata");
ss.onclick=()=>{
    localStorage.clear();
}
//dd
//Bisher
function getTotal() {
    if (price.value !== '') {
        let Res = (+price.value + +taxes.value + +ads.value) - +dis.value;
        total.innerHTML = Res;
        total.style.background = "green";

    } else {
        total.innerHTML = '';
        total.style.background = "red";
    }

}


let dataproduct;
if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product);
} else {
    dataproduct = [];
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    dis.value = '';
    total.innerHTML = '';
    count.value = '';
    Category.value = '';
}


submit.onclick = () => {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: dis.value,
        total: total.innerHTML,
        count: count.value,
        category: Category.value
    }
    if(flag === "create") {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                dataproduct.push(newProduct);
            }
        } else {
            dataproduct.push(newProduct);
        }
    }else
    {
dataproduct[tm]=newProduct;
flag="create";
submit.innerHTML='create';
count.style.display='block';
    }

    localStorage.setItem('product', JSON.stringify(dataproduct));
    clearData();
showData();

}

function showData() {
    getTotal();
    let table='';
    for(let i=0;i<dataproduct.length;i++)
    {
        table +=`  <tr>
                   <td>${i}</td>
                  <td>${dataproduct[i].title}</td>
                  <td>${dataproduct[i].price}</td>
                  <td>${dataproduct[i].taxes}</td>
                 <td>${dataproduct[i].discount}</td>
               <td>${dataproduct[i].total}</td>
                 <td>${dataproduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
               </tr>`;

    }
document.getElementById('tbody').innerHTML=table;
    let deltebtn=document.getElementById("deleteAll");
    if(dataproduct.length > 0)
    {
        deltebtn.innerHTML=`<button onclick='deleteAll()'>Delete all ${dataproduct.length} </button>`

    }
    else {
        deltebtn.innerHTML='';
    }
}
  showData();
function deleteAll() {
    localStorage.clear();
    dataproduct.splice(0);
    showData();
}
localStorage.clear()
function updateData(i) {
    tm=i;
   title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    taxes.value = dataproduct[i].taxes;
    ads.value = dataproduct[i].ads;
    dis.value = dataproduct[i].discount;
    total.value = dataproduct[i].total;
    getTotal();
    count.style.display='none';
flag='update';

    Category.value = dataproduct[i].category;
    submit.innerHTML='update';
    scroll({
        top:0,
        behavior:"smooth"
    })
}
function deleteData(i) {
    dataproduct.splice(i,1);
    localStorage.product=JSON.stringify(dataproduct)
    showData();
}
let searchFlag="title";
function getsearch(value) {
    let search = document.getElementById("search");
    if (value === 'searchTitle') {
        searchFlag = "title";
        search.placeholder="search by title";
    } else {
        searchFlag = "category";
        search.placeholder="search by category";
    }
    search.focus();
}
function searchData(value) {
    let table='';
     for(let i=0;i<dataproduct.length;i++) {
         if (searchFlag == "title") {


             if (dataproduct[i].title.includes(value.toLowerCase())) {
                 table += `  <tr>
                   <td>${i}</td>
                  <td>${dataproduct[i].title}</td>
                  <td>${dataproduct[i].price}</td>
                  <td>${dataproduct[i].taxes}</td>
                 <td>${dataproduct[i].discount}</td>
               <td>${dataproduct[i].total}</td>
                 <td>${dataproduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
               </tr>`;

             }


         } else {


             if (dataproduct[i].category.includes(value.toLowerCase())) {
                 table += `  <tr>
                   <td>${i}</td>
                  <td>${dataproduct[i].title}</td>
                  <td>${dataproduct[i].price}</td>
                  <td>${dataproduct[i].taxes}</td>
                 <td>${dataproduct[i].discount}</td>
               <td>${dataproduct[i].total}</td>
                 <td>${dataproduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
               </tr>`;

             }

         }
     }
document.getElementById('tbody').innerHTML=table;
}