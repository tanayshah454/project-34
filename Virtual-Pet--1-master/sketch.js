//Create variables here
var dog,happyDog,dogImg,happyDogImg,database,foods,foodStock
function preload()
{
  //load images here
  dogImg=loadImage("images/Dog.png")
  happyDogImg=loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500,500);
  dog=createSprite(250,400)
  dog.addImage(dogImg);
  dog.scale=0.2
database=firebase.database();
foodStock=database.ref("food");
foodStock.on("value",readStock);
}

function draw() {  
background(46, 139, 87) 
if(keyWentDown(UP_ARROW)){
  writeStock(foods)
  dog.addImage(happyDogImg)
}
if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
}
  //add styles here
  fill("white")
  textSize(30)
  text("press up arrow to feed Bruno",70,50)
  text("food remaining :"+foods,120,100)
  drawSprites();
}
function readStock(data){
foods=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref("/").update({
    food:x
  })
}