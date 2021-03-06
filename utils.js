const canvasWidth = 500
const canvasHeight = 500
const middleX = canvasWidth/2
const middleY = canvasHeight/2
var point_obj = []

function hexToRgbNew(hex) {
  var arrBuff = new ArrayBuffer(4);
  var vw = new DataView(arrBuff);
  vw.setUint32(0,parseInt(hex, 16),false);
  var arrByte = new Uint8Array(arrBuff);

  return [arrByte[1], arrByte[2], arrByte[3]]
}

const getArrColor = (r,g,b,a) => {
  return [r/255, g/255, b/255, a]
}

const getCoorX = (x) => {
  var coorX = 0
  if(x >= 0){
    coorX = (x - middleX) / middleX
  }
  return coorX
}

const getCoorY = (y) => {
  var coorY = 0
  if(y >= 0){
    coorY = -1 * (y - middleY) / middleY
  }
  return coorY
}

var geoObject = ''
var isDrawingRandom = false
var randomArr = []
var nRandom = 0

const drawObject = (objectName) => {
  geoObject = objectName

  if (objectName == "random"){
    nRandom = parseInt(document.getElementById('side-input').value)
    isDrawingRandom = true
    randomArr = []
  }
}

var allShapes = []

var isHelpActive = false;
const onClickHelp = () => {
  const helpBtn = document.getElementById("help-button")
  const content = document.getElementById("help-content")
  if (!isHelpActive){
    // activating
    helpBtn.innerHTML = "Hide Help"
    content.style.display = "block"
  }
  else {
    // deactivating
    helpBtn.innerHTML = "Show Help"
    content.style.display = "none"
  }
  isHelpActive = !isHelpActive
}
var change = 0;
const clickChange = () => {
  change = 1;
  document.getElementById("moving-line").style.display = "block"
  document.getElementById("moving-line").innerHTML = "Mengubah warna: Pilih satu polygon"
}
var resize = 0;
const clickResize = () => {
  resize = 1;
  document.getElementById("moving-line").style.display = "block"
  document.getElementById("moving-line").innerHTML = "Mengubah ukuran: Pilih satu square "
}