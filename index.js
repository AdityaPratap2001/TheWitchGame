let witch = document.querySelector('.witch');
let baloons = document.querySelectorAll('.baloon');
let playArea = document.querySelector('body');

// Responsible for bombs that are thrown from 
// left side of each baloon
setInterval(function(){
  baloons.forEach((baloon,index) => {
      let bomb = document.createElement('div');
      let image = document.createElement('img');
      image.src = './img/bomb.png';
      bomb.appendChild(image);
      bomb.classList.add('bomb');
      bomb.style.position = 'absolute';
      bomb.style.top = 160 + 'px';
      // bomb.style.left = 0.15*screen.width + 'px';
      bomb.style.left = baloon.getBoundingClientRect().left + 'px';
      playArea.appendChild(bomb);
  });
},6500)

// Responsible for bombs that are thrown from 
// right side of each baloon
setInterval(function(){
  baloons.forEach((baloon,index) => {
      let bomb = document.createElement('div');
      let image = document.createElement('img');
      image.src = './img/bomb.png';
      bomb.appendChild(image);
      bomb.classList.add('bomb'); 
      bomb.style.position = 'absolute';
      bomb.style.top = 160 + 'px';
      // bomb.style.left = 0.15*screen.width + 'px';
      bomb.style.left = baloon.getBoundingClientRect().left + (0.1*screen.width) + 'px';
      playArea.appendChild(bomb);  
  });
},5000)

// Responsible for moving each bomb down
setInterval(function(){
  let bombs = document.querySelectorAll('.bomb');
  bombs.forEach(bomb => {
    let initialBombTop = bomb.getBoundingClientRect().top;
    bomb.style.top = initialBombTop + 2.25 + 'px';
  })
},62.5)

// For moving fire from bottom to top
setInterval(function(){
  let fires = document.querySelectorAll('.fire');
  fires.forEach(fire => {
    let initialFireTop = fire.getBoundingClientRect().top;
    fire.style.top = initialFireTop - 5.75 + 'px';
  })
},62.5)

// For moving witch towards left
function moveLeft(){
  let initialPosLeft = witch.getBoundingClientRect().left;
  if(initialPosLeft > 32){
    witch.style.left = initialPosLeft - 20 + 'px';
  }
}

// For moving witch right
let max_right = 0.8*screen.width;
function moveRight(){
  let initialPosRight = witch.getBoundingClientRect().left;
  if(initialPosRight < max_right){
    witch.style.left = initialPosRight + 20 + 'px';
  }
}

// For fire from witch's end
function fire(){
  let fire = document.createElement('div');
  let image = document.createElement('img');
  image.src = './img/fire2.png';
  fire.appendChild(image);
  fire.classList.add('fire');
  fire.style.position = 'absolute';
  fire.style.top =  witch.getBoundingClientRect().top + 'px';
  // bomb.style.left = 0.15*screen.width + 'px';
  fire.style.left = witch.getBoundingClientRect().left + 'px';
  playArea.appendChild(fire);   
}

window.addEventListener('keydown',(e)=>{
  if(e.keyCode === 37){
    moveLeft();
  }
  else if(e.keyCode === 39){
    moveRight();
  }
  else if(e.keyCode === 38){
    fire();
  }
})