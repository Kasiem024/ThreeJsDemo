'use strict';

console.log('main.js is alive');

import * as THREE from '../three/build/three.module.js';
import { SVGLoader } from '../three/examples/jsm/loaders/SVGLoader.js';
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

let group = new THREE.Group();

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 1000;
// camera.position.x = 50;
// camera.position.y = 50;

const animate = function() {
    requestAnimationFrame(animate);

    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
    group.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
};

// instantiate a loader
const loader = new SVGLoader();

// load a SVG resource
loader.load(
    // resource URL
    '../images/Freesample.svg',
    // called when the resource is loaded
    function(data) {

        const paths = data.paths;
        // const group = new THREE.Group();

        for (let i = 0; i < paths.length; i++) {

            const path = paths[i];

            const material = new THREE.MeshBasicMaterial({
                color: path.color,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const shapes = SVGLoader.createShapes(path);

            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j];
                const geometry = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(geometry, material);
                group.add(mesh);

            }

        }

        scene.add(group);
        animate();

    },
    // called when loading is in progresses
    function(xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function(error) {

        console.log('An error happened');

    }
);