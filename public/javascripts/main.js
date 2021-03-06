'use strict';

console.log('main.js is alive');

import * as THREE from './three.module.js';
import { SVGLoader } from './SVGLoader.js';
import { OrbitControls } from './OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(270, 280, 2400);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

const animate = function() {
    requestAnimationFrame(animate);

    // group.rotation.x += 0.01;
    // group.rotation.y += 0.01;
    group.rotation.z += 0.01;

    controls.update();

    // console.log(controls)
    // console.log(camera.position)

    renderer.render(scene, camera);
};

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 1000;
// camera.position.x = 500;
// camera.position.y = 500;



let group = new THREE.Group();

// instantiate a loader
const loader = new SVGLoader();

// load a SVG resource
loader.load(
    // resource URL
    '../images/tree.svg',
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
        // SVG is rendered inverted to the default
        group.scale.y = -1

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