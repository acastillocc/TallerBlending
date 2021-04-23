import * as THREE from '../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import Sound from '../src/Sound.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

let plane = undefined;
let plane1 = undefined;
let plane4 = undefined;
let plane6 = undefined;
let plane7 = undefined;
let player = undefined;


const objects = {};
let controls = undefined;
const controller = {
    UP: { active: false, code: "KeyW" },
    RIGHT: { active: false, code: "KeyD" },
    DOWN: { active: false, code: "KeyS" },
    LEFT: { active: false, code: "KeyA" },

    STOP: {active: false, code: "KeyB"},
    PLAY: { active: false, code: "Space" },
    ADELANTAR: { active: false, code: "KeyL" },
    ATRAS: { active: false, code: "KeyJ" },

}
const lights = {
    sp: undefined
};

const speed = 0.08;

const sounds = [];
const lightss = [];
let soundsPlaying = false;
let spotLight;
let pointLight;

window.onload = () => {
    main()
}

window.onkeypress = () => {
    if (!soundsPlaying) {
        sounds.forEach(sound => {
            sound.play();
        });
        soundsPlaying = true;
    } else  {
        window.onkeypress = undefined;
    }
}


window.onresize = () => {
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight, true);
}

window.onkeydown = (e) => { 
    switch (e.code) {
        case controller.UP.code:
            controller.UP.active = true;
            break;
        case controller.RIGHT.code:
            controller.RIGHT.active = true;
            break;
        case controller.DOWN.code:
            controller.DOWN.active = true;
            break;
        case controller.LEFT.code:
            controller.LEFT.active = true;
            break;

        case controller.STOP.code:
               controller.STOP.active = true;
            break;
        case controller.PLAY.code:
                controller.PLAY.active = true;
            break;
        case controller.ADELANTAR.code:
                controller.ADELANTAR.active = true;
            break;
        case controller.ATRAS.code:
                controller.ATRAS.active = true;
            break;
    }
}
window.onkeyup = (e) => { 
    switch (e.code) {
        case controller.UP.code:
            controller.UP.active = false;
            break;
        case controller.RIGHT.code:
            controller.RIGHT.active = false;
            break;
        case controller.DOWN.code:
            controller.DOWN.active = false;
            break;
        case controller.LEFT.code:
            controller.LEFT.active = false;
            break;

        case controller.STOP.code:
            controller.STOP.active = false;
            break;
        case controller.PLAY.code:
            controller.PLAY.active = false;
            break;
        case controller.ADELANTAR.code:
            controller.ADELANTAR.active = false;
            break;
        case controller.ATRAS.code:
            controller.ATRAS.active = false;
            break;
    }
}

