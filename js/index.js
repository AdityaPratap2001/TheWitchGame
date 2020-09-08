let witch = document.querySelector('.witch');
let witch_lifeline = document.querySelector('.witch_life')
let baloons = document.querySelectorAll('.baloon');
let baloons_lifeline = document.querySelectorAll('.baloon_life');
let fires = document.querySelectorAll('.fire');
let playArea = document.querySelector('body');
let witch_lifestatus = document.querySelector('.witch_lifeline')
let baloons_life = [100,100,100];
let witch_life = 100;
let timer = document.querySelector('.timer');

// PreLoader
let loading_width = 0;
let loading = setInterval(function(){
  document.querySelector('.load_in').style.width = loading_width + '%';
  loading_width = loading_width + 10;
  if(loading_width == 110){
    clearInterval(loading);
  }
},430)
setTimeout(function(){
  document.querySelector('.preLoader').style.display = 'none';
},4500)

// To keep track of timer
let time = 48;
setInterval(function(){
  if(time<16){
    timer.style.color = 'red';
  }
  timer.innerText = time;
  time = time-1;
},1000)

// To keep track of each baloon's life & witch's life
var check = setInterval(function(){

  witch_lifestatus.style.height = witch_life + '%';

  for(var i=0;i<baloons_lifeline.length;i++){
    baloons_lifeline[i].style.height = baloons_life[i] + '%';
  }

  for(var i=0;i<baloons.length;i++){
    if(baloons_life[i]<1){
      baloons[i].src = '../img/explosion.gif';
    }
  }
  if(witch_life < 1 || time==0){
    // alert(`You couldn't save them!`);
    clearInterval(check);
    setTimeout(function(){
      document.querySelector('.lost').style.display = 'flex';
    },1000)
  }
  else if(baloons_life[0]<1 && baloons_life[1]<1 && baloons_life[2]<1){
    // alert(`You saved them!`);
    clearInterval(check);
    // document.querySelector('.won').style.display = 'flex';
    window.location.replace('../html/index2.html');
  }
},100)

// Responsible for bombs that are thrown from 
// left side of each baloon
setInterval(function(){
  baloons.forEach((baloon,index) => {
    if(baloons_life[index] > 1){
      let bomb = document.createElement('div');
      let image = document.createElement('img');
      image.src = '../img/bomb.png';
      bomb.appendChild(image);
      bomb.classList.add('bomb');
      bomb.style.position = 'absolute';
      bomb.style.top = 160 + 'px';
      bomb.style.left = baloon.getBoundingClientRect().left + 'px';
      playArea.appendChild(bomb);
    }   
  });
},3500)

// Responsible for bombs that are thrown from 
// right side of each baloon
setInterval(function(){
  baloons.forEach((baloon,index) => {
    if(baloons_life[index]>1){
      let bomb = document.createElement('div');
      let image = document.createElement('img');
      image.src = '../img/bomb.png';
      bomb.appendChild(image);
      bomb.classList.add('bomb'); 
      bomb.style.position = 'absolute';
      bomb.style.top = 160 + 'px';
      bomb.style.left = baloon.getBoundingClientRect().left + (0.1*screen.width) + 'px';
      playArea.appendChild(bomb);  
    } 
  });
},4500)

// Responsible for moving each bomb down
setInterval(function(){
  let bombs = document.querySelectorAll('.bomb');
  bombs.forEach(bomb => {
    let initialBombTop = bomb.getBoundingClientRect().top;
    bomb.style.top = initialBombTop + 2.25 + 'px';
  })
},42.5)

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
          witch_life = witch_life - 33.33;
        }
      }
      else if(bomb_left <= witch_left + witch.offsetWidth - (0.02*screen.width)){
        witch_life = witch_life - 33.33;
      }
      bomb.style.display = 'none';
    } 
  })
},10)

// For detecting if fire hits baloon
setInterval(function(){
  let fires = document.querySelectorAll('.fire');
  let baloons = document.querySelectorAll('.baloon');
  fires.forEach(fire => {
    let fire_left = fire.getBoundingClientRect().left;
    let fire_top = fire.getBoundingClientRect().top;
    
    if(fire_top <= (0.08*screen.height) && (fire_top>(0.04*screen.height))){
      baloons.forEach((baloon,index) => {
        baloon_left = baloon.getBoundingClientRect().left;
          if(fire_left <= baloon_left){
            let diff = baloon_left-fire_left;
            if(diff<=0.04*screen.width){
              baloons_life[index] = baloons_life[index] - 33.33;
            }
          }
          else if(fire_left <= baloon_left + (0.65*baloon.offsetWidth)){
            baloons_life[index] = baloons_life[index] - 33.33;
          }
      })
      fire.style.display = 'none';
    }
  })
},10)

// For moving witch towards left
function moveLeft(){
  let initialPosLeft = witch.getBoundingClientRect().left;
  let lifeLeft = witch_lifeline.getBoundingClientRect().left;
  if(initialPosLeft > 32){
    witch_lifeline.style.left = lifeLeft - 20 + 'px';
    witch.style.left = initialPosLeft - 20 + 'px';
  }
}

// For moving witch right
let max_right = 0.8*screen.width;
function moveRight(){
  let lifeRight = witch_lifeline.getBoundingClientRect().left;
  let initialPosRight = witch.getBoundingClientRect().left;
  if(initialPosRight < max_right){
    witch_lifeline.style.left = lifeRight + 20 + 'px';
    witch.style.left = initialPosRight + 20 + 'px';
  }
}

// For fire from witch's end
function fire(){
    let fire = document.createElement('div');
    let image = document.createElement('img');
    image.src = '../img/fire2.png';
    fire.appendChild(image);
    fire.classList.add('fire');
    fire.style.position = 'absolute';
    fire.style.top =  witch.getBoundingClientRect().top + 'px';
    fire.style.left = witch.getBoundingClientRect().left + 'px';
    playArea.appendChild(fire);   
    canFire = false;
}

function fireSound(){
  var audio =new Audio('../sounds/fireSwoosh.mp3');
	audio.play();
}


let canFire = true;
window.addEventListener('keydown',(e)=>{
  if(e.keyCode === 37){
    moveLeft();
  }
  else if(e.keyCode === 39){
    moveRight();
  }
  else if(e.keyCode === 38){
    if(canFire){
      fire();
      fireSound();
      canFire = false;
      setTimeout(function(){
        canFire = true;
      },1600)
    }
  }
})