// diclear the variabel that save data in it
let reserve = {};
//--------------------------------------


// diclear wihch url we want request
loadDoc("https://reqres.in/api/users?page=1", myFunction); //we write a qury and save all of the data to the reserv
loadDoc("https://reqres.in/api/users?page=2", myFunction);//we write a qury and save all of the data to the reserv
// ---------------------------------------





// load the defalt page page 1
paging(1, reserve)
create_nave_bar(1)
// --------------------------------------------


// We need tho sparate all of our dat to 6 to 6 sub page so we resev num of the page and set 6 data depnd on which page to the sub bank data list
function paging(paging, all_page) { //pageing ======> num ber of page that we need to biuld
  let page = {} //create blank data set to save 6 data on it

  var object = Object.keys(all_page)
  // for (const key in object) {
  //   // var index = object[key]
  //   console.log(object[key]);
      

  // }
  for (let index = 6*(paging-1); index < (paging*6); index++) { // depnd of the page for example in page 2 we select num of 7 to 12 for id that we need
  
    id_num = object[index]
    if (index == Object.keys(all_page).length) { //for example wen we dont have full 6 person sotp createing
      break
    }

    page[id_num] = all_page[id_num] //save the data to the blank list
  }

  page_creator(page,paging, all_page) //create page with data that we need
}
// -------------------------------------------------------------



//create a function that create body of the page
function page_creator(page, whichpage, all_users) { //we need of the the data set and wich page we want to create in this function
  // ferst section of this function for create body of the page
  $(document).ready(function () {
    $("#parent").empty(); //in start we clear the page
    var id_number = Object.keys(page)
    for (const key in id_number) {
      var index = id_number[key]

      // create each card th the page
      var card_continer = $("<div class='card-continer col-lg-4 px-4 py-4'></div>");//create the main border of the each page
      // ----------------------------

      // create a parent to full it by parameters and can set bading on main border
      var parent = $("<div class='card'></div>"); 
      // ------------------------------

      // select image
      var img = `<img src="${page[index].avatar}" class="card-img-top" alt="Person_image">`;
      // ------------------------------

      // create name of person from email, for this we have function to select neame and last name form email addres
      var NAME = [page[index].first_name, page[index].last_name, page[index].first_name + " "+ page[index].last_name];
      // -------------------------------------
      // create body of the card
      var card_body = $("<div class='card-body'></div>");
      // -------------------------------------------

      // create headiing of the page
      var heading = `<h5 class="card-title">${NAME[2]}</h5>`; //heading
      var paragrap = `<p class="card-text">${NAME[2]} is company user by UID of  
      ${page[index].id}.<br>you can easily get in touch with ${NAME[0]} from</p>`; // praragrap of the heading
      var tag_email = `<a href="${page[index].email}">${page[index].email}</a>`; //email in the heading
      // ---------------------------------------------

      // create a tabel that save id and emale in the center of the page
      var tabel = $("<ul class='list-group list-group-flush'></ul>"); //ferst we need a tabel to do so butter
      var id = $(`<li class='list-group-item'>UID: ${page[index].id}</li>`); //save id to ferst row of the tabel
      var email = $(`<li class='list-group-item'>Email: ${page[index].email}</li>`); //save email to the secend row of the tabel
      // ---------------------------------------------

      // create buttom of the card
      var card_body2 = $("<div class='card-body'></div>"); //body of the footer of the pabe
      var buttm = `<butto  data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn
       btn-primary" id="user-${page[index].id}">user profile</button>`; //create a buttem in the footer of the card to update person
      // ---------------------------------------------

      // append childs to the parents and set them to the page
      card_body.append(heading, paragrap, tag_email); //set heading of the page to parent

      // appned rows to the tabel
      tabel.append(id, email);

      // append buttem to the footer
      card_body2.append(buttm);

      // append image header tabel and footer to the parent wraper
      parent.append(img, card_body, tabel, card_body2);

      // append parent to the main border wraper
      card_continer.append(parent);

      // send the main wraper to the page
      $("#parent").append(card_continer);
      // ------------------------------------------
    }

    $(`#create_user`).click(function () {
      var new_person = {}
      new_person["id"] =parseInt($(`#Number-ID`).val())
      new_person["first_name"] = $(`#FerstName_Create`).val()
      new_person["last_name"] = $(`#LastName_Create`).val()
      new_person["email"] = $(`#Email2`).val()
      new_person["avatar"] = $("#formFile").val()
   
      reserve[new_person["id"]] = new_person
      paging(1, reserve)
      create_nave_bar(1)
    })

  })
  // -----------------------------------------------------------------------------------------

  // in this section we create a modal for update or delet user 
  $(document).ready(function () {
    var id_number = Object.keys(page); //in each page in rser data we have defrent id so we access all id that we need to create model for them
  
    for (const key in id_number) { //for each id create modal

      $(`#user-${id_number[key]}`).click(function () { //for each id modal

      // wheach id number we work with 
      var id_num = id_number[key]
      // -----------------------------

      // contain ferst name and lastName from emailadress
      var NAME = [page[id_num].first_name, page[id_num].last_name, page[id_num].first_name + " "+ page[id_num ].last_name];
      var ferst_name = NAME[0]
      var Name = NAME[2]
      // ------------------------------------------------------------

      // in the heading of the model set name of person
      $("#exampleModalLabel").text(`${ferst_name} Porofile`)
      // ---------------------------------------------------------

      // create parent to save all parameter
      var parent = $("<div class='card'></div>")
      // ----------------------------------------------------

      // card body senter of the modal that save image and heading
      var card_body = $("<div class='card-body'></div>");
      var img = `<img src="${page[id_num].avatar}"  class="rounded mx-auto d-block" alt="Person_image">`
      var heading = `<h5 class="card-title">${Name}</h5>`
      // -------------------------------------------------------
      
      // create tabel to seave id and email
      var tabel = $("<ul class='list-group list-group-flush'></ul>")
      var id = $(`<li class='list-group-item'>UID: ${page[id_num].id}</li>`)
      var email = $(`<li class='list-group-item'>Email: ${page[id_num].email}</li>`)
      // ------------------------------------------------------------
      
      // append elements to the wrapers
      card_body.append(img, heading)
      tabel.append(id, email)
      parent.append(card_body, tabel)
      // --------------------------------------------
      
      // send them to the page
      $(".modal-body").html(parent)
      // -----------------------------------------------
      
      // depand on wech user model2 is open with person property
      $("#modal2").click(function(){ // open model
        $("#Modal_update").html(`Update ${ferst_name} Porofile`) //modal header
        $("#disabledTextInput").attr("placeholder", `${id_num}`) //name in place holder
        $("#Email").attr("placeholder", `${page[id_num].email}`)  //email on place holder
        $("#FerstName").attr("placeholder", `${page[id_num].first_name}`) 
        $("#LastName").attr("placeholder", `${page[id_num].last_name}`) 
        $("#shape").attr("placeholder", `${page[id_num].avatar}`) 
       
      })
      //--------------------------------------------------------------
      $(`#dell`).click(function (){
        console.log("yes");
        all_users = Object.keys(all_users).filter(objKey =>
          objKey !== id_num).reduce((newObj, key) =>
          {
              newObj[key] = all_users[key];
              return newObj;
          }, {}
        );
        reserve = all_users
        paging(whichpage, reserve)
        create_nave_bar(whichpage)
      })
      $(`#save_buttm`).click(function(){

        var change_name =  $(`#FerstName`).val();
        var change_lastname = $(`#LastName`).val()
        var change_email = $(`#Email`).val()
        var change_avatar = $(`#shape`).val()
  
        
        if (change_name == "")  {
          change_name = reserve[id_num].first_name 
        }if (change_lastname == "")  {
        
          change_lastname = reserve[id_num].last_name 
        }if (change_email == "")  {
          change_email = reserve[id_num].email 
        }if (change_avatar == "")  {
          change_avatar = reserve[id_num].avatar 
        }
  
        reserve[id_num].first_name = change_name
        reserve[id_num].last_name = change_lastname
        reserve[id_num].avatar = change_avatar
        reserve[id_num].email = change_email
        console.log(reserve);
        paging(1, reserve)
        create_nave_bar(1)
          
        
      })
      
    })
    
    }
  })
}

