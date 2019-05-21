const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection');
let addToy = false
let element = null;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded",function(){
  console.log('loaded');
  displayToys();
  toyForm.addEventListener('submit',createToy)
})

function displayToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => 
    data.forEach(toy => {
      createElements(toy)
    })   
)}

function createElements(toy){
      let div = document.createElement('div');
      div.className = 'card';
      let h2 = document.createElement('h2');
      h2.innerText = toy.name;
      div.appendChild(h2);
      let img = document.createElement('img');
      img.className = 'toy-avatar';
      img.src = toy.image;
      div.appendChild(img);
      let p = document.createElement('p');
      p.innerText = toy.likes;
      div.appendChild(p);
      let button = document.createElement('button');
      button.innerText = "Like <3";
      button.className = "like-btn";
      button.addEventListener('click',function(){
        element = p;
        beforeLike(toy)
      });
      div.appendChild(button);
      toyCollection.appendChild(div);
}

function beforeLike(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`)
  .then(resp => resp.json())
  .then(data => {
    like(data)
  })
}

function like(toy){
  let parsed = parseInt(toy.likes);
  //console.log(parsed);
  let newNumberOfLikes = parsed + 1
  //console.log(newNumberOfLikes);
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newNumberOfLikes 
    })
  })
  .then(resp => resp.json())
  .then(data => {
     element.innerText = newNumberOfLikes;
     //console.log(data);
  })
}

function createToy(e){
  e.preventDefault();
  console.log(e);
  //debugger
  fetch(`http://localhost:3000/toys/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    body: JSON.stringify({
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(data => {
    createElements(data)
  })
}






// OR HERE!
