const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzY4ZmIzNWEwOTEzMGVlYTdkZDUzNjA5NGFhYjkwMyIsInN1YiI6IjY1MWE2ZTJlOWQ1OTJjMDEyMjE3OTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rhc1UYX-vOyX7JwmoPKFMpBIj4QAOWTuVyCE7VAWm5w'
    }
  };

  const btnLeft = document.getElementById("leftArrowScroll")
  const btnRight = document.getElementById("rightArrowScroll")
  const boxSlider = document.getElementById("bottomSliderAnimation")
  const boxSliderFix = document.getElementById("bottomSlider")
  const eachBoxSlider = document.getElementsByClassName("bottomBox")

const movieUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
const movieUrlTopRated = "https://api.themoviedb.org/3/trending/movie/week"

function getRandomArbitrary(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
  }
  let random = getRandomArbitrary(1,10)
  let random2 = 0

async function loadMovie(){
    const response = await fetch(movieUrl, options);
    const data = await response.json()

}
async function topRated(){
    const response = await fetch(movieUrlTopRated, options)
    const data = await response.json()
    const image = data.results[random].backdrop_path;
    const descMain = data.results[random].overview;
    const title = data.results[random].title;


    document.getElementById("mainView").style.backgroundImage = ` linear-gradient(to bottom, transparent 80%, black ), url(https://tmdb.org/t/p/original${image})`
    document.getElementById("mainDescribeMovie").textContent = descMain;
 
    document.getElementById("mainDescribeNumber").innerHTML = `Locul ${random+1} astazi la filme `
    document.getElementById("mainDescribeTitle").innerHTML = `${title}`

    for(let i =0;i<10;i++ ){
      var data1 = data.results[i]
        const image2 = data.results[random2].backdrop_path;
        data1 = `<div class="bottomBox">
        <div class="bottomBoxes bottomBox1" ><h1>${random2+1}</h1>

        </div>
        <div class="bottomBoxes bottomBox2" ><img src="https://tmdb.org/t/p/original${image2}" alt="">

        </div>
    </div>`
    random2++

    boxSlider.innerHTML += data1
    
    }
  
     boxWidthFix = boxSliderFix.offsetWidth*0.90
     boxWidthAnim = boxSlider.offsetWidth
    
  
}
loadMovie()
topRated()




const genderMovie = [
  {
    id:28, gender: "Action"
  },
  {id: 12, gender:"Adventura"},
  {id:16 , gender:"Animatii"},
  {id:35 , gender:"Comedie"},  
  {id:80 , gender:"Crime"},
  {id:99 , gender:"Documentar"},
  {id:18 , gender:"Drama"},
  {id:10751 , gender:"Familie"},
  {id:14 , gender:"Fantastic"},  
  {id:36 , gender:"Istorie"},  
  {id:27 , gender:"Horror"},
  {id:10402 , gender:"Muzica"},
  {id:9648 , gender:"Mister"},
  {id:10749 , gender:"Romantic"},
  {id:878 , gender:"Scince Fiction"},  
  {id:53 , gender:"Thriller"},
]

 const rowsGroup = document.getElementById("rowsGroup")

const movieBoxes = document.getElementsByClassName("rowAnimate")