// this function from email addres extract ferst name and last name of the person
function Split_Name(email_addres) {
  var split_name = email_addres.split(".")
  var ferst_name = split_name[0][0].toUpperCase() + split_name[0].slice(1);
  var last_name = split_name[1].split("@")[0][0].toUpperCase() + split_name[1].split("@")[0].slice(1)
  var Name = ferst_name + " " + last_name
  return [ferst_name, last_name, Name]
}
// -----------------------------------------------------------------------------------------

// create buttem nave bar th paging the page
function create_nave_bar(corent) {
  // we calculate number of the page that we need
var num_pages = Math.ceil(Object.keys(reserve).length/6);
// ---------------------------------------------
  // create the shape of paing chenger
  $(document).ready(function () {

    $("#nav_bar").empty();

    var ul = $(`<ul class="pagination"></ul>`)

    for (let index = 1; index < num_pages+1; index++) {

      if (index==corent){
        var li = $(`<li role="button" class="page-item" id="page${index}"><a class="page-link active">${index}</a></li>`)
        ul.append(li)
      }else {
        var li = $(`<li role="button" class="page-item" id="page${index}"><a class="page-link" >${index}</a></li>`)
        ul.append(li)
      }
      var div = $(`<div class="pb-5">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target="#Create">Create User</button>
        </div>`)
    }
    $("#nav_bar").append(ul, div)
  })
// ---------------------------------------------------------------------------------

// wen click on buttm what hapen
  $(document).ready(function(){
    for (let num = 1; num <= num_pages; num++) {
     // wen clicl on page buttm
      $(`#page${num}`).click(function () {
        paging(num, reserve)
        create_nave_bar(  num)
      }) 
      
    }
  })
  // ---------------------------------------------------------------------------------------
}
// ---------------------------------------------------------------------------------------

// wright a synch AJAX to request evry where we want
function loadDoc(url, cFunction) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  }
  xhttp.open("GET", url, false);
  xhttp.send();
}
// -------------------------------------------

// what happen with request wen it is resive
function myFunction(xhttp) {
  let page = JSON.parse(xhttp.responseText)
  reserve = save_data(reserve, page.data)
}
// -----------------------------------------

// when this function give json file and a empty list it is full it with id number and property 
function save_data(reserve, json_file) {
  for (let index = 0; index < json_file.length; index++) {
    reserve[json_file[index].id] = json_file[index]
  }
  return reserve
}
// -----------------------------------------------------------------------------------------------------