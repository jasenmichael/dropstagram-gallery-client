// const dboxApiUrl = 'http://localhost:3000/api/images'
// const dBoxUrl = 'http://localhost:3000'
const dBoxUrl = 'https://dropbox-node-sync.herokuapp.com'
const instaUrl = 'https://api.instagram.com/v1/users/self/media/recent?access_token=1452320738.f6264bb.48083e76b1d9449bb86cdc75b7439200'

let imageList = []
getGalleries()
//console.log(imageList)

function getGalleries() {
  imageList = []
  getDbox(`${dBoxUrl}/api/images`)
    .then(addDbox)
  getInsta(instaUrl)
    .then(addInsta)
    .then(addImagesToPage)
  //addImagesToPage(imageList)
}

// start dbox get and add to imageList
function getDbox(dboxApiUrl) {
  return fetch(dboxApiUrl)
    .then(res => res.json())
}

function addDbox(dBoxList) {
  //console.log(dBoxList)
  dBoxList.forEach((item, index) => {
    //console.log(item.path);
    imageList.push({
      //id: index + 1,
      path: dBoxUrl + item.path,
      // implement thumb generator on server
      // thumb: dBoxUrl + item.thumb,
      thumb: dBoxUrl + item.path,
      source: "dropbox"
    })
  })
  //console.log(imageList);
}
// end dbox get and add to imageList


// start insta get and add to imageList
function getInsta(instaUrl) {
  return fetch(instaUrl)
    .then(res => res.json())
}

function addInsta(instaList) {
  //console.log(instaList.data)
  instaList.data.forEach((item, index) => {
    //console.log(item.images);
    imageList.push({
      path: item.images.standard_resolution.url,
      thumb: item.images.low_resolution.url,
      source: "instagram"
    })
  })
  //console.log(imageList);
  return imageList
}
// end insta get and add to imageList


// add images to page
const gallery = document.querySelector('#gallery')

function addImagesToPage(imageList) {
  //console.log(imageList)
  shuffle(imageList)
  shuffle(imageList)
  imageList.forEach(image => {
    const a = document.createElement('a')
    const img = document.createElement('img')
    //a.textContent = image.source
    a.className = image.source
    a.href = image.path
    a.className = "dw-pnl"
    a.appendChild(img)
    img.src = image.thumb
    img.className = "dw-pnl__cntnt image img-responsive scale-transition" + image.source
    gallery.appendChild(a)
  })
  filterSelection("all")
}

// shuffle array
// https://repl.it/@jasenmichael/ShuffleFunction
function shuffle(array) {
  let counter = array.length
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)
    counter--;
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }
  return array
}

// show About
function showGallery(event) {
  event.preventDefault()
  document.querySelector("#filter").style.display = "block"
  document.querySelector("#gallery").style.display = "block"
  document.querySelector("#about").style.display = "none"
}


function showAbout(event) {
  event.preventDefault()
  document.querySelector("#about").style.display = "block"
  document.querySelector("#filter").style.display = "none"
  document.querySelector("#gallery").style.display = "none"
}


// filter functions section
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("image");
  if (c == "all") c = ""
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show")
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show")
  }
}

function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ")
  arr2 = name.split(" ")
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i]
    }
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ")
  arr2 = name.split(" ")
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1)
    }
  }
  element.className = arr1.join(" ")
}

// Add active class to the current button (highlight it)
var btnFilter = document.getElementById("filter")
var btns = btnFilter.getElementsByClassName("btn")
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active")
    current[0].className = current[0].className.replace(" active", "")
    this.className += " active"
  })
}
// end filter functions section