export function main() {

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    camera.position.z = 15;
    camera.position.y = 20;
    camera.position.x = -10;
    
    // Controles
    controls = new OrbitControls(camera, renderer.domElement);
    // Lights
    setUpLights();

    // Plano base
    const geometry = new THREE.PlaneGeometry( 30,30,30,30 );
    const material = new THREE.MeshBasicMaterial( {color: 0x686de0, side: THREE.DoubleSide, wireframe: false} );
    plane = new THREE.Mesh( geometry, material );
    scene.add(plane);
    plane.rotation.x = Math.PI / 2;

    loadTexturedPlane({
        texture: './images/artistas/ariana.jpeg',
    });

    loadTexturedPlane({
        texture: './images/artistas/duaLipa.jpeg',
        position: {
            x: -3.5,
            y: 2.5,
            z: 0.1
        }
    });

    loadTexturedPlane({
        w: 3,
        h: 3,
        d: 3,
        texture: './images/artistas/brunomars.jpeg',
        color: 0xffffff,
        position: {
            x: -8,
            y: 2.5,
            z: 0.1
        }   
    });

    loadTexturedPlane({
        w: 4,
        h: 4,
        d: 3,
        texture: './images/artistas/bobMarley.jpeg',
        color: 0xffffff,
        position: {
            x: 4,
            y: 2.5,
            z: 0.3
        }     
    });

    loadTexturedPlane({
        w: 4,
        h: 4,
        d: 3,
        texture: './images/artistas/reggae2.jpeg',
        color: 0xffffff,
        position: {
            x: 9,
            y: 2.5,
            z: 0.3
        }
    });

    loadTexturedPlane({
        w: 4,
        h: 4,
        d: 3,
        texture: './images/artistas/DVLM.jpeg',
        color: 0xffffff,
        position: {
            x: 0.1,
            y: 2.5,
            z: -4
        },

        rotation: {
            y: Math.PI/2
        }
    });

    loadTexturedPlane({
        w: 6,
        h: 4,
        d: 3,
        texture: './images/artistas/martinGarrix.jpeg',
        color: 0xffffff,
        position: {
            x: 0.1,
            y: 2.5,
            z: -10
        },

        rotation: {
            y: Math.PI/2
        }
    });

    loadTexturedPlane({
        w: 6,
        h: 4,
        d: 3,
        texture: './images/artistas/alanWalker.jpeg',
        color: 0xffffff,
        position: {
            x: 6,
            y: 2.5,
            z: -0.1
        },

        rotation: {
            x: Math.PI/150,
            z: Math.PI/150
        }
    });

    loadTexturedPlane({
        w: 4.5,
        h: 4,
        d: 3,
        texture: './images/artistas/DaftPunk.jpeg',
        color: 0xffffff,
        position: {
            x: -3,
            y: 2.5,
            z: -0.1
        },

        rotation: {
            x: Math.PI/150,
            z: Math.PI/150
        }
    });

    loadTexturedPlane({
        w: 3.5,
        h: 4,
        d: 3,
        texture: './images/artistas/disco1.jpeg',
        color: 0xffffff,
        position: {
            x: -12,
            y: 2.5,
            z: -0.1
        },

        rotation: {
            x: Math.PI/150,
            z: Math.PI/150
        }
    });

    loadTexturedPlane({
        w: 4,
        h: 4,
        d: 3,
        texture: './images/artistas/disco2.jpeg',
        color: 0xffffff,
        position: {
            x: -8,
            y: 2.5,
            z: -0.1
        },

        rotation: {
            x: Math.PI/150,
            z: Math.PI/150
        }
    });

    loadTexturedPlane({
        w: 5,
        h: -10,
        d: 15,
        texture: './images/background/pop-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: -5,
            y: 2.5,
            z: 8.9
        },

        rotation: {
            z: Math.PI/2,
            y: Math.PI
        }
    });

    loadTexturedPlane({
        w: 5,
        h: -10,
        d: 15,
        texture: './images/background/pop-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: -5,
            y: 2.5,
            z: 9.1
        },

        rotation: {
            x: Math.PI/150,
            y: Math.PI,
            z: Math.PI/2
        }
    });

    loadTexturedPlane({
        w: 15,
        h: -5,
        d: 15,
        texture: './images/background/pop-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: -0.1,
            y: 2.5,
            z: 7.5
        },

        rotation: {
            x: Math.PI/150,
            y: Math.PI/2,
            z: Math.PI
        }
    });

    loadTexturedPlane({
        w: 5,
        h: -10,
        d: 15,
        texture: './images/background/disco-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: -5,
            y: 2.5,
            z: -8.9
        },

        rotation: {
            z: Math.PI/2,
            y: Math.PI
        }
    });

    loadTexturedPlane({
        w: 5,
        h: -10,
        d: 15,
        texture: './images/background/disco-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: -5,
            y: 2.5,
            z: -9.1
        },

        rotation: {
            x: Math.PI/150,
            y: Math.PI,
            z: Math.PI/2
        }
    });
    

    loadTexturedPlane({
        w: 15,
        h: -5,
        d: 15,
        texture: './images/background/disco-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: -0.1,
            y: 2.5,
            z: -7.5
        },

        rotation: {
            x: Math.PI/150,
            y: Math.PI/2,
            z: Math.PI
        }
    });

    loadTexturedPlane({
        w: 10,
        h: 5,
        d: 15,
        texture: './images/background/reggae-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: 11.9,
            y: 2.5,
            z: 5
        },

        rotation: {
            x: Math.PI/150,
            y: -Math.PI/2,
            z: Math.PI
        }   
    });

    loadTexturedPlane({
        w: 10,
        h: 5,
        d: 15,
        texture: './images/background/reggae-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: 12.1,
            y: 2.5,
            z: 5
        },

        rotation: {
            x: Math.PI/150,
            y: Math.PI/2,
            z: Math.PI
        }
    });

    loadTexturedPlane({
        w: 15,
        h: -5,
        d: 15,
        texture: './images/background/reggae-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: 0.3,
            y: 2.5,
            z: 7.5
        },
        rotation: {
            x: Math.PI/150,
            y: -Math.PI/2,
            z: Math.PI
        }
    });

    loadTexturedPlane({
        w: 5,
        h: -10,
        d: 15,
        texture: './images/background/electro-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: 11,
            y: 2.5,
            z: -5
        },
        rotation: {
            x: Math.PI/150,
            y: Math.PI/2,
            z: Math.PI/2
        }
    });

    loadTexturedPlane({
        w: 5,
        h: -10,
        d: 15,
        texture: './images/background/electro-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: 11,
            y: 2.5,
            z: -5
        },
        rotation: {
            x: Math.PI/150,
            y: -Math.PI/2,
            z: Math.PI/2
        }
    });

    loadTexturedPlane({
        w: 15,
        h: -5,
        d: 15,
        texture: './images/background/electro-fondo.jpeg',
        color: 0xffffff,
        position: {
            x: 0.02,
            y: 2.5,
            z: -7.5
        },
        rotation: {
            x: Math.PI/150,
            y: -Math.PI/2,
            z: Math.PI
        }
    });

    function loadTexturedPlane(params) {
        const geometry = new THREE.PlaneGeometry(params.w && params.w || 4, params.h && params.h || 4, params.d && params.d || 4);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(params.texture);
    
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: texture
        });
        
        const plane = new THREE.Mesh(geometry, material);
        plane.position.x = params.position && params.position.x || -12;
        plane.position.y = params.position && params.position.y || 2.5
        plane.position.z = params.position && params.position.z || 0.1;

        plane.rotation.x = params.rotation && params.rotation.x || Math.PI;
        plane.rotation.y = params.rotation && params.rotation.y || Math.PI;
        plane.rotation.z = params.rotation && params.rotation.z || Math.PI;
        
        scene.add(plane);
    }

    //------------------ PAREDES ------------------

    //POP
    const pared1 = new THREE.PlaneGeometry( 15,-5,15,10 );
    const material2 = new THREE.MeshBasicMaterial( {color: 0xf1c40f, side: THREE.DoubleSide, wireframe: false} );
    plane1 = new THREE.Mesh( pared1, material2 );
    scene.add(plane1);
    plane1.rotation.x = Math.PI ;
    plane1.position.y = 2.5;
    plane1.position.x = -7.5;

    //DISCO
    const pared4 = new THREE.PlaneGeometry( 15,5,15,10 );
    const material5 = new THREE.MeshBasicMaterial( {color: 0xD980FA, side: THREE.DoubleSide, wireframe: false} );
    plane4 = new THREE.Mesh( pared4, material5 );
    scene.add(plane4);
    plane4.rotation.y = Math.PI  ;
    plane4.position.y = 2.5;
    plane4.position.x = -7.5;
    plane4.position.z = -0.01;

    //ELECTRO

    const pared6 = new THREE.PlaneGeometry( 15,5,15,10 );
    const material7 = new THREE.MeshBasicMaterial( {color: 0x2f3542, side: THREE.DoubleSide, wireframe: false} );
    plane6 = new THREE.Mesh( pared6, material7 );
    scene.add(plane6);
    plane6.rotation.y = Math.PI  ;
    plane6.position.y = 2.5;
    plane6.position.x = 7.5;
    plane6.position.z = -0.01;

    //REGGAE
    const pared7 = new THREE.PlaneGeometry( 15,5,15,10 );
    const material8 = new THREE.MeshBasicMaterial( {color: 0x4cd137, side: THREE.DoubleSide, wireframe: false} );
    plane7 = new THREE.Mesh( pared7, material8 );
    scene.add(plane7);
    plane7.rotation.y = Math.PI  ;
    plane7.position.y = 2.5;
    plane7.position.x = 7.5;
    plane7.position.z = 0.2;


    /**
     * 
     * @param {*} params
     * {
        w: 1,
        h: 1,
        d: 1,
        texture: '../convinientlyPlacedTextures/cartoonBox.jpeg',
        color: 0xffffff,
        position: {
            x: 0,
            y: 0.5,
            z: 0
        }
    } 
 */
    player = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
        new THREE.MeshBasicMaterial({
            color: 0xfdcb6e,
            wireframe: false
        })
    );
    player.position.x = -14;
    player.position.z = 5;
    player.position.y = 0.5;
    scene.add(player);

    sounds.push(new Sound(['./media/pop.mp3'],7, scene, { position: { x: -7, y:0, z: 7}, debug: false } ));
    sounds.push(new Sound(['./media/reggae.mp3'], 7, scene, { position: { x: 7, y:0, z: 7}, debug: false }));
    sounds.push(new Sound(['./media/disco1.mp3'], 7, scene, { position: { x: -7, y:0, z: -7}, debug: false }));
    sounds.push(new Sound(['./media/electro1.mp3'], 7, scene, { position: { x: 7, y:0, z: -7}, debug: false }));

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    updateElements();
    renderer.render(scene, camera);
}

