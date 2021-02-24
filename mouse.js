// Mouse Move
var drag = false;
var x_one, x_two, y_one, y_two

// Type object
var drawMethod;
var verticesArr = [];
var isDrawing = false;
var hexVal;
var colorRGB;
var polyArr;
var sideInput;
var dragged = {
  shape_id: null,
  param: null
}

const renderPoly = (coorX, coorY) => {
  polyArr = []
  var n = parseInt(document.getElementById('side-input').value)
  var r = parseInt(document.getElementById('size-input').value) * 0.0025
  for (i = 0; i < n; i++) {
    var x = coorX + r * Math.cos(2 * Math.PI * i / n) 
    var y = coorY + r * Math.sin(2 * Math.PI * i / n)
    polyArr.push(x)
    polyArr.push(y)
  }

  hexVal =  document.getElementById("color-input").value
  colorRGB = hexToRgbNew(hexVal.replace('#',''))
}

var mouseDown = function(e) {
  if(change == 1){
      x_one = e.pageX;
      y_one = e.pageY;
      var found = false;
      console.log(allShapes[0].method);
      console.log(allShapes[0]);
      console.log(colorRGB);
      hexVal =  document.getElementById("color-input").value
      colorRGB = hexToRgbNew(hexVal.replace('#',''))
      for (var i=0 ; i<allShapes.length;i++) {
          if(allShapes[i].method == 6){ //polygon
            var points = []
            for (var j=0; j<allShapes[i].vertices.length;j=j+2){
              points.push([allShapes[i].vertices[j],allShapes[i].vertices[j+1]])
            }
            console.log(points);
            if(inside([getCoorX(x_one),getCoorY(y_one)], points)){
              found = true;
              break;
            }
          }
      }
      console.log(found);
      if(found){
        allShapes[i].rgbVal = colorRGB;
        renderAll();
      }
      
      change = 0;
  }
  if(geoObject != ''){
    x_one = e.pageX 
    y_one = e.pageY;
    if (geoObject == "line"){
      isDrawing = !isDrawing;
    }
  }

  if (!isDrawing && !drag){
    if (geoObject == "square"){
      renderSquare()
      const shape = {
        method: drawMethod,
        vertices: verticesArr,
        rgbVal: colorRGB
      }
      allShapes.push(shape)
      renderAll()
      geoObject = ""
    } else if (geoObject == "polygon"){
      renderPoly(getCoorX(e.pageX), getCoorY(e.pageY))
      const shape = {
        method: gl.TRIANGLE_FAN,
        vertices: polyArr,
        rgbVal: colorRGB
      }
      allShapes.push(shape)
      renderAll()
      geoObject = ""
    } else if (geoObject == '') {
      x_one = e.pageX
      y_one = e.pageY

      var pos = [getCoorX(x_one),getCoorY(y_one)]

      var found = point_obj.some((val,idx) => {
        var vert = []
        for (var i = 0; i < val.vertex.length; i+=2){
          vert.push([val.vertex[i],val.vertex[i+1]])
        }
        if (inside(pos, vert)){
          dragged.shape_id = val.shape_id
          dragged.param = val.param
          return true
        }
      })

      if(found){
        if (allShapes[dragged.shape_id].method == gl.LINE_STRIP) drag = true
        else {
          dragged = {}
        }
      }
    }
  } else if (drag) drag = false

  e.preventDefault();
  return false;
};

var mouseMove = function(e) {
  x_two = e.pageX
  y_two = e.pageY

  if (isDrawing && geoObject != ""){
    if (geoObject == "line"){
      drawMethod = gl.LINE_STRIP
      verticesArr = [
        getCoorX(x_one), 
        getCoorY(y_one), 
        getCoorX(x_two), 
        getCoorY(y_two),
      ]
    }
    renderAll()
    hexVal =  document.getElementById("color-input").value
    colorRGB = hexToRgbNew(hexVal.replace('#',''))
    render(drawMethod, verticesArr, colorRGB)
  }

  else if (geoObject == "square"){
    x_one = e.pageX
    y_one = e.pageY

    if(x_one < 40){
      x_one = 40
    }

    if (y_one < 40){
      y_one = 40
    }

    renderSquare()
    hexVal =  document.getElementById("color-input").value
    colorRGB = hexToRgbNew(hexVal.replace('#',''))
    // render(drawMethod, verticesArr, colorRGB)
    // renderAll()
  }

  else if (drag) {
    allShapes[dragged.shape_id].vertices[dragged.param*2] = getCoorX(x_two)
    allShapes[dragged.shape_id].vertices[dragged.param*2+1] = getCoorY(y_two)
    renderAll()
  }
};

var mouseUp = function(e){
  if (!isDrawing && geoObject != '') {
    const shape = {
      method: drawMethod,
      vertices: verticesArr,
      rgbVal: colorRGB
    }
    
    allShapes.push(shape)
    renderAll()
    geoObject = ""
  }
};

var renderSquare = () => {
  const size = parseInt(document.getElementById('size-input').value)
  if(x_one < 40){
    x_one = 40
  }
  if (y_one < 40){
    y_one = 40
  }

  x_one = x_one - size/2
  y_one = y_one + size/2
  x_two = x_one + size
  y_two = y_one

  drawMethod = gl.TRIANGLE_STRIP
  verticesArr = [
    getCoorX(x_one), 
    getCoorY(y_one), 
    getCoorX(x_two), 
    getCoorY(y_two),

    getCoorX(x_one), 
    getCoorY(y_one - size), 
    getCoorX(x_two), 
    getCoorY(y_two - size),
  ]
}

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);