function fetchData(i){
 
  return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genderMovie[i].id}`,options)
  .then(response =>{
    if(response.ok){return response.json() }
    else{throw new Error(`Error:${response.status}`)}
  })
}

async function createForLoop(a){

  var row = document.createElement("div")
  var secondRow = document.createElement("div")
  var titleRow = document.createElement("div")
  var contentRow = document.createElement("div")
  var groupRow = document.createElement("div")
  var rowBtnLeft  = document.createElement("div")
   var rowBtnRight = document.createElement("div")
   var rowBtnArrowLeft = document.createElement("i")
   var rowBtnArrowRight = document.createElement("i")
  var rowSlider = document.createElement("div")
   

   rowBtnLeft.appendChild(rowBtnArrowLeft)
   rowBtnRight.appendChild(rowBtnArrowRight)
  rowsGroup.appendChild(row)
  row.appendChild(rowBtnLeft)
  row.appendChild(secondRow)
  secondRow.appendChild(titleRow)
  secondRow.appendChild(groupRow)
  
  row.appendChild(rowBtnRight)
  groupRow.appendChild(rowSlider)
  rowSlider.appendChild(contentRow)

  rowSlider.classList.add("rowSlider")

  rowBtnRight.classList.add("arrowScroll")
  rowBtnLeft.classList.add("arrowScroll")
  rowBtnArrowLeft.classList.add("arrow","left")
  rowBtnArrowRight.classList.add("arrow","right")
  row.classList.add("row")
  secondRow.classList.add("rowStatic")
  titleRow.classList.add("titleMovie")
  contentRow.classList.add("rowAnimate")
  groupRow.classList.add("groupRow")
//  leftElement.push(rowBtnArrowLeft)
//  rightElement.push(rowBtnArrowRight)
  titleRow.innerHTML =`${genderMovie[document.getElementsByClassName("titleMovie").length - 1].gender}`
  rowWidthStatic = groupRow.offsetWidth
  // rowsStatic.push(groupRow)
  for (const item of a.results) {
          var boxRow = document.createElement("div")
          contentRow.appendChild(boxRow)
          boxRow.classList.add("rowbox")
          var imageBox = document.createElement("img")
          boxRow.appendChild(imageBox)
          if(item.backdrop_path == null)return
          imageBox.src = `https://tmdb.org/t/p/original${item.backdrop_path}`
    

        }

 

}

  const promises = []
 for(var i = 0 ; i < genderMovie.length;i++){
  promises.push(fetchData(i).then(a => createForLoop(a)))
  
 }


 Promise.all(promises)
 .then(()=>{
 
  
  const rowsStatic = document.getElementsByClassName("groupRow")
  const rightElement  = document.getElementsByClassName("right")
  const leftElement  = document.getElementsByClassName("left")
  console.log(promises)
  console.log(rightElement)
  console.log(rowsStatic)
  leftScroll(leftElement, rowsStatic)

  rightScroll(rightElement,rowsStatic)
 }
  
 )
 .catch(error =>{console.error(error)})
 




function rightScroll(a,x){
  
  for(let i=0;i<a.length;i++){
    a[i].addEventListener("click", ()=>{
      x[i-1].scrollLeft += rowWidthStatic
      console.log(`${a[i]}+${i}`)
    })
  }



}


function leftScroll(a,x){
   for(let i=0;i<a.length;i++){
    a[i].addEventListener("click", ()=>{
      x[i-1].scrollLeft -= rowWidthStatic
      console.log(`${a[i]}+${i}`)
    })

}
}











//Footer Cod  de serviciu




const changeCode = document.getElementById("footerButtonChange")
changeCode.addEventListener("click", ()=>{
  changeCode.textContent = "521-25s8"
})

const nav = document.querySelector("nav")
window.addEventListener("scroll",()=>{
  let navScrollY = window.scrollY
  let navLimitScrollY = 100
  if(navScrollY>navLimitScrollY){
    nav.classList.add("navScroled")
  }else(
    nav.classList.remove("navScroled")
  )
})



//Drop menu animation




const navMenuDrop = document.getElementById("navIconbox")
const navMenuDropBox = document.getElementById("navMenuIconBoxDrop")
const navMenuDrop1 = document.getElementsByClassName("navRightBox")

navMenuDrop.addEventListener("mouseover",()=>{
  navMenuDropBox.style.display = "flex"
  navMenuDrop1[1].addEventListener("mouseover",()=>{
    navMenuDropBox.style.display ="flex"
  })


})
navMenuDrop.addEventListener("mouseleave",()=>{
  navMenuDropBox.style.display = "none"
  navMenuDrop1[1].addEventListener("mouseleave",()=>{
    setTimeout( ()=>{
      navMenuDropBox.style.display ="none"
    }, 300)
    
  })
})




// Button Left and Right


let boxWidthFix
let boxWidthAnim
    var boxWidthUpdate = 0

    var boxRezRight
   
    btnLeft.addEventListener("click", ()=>{
      
      if(boxWidthUpdate < boxWidthFix ){
        boxWidthUpdate = 0
        boxSlider.style.transform = ("translateX(-" + boxWidthUpdate + ("px)"))
        btnLeft.style.transform = "translateX(-100%)"
      }else{
        boxWidthUpdate -= boxWidthFix
      boxSlider.style.transform = ("translateX(-" + boxWidthUpdate + ("px)"))
      
    }

      btnRight.style.transform = "translateX(0)"   
    })
    
    btnRight.addEventListener("click", ()=>{
      boxWidthUpdate += boxWidthFix;

      
      if(boxWidthAnim - boxWidthUpdate < boxWidthFix ){
         boxRezRight = boxWidthAnim - boxWidthFix
        boxSlider.style.transform = ("translateX(-" + boxRezRight + ("px)"))
        btnRight.style.transform = "translateX(100%)"

        boxWidthUpdate = boxRezRight ;
        
      }else{
      
      boxSlider.style.transform = ("translateX(-" + boxWidthUpdate + ("px)"))
        btnLeft.style.transform = "translateX(0)"
      }


    })

      