function updateElements() {
    renderer.setClearColor(0x000, 1);
    player.position.x = controller.RIGHT.active ? player.position.x + speed : player.position.x;
    player.position.x = controller.LEFT.active ? player.position.x - speed : player.position.x;
    player.position.z = controller.DOWN.active ? player.position.z + speed : player.position.z;
    player.position.z = controller.UP.active ? player.position.z - speed : player.position.z;
    
        sounds.forEach(sound => {
            if (controller.STOP.active){
            if (sound.playerInside) {
                sound.pause();
            }
        }
        });

        sounds.forEach(sound => {
            if (controller.PLAY.active){
            if (sound.playerInside) {
                sound.play();
            }
        }
        });

        sounds.forEach(sound => {
            if (controller.ADELANTAR.active){
            if (sound.playerInside) {
                sound.adelantar();
            }
        }
        });

        sounds.forEach(sound => {
            if (controller.ATRAS.active){
            if (sound.playerInside) {
                sound.retroceder();
            }
        }
        });


    sounds.forEach(sound => {
        sound.update(player);       
    })

    } 

function setUpLights() {
    const ambient = new THREE.AmbientLight( 0xEA2027, 0.1 );
    scene.add( ambient );

    //POINT LIGHT -----ELECTRO-----

    const pointLight = new THREE.PointLight(0xeb435b, 0.7, 100 );
    pointLight.position.set( 12, 3, -12 );
    scene.add( pointLight );

    /* const sphereSize = 0.8;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );  */

    lights.sp = pointLight;

    //POINT LIGHT ----POP-----

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100 );
    pointLight2.position.set( -12, 4, 12 );
    scene.add( pointLight2 );

    /* const sphereSize2 = 1;
    const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize2 );
    scene.add( pointLightHelper2 );  */

    //POINT LIGHT -------REGGAE------

    const pointLight3 = new THREE.PointLight(0xECF36, 0.5, 100 );
    pointLight3.position.set( 13, 3,13 );
    scene.add( pointLight3 );

    /* const sphereSize3 = 1;
    const pointLightHelper3 = new THREE.PointLightHelper( pointLight3, sphereSize3 );
    scene.add( pointLightHelper3 );  */

    //POINT LIGHT ---- DISCO -----

    const pointLight4 = new THREE.PointLight(0x9b59b6, 0.6, 100 );
    pointLight4.position.set( -12, 3, -15 );
    scene.add( pointLight4 );

   /* const sphereSize4 = 1;
    const pointLightHelper4 = new THREE.PointLightHelper( pointLight4, sphereSize4 );
    scene.add( pointLightHelper4 );  */
    
}
