import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Sound {


    constructor(sources, radius, scene, ap) {
        
        this.audio = document.createElement("audio");
        this.cancion = document.createElement("cancion");
        this.radius = radius;
        this.scene = scene;
        this.playerInside = false;

        sources.forEach(source => {
            const src = document.createElement("source");
            src.src = source;
            this.audio.appendChild(src);
        });

        this.position = "position" in ap ? new THREE.Vector3(ap.position.x, ap.position.y, ap.position.z) : new THREE.Vector3(0, 0, 0);

        this.volume = "volume" in ap ? ap.volume > 1 ? 1 : ap.volume : 1;


        if ("debug" in ap) {
            if (ap.debug) {
                this.debugMode();
            }
        }
    }

    debugMode() {
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xfff,
                wireframe:true
                
            })
        )
               
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.scene.add(this.mesh);
    }

    play() {
        this.audio.play().catch( (err) => {
            console.log(err);          
        });

        //this.audio.loop = true;
    }

    pause(){
        this.audio.pause();
    }

    adelantar(){
        this.audio.currentTime += 5.0;
        console.log("ADELANTANDO");
        
    }

    retroceder(){
        console.log("RETRASANDO");
        this.audio.currentTime -= 5.0;
    }
    
    nextSong(){
    this.audio.addEventListener('ended',function(){
         this.audio(audios[2]);   //play next song
    });

    //playlist audios

    const audios = [{
        name: "Levitating",
        artist: "Dua Lipa",
        path: "pop.mp3"
      },
      {
        name: "7 Rings",
        artist: "Ariana Grande",
        path: "pop2.mp3"
      },
      {
        name: "That's What I Like",
        artist: "Bruno Mars",
        path: "pop3.mp3",
      }

    ];
    }

    

    update(element) {
        const distance = this.position.distanceTo(element.position);
        let volume = distance <= this.radius ? this.volume * (1 - distance / this.radius) : 0;
        this.audio.volume = volume;
        this.playerInside = this.audio.volume > 0  ; 
    }

}
