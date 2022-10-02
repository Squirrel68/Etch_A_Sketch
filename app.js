var color = document.querySelector('#color')
var eraser = document.querySelector('#eraser') 
var decrease = document.querySelector('#decrease') 
var sizeEl = document.querySelector('#size') 
var increase = document.querySelector('#increase') 
var save = document.querySelector('#save') 
var clear = document.querySelector('#clear') 
var canvas =document.querySelector('canvas')
// de ve dc thi can getContext 2d hc 3d
var ctx = canvas.getContext('2d')

// Ham ve(draw function)
// ctx.beginPath(); // bat dau ve cai j do
// ctx.moveTo(0,0); //dia diem con tro(start)
// ctx.lineTo(300, 250); // end
// ctx.stroke(); //ve border(net lien)

// Init(khoi tao)
//vi tri dau tien(start)
var pos1 = {
    x: 0,
    y: 0
}//object
// vi tri thu 2 (end)
var pos2 = {
    x: 0,
    y: 0
}

//fix an chuot ms ve 
var isDraw=false;
var colorPaint='#000';
var size=20;

// dat chuot xuong --> start
document.addEventListener('mousedown', function(e){
    pos1 = {
        x: e.offsetX,
        y: e.offsetY
    }
    isDraw=true;
})

// di chuot --> end
document.addEventListener('mousemove', function(e){
    pos2={
        x: e.offsetX,
        y: e.offsetY
    }
    if(isDraw){
        //fill draw
        ctx.beginPath();
        ctx.arc(pos1.x, pos1.y, size, 0, 2*Math.PI);
        ctx.fillStyle=colorPaint
        ctx.fill()
        // draw outline
        ctx.beginPath(); // bat dau ve cai j do
        ctx.moveTo(pos1.x,pos1.y); //dia diem con tro(start)
        ctx.lineTo(pos2.x, pos2.y); // end
        ctx.strokeStyle= colorPaint;//set color
        ctx.lineWidth=size*2; 
        
        ctx.stroke(); //ve border(net lien)
    }
    //ve xong gan lai gia tri cuoi vao dau
    pos1.x=pos2.x;
    pos1.y=pos2.y;

})

// tha chuot len ko ve nx
document.addEventListener('mouseup', function(e){
    isDraw=false;
})

// get color khi bien color thay doi
color.addEventListener('change', function(e){
    colorPaint=e.target.value;
})

// eraser
eraser.addEventListener('click', function(){
    colorPaint='#fff';
})

decrease.addEventListener('click', function(){
    size-=5
    size=size>5 ? size:5 //dk max min
    sizeEl.innerHTML=size
})

increase.addEventListener('click', function(){
    size+=5
    size=size<30 ? size:30 //dk max min
    sizeEl.innerHTML=size
})

clear.addEventListener('click', function(){
    var canvasStats = canvas.getClientRects()[0];
    // console.log(canvasStats)
    ctx.clearRect(0, 0, canvasStats.width, canvasStats.height)
})

//canvas to data url
save.addEventListener('click', function(){
    var output= canvas.toDataURL('image/png')
    save.setAttribute('href', output)
})