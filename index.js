let witch = document.querySelector('.witch');

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