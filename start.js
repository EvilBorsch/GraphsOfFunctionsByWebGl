// three.js animataed line using BufferGeometry
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r114/build/three.module.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

var renderer, scene, camera;



var c = new THREE.Color(0x0000ff); // задаем цвет
var obj={color: c}

const parameters =
    {
      x: 0, y: 0, z: 0,
    };




init()
setUpGUI()
animate()

function init() {

  // info
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '30px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.style.color = '#fff';
  info.style.fontWeight = 'bold';
  info.style.backgroundColor = 'transparent';
  info.style.zIndex = '1';
  info.style.fontFamily = 'Monospace';
  info.innerHTML = "График функции y=x+2";
  document.body.appendChild(info);

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // scene
  var c = new THREE.Color(0xffffff); // задаем цвет
  scene = new THREE.Scene();
  scene.background=c


  camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 10000);

  drawAxis()

  //updatePositions();

}






function drawAxis() {
  let materialLine = new THREE.LineBasicMaterial({color: 0x0000ff});
  let geometryLine = new THREE.Geometry();
  geometryLine.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(0, 10000, 0));
  geometryLine.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(20000, 0, 0));
  let line2 = new THREE.Line(geometryLine, materialLine);
  scene.add(line2);
}

function drawLine(x1, y1, x2, y2) {

  var materialLine = new THREE.LineBasicMaterial(obj);

  let geometryLine = new THREE.Geometry();
  geometryLine.vertices.push(new THREE.Vector3(x1, y1, 0));
  geometryLine.vertices.push(new THREE.Vector3(x2, y2, 0));
  let line2 = new THREE.Line(geometryLine, materialLine);
  scene.add(line2);
}


function setUpGUI() {
  var gui = new GUI();
  var color = {
    value: c.getHex() // получаем hex-здначение цвета и записываем его в объект
  }
  gui.addColor(color, "value").name("background").onChange((value) => {
    obj.color.set(value); // меняем значение заданного цвета
  });

  const folder1 = gui.addFolder('MaxValues');
  folder1.add(parameters, 'y').onChange((value) => {
    // eslint-disable-next-line max-len
    ymax=value


  });

  folder1.add(parameters, 'x').onChange((value) => {
    // eslint-disable-next-line max-len
    xmax=value


  });


}






// render
function render() {

  renderer.render(scene, camera);

}

var prevx=0
var prevy=0
var ymax=10000000
var xmax=1000000


function animate(time) {

  time=time*1
  let x=time
  let y=x+2
  if (y>ymax){
    return
  }
  if (x>xmax){
    return
  }


  drawLine(prevx,prevy,x,y)
  prevx=x
  prevy=y
  requestAnimationFrame(animate);
  render();

}
