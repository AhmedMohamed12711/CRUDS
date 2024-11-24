//CRUDS  ==> create retrive update delete search  
var productName = document.getElementById('productName');  //name
var productPrice = document.getElementById('productPrice'); //price
var productCat = document.getElementById('productCat');
var productDesc = document.getElementById('productDesc');
var productImage = document.getElementById('productImage');
var serachInput = document.getElementById('serachInput')
var dataRow = document.getElementById('dataRow')

//btns
var updateBtn = document.getElementById('updateBtn')
var addBtn = document.getElementById('addBtn')


var productList = []  //[{}]  //new user
if (localStorage.getItem('products')) {
  productList = JSON.parse(localStorage.getItem('products'))  // old user
  display()
}



//convert JSON to string  JSON.stringify()
//convert string to JSON  JSON.parse() 

function addProduct() {

  if(Validation(productName)&&Validation(productPrice)&&Validation(productCat)){
  var productObj = {
    id: Date.now(),
    pName: productName.value,
    pPrice: productPrice.value,
    pDesc: productDesc.value,
    pCat: productCat.value,
    pImage: (productImage.files[0]) ? `./img/${productImage.files[0]?.name}` : 'https://placehold.co/600x400'
  }
  productList.push(productObj) //product

  localStorage.setItem('products', JSON.stringify(productList))
  // clearForm()
  display()
}

}


function display(list = productList)  ///// fun
{
  var box = ''
  for (var i = 0; i < list.length; i++) {
    box += `<div class="col-md-3 col-sm-6">
          <div class="product">
            <img src="${list[i].pImage}" class="w-100" alt="">
            <h2 class="h3">${list[i].pName}</h2>
             <div class="d-flex justify-content-between">
              <h3 class="h5">price <span class="text-danger">${list[i].pPrice}</span></h3>
            <h3 class="h5">category ${list[i].pCat}</h3>
             </div>
            <p class="lead">${list[i].pDesc}</p> 
            <button  onclick="editForUpdate(${i})" class="btn btn-outline-warning">update <i class="fa-solid fa-edit"></i></button>
  <button  onclick="deleteFun(${list[i].id})" class="btn btn-outline-danger">delete <i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`
  }

  dataRow.innerHTML = box
}


function clearForm() {
  productName.value = null;
  productPrice.value = null;
  productDesc.value = null;
  productCat.value = null;
  productImage.value = null
}


function deleteFun(id) {
  //productList.splice(index, 1) //index
  productList = productList.filter(function (ele) { return ele.id !== id })
  localStorage.setItem('products', JSON.stringify(productList))
  display()
}

function searchFun(term) {
  var searchArr = []
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].pName.trim().toLowerCase().includes(term.trim().toLowerCase())) {
      searchArr.push(productList[i])
    }
  }
  display(searchArr)
}



function editForUpdate(index) {
  globalProduct = productList[index];
  updateBtn.classList.replace('d-none', 'd-block');
  addBtn.classList.add('d-none');
  productName.value = globalProduct.pName;
  productPrice.value = globalProduct.pPrice;
  productCat.value = globalProduct.pCat;
  productDesc.value = globalProduct.pDesc;
}

function updateProduct() {
  let productToUpdate = productList.find(product => product.id === globalProduct.id);

  if (productToUpdate) {
      productToUpdate.pName = productName.value;
      productToUpdate.pPrice = productPrice.value;
      productToUpdate.pCat = productCat.value;
      productToUpdate.pDesc = productDesc.value;

      localStorage.setItem('products', JSON.stringify(productList));
      updateBtn.classList.replace('d-block', 'd-none');
      addBtn.classList.replace('d-none', 'd-block');
      display();
  }
}




function Validation(input)
{  
  
  var Regex  = {
    productName:/^[A-Z][a-z]{2,5}$/,
    productPrice:/^\d+\.\d{2}$/,
    productCat:/^tvs|mobiles|labtops$/
  }
 
    if(Regex[input.id].test(input.value) )
   {
      input.classList.add('is-valid')
      input.classList.remove('is-invalid')
      input.nextElementSibling.classList.replace('d-block','d-none') 
      return true   
   }
   else{
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')
    input.nextElementSibling.classList.replace('d-none','d-block')
    return false
   }
  
}



// function priceValidation()
// {
//   var Regex  = /^\d+\.\d{2}$/
//    if(Regex.test(productPrice.value) )
//    {
//       productPrice.classList.add('is-valid')
//       productPrice.classList.remove('is-invalid')
//       productPrice.nextElementSibling.classList.replace('d-block','d-none') 
//       return true   
//    }
//    else{
//     productPrice.classList.add('is-invalid')
//     productPrice.classList.remove('is-valid')
//     productPrice.nextElementSibling.classList.replace('d-none','d-block')
//     return false
//    }
  
// }


