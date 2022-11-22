//modules:
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import Stats from 'three/examples/jsm/libs/stats.module';

/*
class variables that define shoe model:
variables:{scene}-> creats a environment where model is manifested
          {camera}-> a object that defines the perspective that the model is viewed in
          {renderer}-> the engine that instansiates the model
          {controls}-> the property that allows us to move the model as per requiered
          {ambientLight}-> the ligth emitted for the entier scene
          {directionalLight}-> the light emitted towards the model
          {stats(for development)}-> displayes a div element that shows the statistics of the rendered model
*/
export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera properies.
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    //this.stats = undefined;
    this.controls = undefined;
    
  // NOTE: Lighting components.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  //start method to creat Three.js application
  initialize() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.z = 48;

  // NOTE: calls the canvas which is already created in the HTML body.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

  //NOTE: properties of rendered model
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xaaaaaa);
    this.renderer.shadowMap = true;
    document.body.appendChild(this.renderer.domElement);

  // NOTE: Additional components properties. 
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //this.stats = Stats();
    //document.body.appendChild(this.stats.dom);

  // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

  // directional light wthich directs light towards object
  this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
  this.directionalLight.castShadow = true;
  this.directionalLight.position.set(0, 32, 64);
  this.scene.add(this.directionalLight);


  // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }
  
  // runs render function continuously onto the page so model can render and aditional components:
    animate() {
      this.render();
      this.controls.update();
      //this.stats.update();
    }

  // method to render scene and camera objects using renderer
    render() {
      this.renderer.render(this.scene, this.camera);
    }

  // if size of window changes method:
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
}