
var END=0;
var PLAY=1;
var gameState=PLAY;
var trex ,trex_running, trex_collided;
var edges
var piso, pisoImg, invisible;
var nubeImg, nubes;
var obstaculo1Img, obstaculo2Img, obstaculo3Img, obstaculo4Img, obstaculo5Img, obstaculo6Img;
var groupnubes ,groupobstaculos
var gameOver, restart, gameoverImg, restartImg;
var die, checkpoint, jump;
var marcador=0;

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");  
trex_collided=loadAnimation("trex_collided.png");
pisoImg=loadImage("ground2.png");
nubeImg=loadImage("cloud.png")
obstaculo1Img=loadImage("obstacle1.png")
obstaculo2Img=loadImage("obstacle2.png")
obstaculo3Img=loadImage("obstacle3.png")
obstaculo4Img=loadImage("obstacle4.png")
obstaculo5Img=loadImage("obstacle5.png")
obstaculo6Img=loadImage("obstacle6.png")
gameOverImg=loadImage("gameOver.png"); 
restartImg=loadImage("restart.png")
die=loadSound("die.mp3");
checkpoint=loadSound("checkpoint.mp3");
jump=loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crear sprite de Trex
 trex=createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
 trex.addAnimation("collided", trex_collided);
 trex.scale=0.8;


 //piso
piso= createSprite(200,height-30,600,20);
piso.addImage(pisoImg);
invisible=createSprite(200,height-20,600,10)
invisible.visible=false;

//sprites de fin del juego
gameOver= createSprite(200,50); 
gameOver.addImage(gameOverImg);
gameOver.scale=0.7
gameOver.visible=false;

restart= createSprite(280,100); 
restart.addImage(restartImg); 
restart.scale=0.5;
restart.visible=false;


groupnubes=createGroup();
groupobstaculos=createGroup();

 edges=createEdgeSprites();
}

function draw(){
  background("lightgray")
textSize(30);
text("puntos: " + marcador, width-250,100)
if(gameState === PLAY){
 //velocidad del piso 
 piso.velocityX=-2;

 //regeneracion del piso 
 if(piso.x < 0){
  piso.x=piso.width/2;
  }

  if(touches.lenght > 0 || keyDown("space")&& trex.y>=height-150){
    trex.velocityY=-10;
   jump.play();
   touches=[];
  }

  trex.velocityY=trex.velocityY+0.8
  trex.collide(invisible);

  crearnNubes();
  crearObstaculos();
marcador=marcador+Math.round(frameCount/100)
if(groupobstaculos.isTouching(trex)){
die.play();
  gameState=END;
}  

}else if (gameState === END){
  //mostrar fin del juego
gameOver.visible=true;
restart.visible=true;

//velocidad del piso
piso.velocityX=0;

//velocidad de trex
trex.velocityY=0;

//velocidad obstaculos y nubes
groupnubes.setVelocityXEach(0);
groupobstaculos.setVelocityXEach(0);

//tiempo de vida
groupnubes.setLifetimeEach(-1);
groupobstaculos.setLifetimeEach(-1);

//cambiar animacion
trex.changeAnimation("collided");

if (keyDown("space")){
  reset();
}

}

    



  
  

  
drawSprites();
}

//funcion de nubes
function crearnNubes(){
  if (frameCount % 70 === 0){
    var nube = createSprite(width,100,30,10);
    nube.addImage(nubeImg)
    nube.scale=1.0
    nube.y=Math.round(random(10,100))
    nube.velocityX=-3;
    nube.depth=trex.depth;
    trex.depth=trex.depth+3;
    nube.lifetime=600;
    groupnubes.add(nube)
  }
  
}
//funcion de obstaculos
function crearObstaculos(){
if (frameCount % 70 === 0){
var obstaculo = createSprite(width,height-50,30,10);
//obstaculo.addImage(obstaculo1Img)
var numeros = Math.round(random(1,6));
switch(numeros){
  case 1:obstaculo.addImage(obstaculo1Img);break
  case 2:obstaculo.addImage(obstaculo2Img);break
  case 3:obstaculo.addImage(obstaculo3Img);break
  case 4:obstaculo.addImage(obstaculo4Img);break
  case 5:obstaculo.addImage(obstaculo5Img);break
  case 6:obstaculo.addImage(obstaculo6Img);break
}
obstaculo.scale=0.9;
obstaculo.velocityX=-3;
obstaculo.lifetime=600;
groupobstaculos.add(obstaculo)
}
}
//reinicio
 function reset(){
  gameState=PLAY;
  marcador=0;
  gameOver.visible=false;
  restart.visible=false;
  groupnubes.setLifetimeEach(0);
groupobstaculos.setLifetimeEach(0);
trex.changeAnimation("running");
 }
