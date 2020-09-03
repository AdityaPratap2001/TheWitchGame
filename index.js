let witch = document.querySelector('.witch');
let baloons = document.querySelectorAll('.baloon');
let playArea = document.querySelector('body');
let witch_life = 100;

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

// For detecting if bomb hits witch
setInterval(function(){
  let bombs = document.querySelectorAll('.bomb');
  bombs.forEach(bomb => {
    let bomb_top = bomb.getBoundingClientRect().top;
    let bomb_left = bomb.getBoundingClientRect().left;
    let witch_left = witch.getBoundingClientRect().left;
    if((bomb_top >= (0.72*screen.height)) && (bomb_top <= screen.height)){
      if(bomb_left <= witch_left){
        let diff = witch_left - bomb_left;
        if(diff<=0.01*screen.width){
          alert('Collision!');
          witch_life = witch_life - 33.33;
        }
      }
      else if(bomb_left <= witch_left + witch.offsetWidth - (0.02*screen.width)){
        alert('Collision!');
        witch_life = witch_life - 33.33;
      }
      bomb.style.display = 'none';
    } 
  })
},10)

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