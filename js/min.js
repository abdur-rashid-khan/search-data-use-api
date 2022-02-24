const searchBtn=document.getElementById('searchBtn');
searchBtn.addEventListener('click',()=>{
   const searchInput=document.getElementById('searchInput').value;
   if(searchInput==''){
      document.getElementById('alert').style.display='block';
      document.getElementById('content').style.display='none';
   }else{
      document.getElementById('content').style.display='block';
      document.getElementById('alert').style.display='none';
      const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      fetch(url)
      .then(getData => getData.json())
      .then(data => displayData(data));
   }
});

// show data
const row=document.getElementById('row');
const displayData=(data)=>{
   // console.log(data.meals);
   const getData=data.meals;
   // clear data
   row.textContent='';
   searchInput.value='';
   try {
      getData.forEach(foods => {
         // console.log(foods.strMeal)
         let slice=foods.strInstructions;
         slice=slice.slice(0,100);
         const row =document.getElementById('row');
         const items =document.createElement('div');
               items.classList.add('col-sm-12');
               items.classList.add('col-md-6');
               items.classList.add('col-lg-4');
               items.classList.add('col-xl-3');
               items.style.cursor='pointer'
               items.innerHTML=`
            <div onclick="showDetels(${foods.idMeal})" class="py-4 text-center">
               <div class="card shadow border">
                  <img id="imgTab" src="${foods.strMealThumb}" class="card-img-top img-fluid" alt="${foods.strMeal} photos">
                  <div class="card-body">
                  <h5 class="card-title text-start">${foods.strMeal}</h5>
                  <p class="card-text text-muted text-start">${slice}</p>
                  <p id="mess" style="display: none; color: green;">pictures above show</p>
                  <a href="${foods.strYoutube}" class="btn btn-primary d-block">See Cooking</a>
                  </div>
               </div>
            </div>
         `;
         row.appendChild(items);
      })
   } catch (error) {
      document.getElementById('alert').style.display='block';
      document.getElementById('content').style.display='none';
   };
}
const showDetels= async (id) =>{
   const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
   const getData=await fetch(url);
   const newData = await getData.json();
   showIdData(newData)
   // fetch(url)
   // .then(getdata => getdata.json())
   // .then(newData => showIdData(newData));
   
}
// 
const showIdData = (showNewData) => {
   let looping=showNewData.meals;
   looping.forEach(data => {
      let show = document.getElementById('show');
      show.textContent='';
      let div = document.createElement('div');
      div.classList.add('card');
      div.classList.add('my-5');
      div.innerHTML=`
         <img src="${data.strMealThumb}" class="card-img-top" alt="${data.strMeal} Photos">
         <div class="card-body">
            <h5 class="card-title">${data.strMeal}</h5>
            <p class="card-text">${data.strInstructions.slice(0,250)}</p>
            <a href="${data.strYoutube}" class="btn btn-primary">See Cooking</a>
         </div>
      `;
      show.appendChild(div);
      
   });
}

const loding =()=>{
   document.getElementById('secction').style.display='none';
}