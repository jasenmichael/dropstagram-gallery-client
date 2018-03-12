// const dboxApiUrl = 'http://localhost:3000/api/images'
// const dBoxUrl = 'http://localhost:3000'
const dBoxUrl = 'https://dropbox-node-sync.herokuapp.com'
const instaUrl = 'https://api.instagram.com/v1/users/self/media/recent?access_token=1452320738.f6264bb.48083e76b1d9449bb86cdc75b7439200'

let imageList = []
getGalleries()
console.log(imageList)
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
/////////////////////
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
    img.className = "dw-pnl__cntnt image img-responsive " + image.source
    gallery.appendChild(a)
  })
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
