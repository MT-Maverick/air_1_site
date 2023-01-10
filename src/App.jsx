//modules  used:
import { useEffect } from 'react';
import * as THREE from 'three';
import './App.css';
import SceneInit from './lib/SceneInit';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

//Application's main method: 
function App() {
  //runs our application method
  useEffect(() => {
    //model variable creats shoe model from the class sceneInit onto the canvass "renderZone"
    const model = new SceneInit('renderZone');
    //initilizes's the core components of the model
    model.initialize();
      
    //object used to relate to gltf model object outside of function.
      let loadedModel;
             
      //GLTF Loader used to load 3d model object and assign properties.
      const glftLoader = new GLTFLoader();
      glftLoader.load('./assets/nike_shoe/scene2.glb', (gltfScene) => {
    
      loadedModel = gltfScene;
      loadedModel.scene.rotation.y = Math.PI/8;
      loadedModel.scene.position.y =-4;
      loadedModel.scene.position.z =-5;
      loadedModel.scene.scale.set(7, 7, 7);

     initColor(loadedModel.scene);
     model.scene.add(loadedModel.scene);
    });


    
    //adds color to specific part of model
    const initColor =(theModel)=>{
      const sections = document.getElementsByClassName('menu');
      let name;
      let color;
      let newMaterial;
      //shoe model material components: 
      const object ={
        Base :'Object_3',
        Body :'Object_4',
        Laces :'Object_5',
        Logo :'Object_6',
        Rubber :'Object_7'
      } 
      
      //method to determin which part of the shoe is selected and which color to assign:
      
      sections.item(1).addEventListener('click',()=>{
    
        name = object.Base;
        color = document.getElementById('color');
        
        newMaterial = new THREE.MeshPhongMaterial({color:color.value,shininess:10});
        theModel.traverse((object)=>{
          if(object.name==name){
            object.material = newMaterial;
          };
        });
      });
      sections.item(2).addEventListener('click',()=>{
    
        name = object.Body;
        color = document.getElementById('color');
        
        newMaterial = new THREE.MeshPhongMaterial({color:color.value,shininess:10});
        theModel.traverse((object)=>{
          if(object.name==name){
            object.material = newMaterial;
          };
        });
      });
    
      sections.item(3).addEventListener('click',()=>{
    
        name = object.Laces;
        color = document.getElementById('color');
       
        newMaterial = new THREE.MeshPhongMaterial({color:color.value,shininess:10});
        theModel.traverse((object)=>{
          if(object.name==name){
            object.material = newMaterial;
          }; 
        });
      });
    
      sections.item(4).addEventListener('click',()=>{
    
        name = object.Logo;
        color = document.getElementById('color');
        
        
        newMaterial = new THREE.MeshPhongMaterial({color:color.value,shininess:10});
        theModel.traverse((object)=>{
          if(object.name==name){
            object.material = newMaterial; 
          };
        });
      });
    
      sections.item(5).addEventListener('click',()=>{
    
        name = object.Rubber;
        color = document.getElementById('color');
        
        
        newMaterial = new THREE.MeshPhongMaterial({color:color.value,shininess:10});
        theModel.traverse((object)=>{
          if(object.name==name){
            object.material = newMaterial; 
          };
        });
      });
    }

    //renders and rotates the model along y-axies
    const rotate = () => {
    model.animate();
    requestAnimationFrame(rotate);
    };

    //controls animation of menu bar
    const menuBar=()=>{
    var menu_bar = document.getElementById('menu_bar');
    menu_bar.children.item(0).addEventListener('click',()=>{
    if(menu_bar.children.item(0).className=='active'){
      menu_bar.children.item(0).className='inactive';
      menu_bar.children.item(1).className='active';
        }
    });
    };
    
    //sets color to be rendered
    const colorSelect=()=>{
      const menu_bar = document.getElementById('menu_bar');
      var colorPanel = document.getElementById('colorPanel');
      var color_menu = document.getElementById('colorMenu');
      
      menu_bar.children.item(0).addEventListener('click',()=>{
        if(menu_bar.children.item(1).className =='active'){
          
          color_menu.className = 'visible';
          var colorBlock = document.createElement('input');
          colorBlock.id = 'color';
          colorBlock.style.padding = 1+'%';
          colorBlock.value = 'insert color name';
          colorPanel.append(colorBlock);
        };
      });
    };


   const save=()=>{
    
    }
    menuBar();
    colorSelect();
    rotate();
});

  return (
    
    //html body that contains canvas & buttons.
    /*
    div 1: stores menu buttons and canvas scene
    div 2: stores color menu and its buttons //rendered via method: color_menu() 
    */
    <>
    <div id='menu_bar'>
      <ul className='active'>
        <li className='menu'>Make_Model</li>
      </ul>
    
      <ul className='inactive' id='sections'>
        <li className='menu'>Base</li>
        <li className='menu'>Body</li>
        <li className='menu'>Laces</li>
        <li className='menu'>Rubber</li>
        <li className='menu'>Logo</li>
      </ul>
       <canvas id='renderZone'/>
      </div>
    
      <div id='colorMenu' className='inactive'>
        <div id='colorPanel' className='color_content'>
        </div>
      </div>
      </>
  );
}

export default App;