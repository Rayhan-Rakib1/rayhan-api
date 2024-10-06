
function getString(time){
    const hour = parseInt( time / 3600);
    let second = time % 3600;
    const minute = parseInt(second / 60);
    second = second % 60;

    return `${hour} hour ${minute} min ${second} second ago`;
}
// active class
const removeActiveClass = () => {
     const button = document.getElementsByClassName('category-btn');
     for(let btn of button){
        btn.classList.remove("active");
     }
}


// ------------------
// load catagories
const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCatagories(data.categories))
    .catch(error => console.log(error))
}


const loadCategoryVideos = (id) => {
   
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active');
        displayVideos(data.category)
    })
    .catch(error => console.log(error))
}

// display catagories
const displayCatagories = (data) => {
    const catagoriesContainer = document.getElementById('categories')
      data.forEach((item) => {
        // create a button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        <button>
        `;
        catagoriesContainer.append(buttonContainer);
      }); 
}

// -----------------------------------------------------
// load videos
const loadVideos =() => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
}


// display videos
const displayVideos = (videos) => {
    
    const videosContainer = document.getElementById('videos');
    videosContainer.innerText = "";
     
    if(videos.length === 0){
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
        <div class="min-h-[600px] flex flex-col gap-5 justify-center items-center ">
        <img src="assart/Icon.png">
        </div>
        `;
        return;
    }
    else{
        videosContainer.classList.add('grid');

    }

    // -----------
    videos?.forEach (video => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML = `
         <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
        ? "" : `<span class="absolute text-xs text-white right-2 bottom-2 bg-black rounded p-1">${getString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt="">
        </div>
        <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex">
             <p class="text-gray-400">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">` : ""}
            </div>
            
            <p><button class="btn btn-sm btn-error">details</button></p>
        </div>
        
        </div>
        `;
        videosContainer.append(card);

    })
}
loadCatagories();
loadVideos();