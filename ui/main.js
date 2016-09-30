console.log('Loaded!');
//make the image move on click
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight(){
    marginLeft+=8;
    img.style.marginLeft=marginLeft+ 'px';
}
img.onclick= function (){
    var interval=setInterval(moveRight,100);

};