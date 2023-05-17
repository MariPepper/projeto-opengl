/* This is good to go. */
var cube, scene, camera, renderer;

var squareimg = document.querySelector('img[src="./img/square.png"]');
squareimg.addEventListener('click', callSquare);

function callSquare() {
    echoSquare();
}

function echoSquare() {
    limpar();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xFFFFFF);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true,
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.userData.velocity = new THREE.Vector3(0.05, 0.05, 0);

    rotateCube(cube);

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    animateCube();

    /* To resize the canvas where the object exists. */
    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
}

/* It is important to change the functions name. */
function rotateCube(cube) {

    var cubePosition = {
        x: 0,
        y: 0,
        z: 0
    };

    var cubeVelocity = {
        x: 0.01,
        y: 0.01
    };

    var vInput = document.getElementById('v-input');
    var wInput = document.getElementById('w-input');
    var xInput = document.getElementById('x-input');
    var yInput = document.getElementById('y-input');
    var zInput = document.getElementById('z-input');

    vInput.addEventListener('input', function () {
        var zoomAmount = Number(vInput.value);
        var extendedMinPositionz = -10;
        var extendedMaxPositionz = 10;
        var range = extendedMaxPositionz - extendedMinPositionz;
        var stepSize = range / 50; // 50 steps for the entire range    
        camera.position.z -= zoomAmount * stepSize;
        camera.position.z = Math.max(extendedMinPositionz, Math.min(extendedMaxPositionz, camera.position.z));
    });

    wInput.addEventListener('input', function () {
        cubeVelocity.x = Number(wInput.value) * 0.01;
        cubeVelocity.y = Number(wInput.value) * 0.01;
        var scale = Math.abs(Math.sin(Number(wInput.value)));
        cube.scale.set(scale, scale, scale);
    });

    xInput.addEventListener('input', function () {
        cubePosition.x = Number(xInput.value);
        cube.position.x = cubePosition.x;
    });

    yInput.addEventListener('input', function () {
        cubePosition.y = Number(yInput.value);
        cube.position.y = cubePosition.y;
    });

    zInput.addEventListener('input', function () {
        cubePosition.z = Number(zInput.value);
        cube.position.z = cubePosition.z;
    });
}

/* It is important to change the functions name. */
function animateCube() {
    requestAnimationFrame(animateCube);

    if (
        cube.position.x >= 5 ||
        cube.position.x <= -5 ||
        cube.position.y >= 5 ||
        cube.position.y <= -5
    ) {
        cube.userData.velocity.x = -cube.userData.velocity.x;
        cube.userData.velocity.y = -cube.userData.velocity.y;
    }
    cube.position.x += cube.userData.velocity.x;
    cube.position.y += cube.userData.velocity.y;

    renderer.render(scene, camera);
}

function bounceSquare() {
    limpar();

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xdddddd, 1);

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.z = 50;
    scene.add(camera);

    var boxGeometry = new THREE.BoxGeometry(7, 14, 7);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    var pyramid = new THREE.Mesh(boxGeometry, lambertMaterial);
    pyramid.position.x = 0;
    scene.add(pyramid);

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.set(-10, 15, 50);
    scene.add(light);

    var t = 0;
    var speed = 0.01;
    var direction = new THREE.Vector3(1, 0, 0);

    function render() {
        t += speed;
        requestAnimationFrame(render);

        if (pyramid.position.y < -20) {
            direction.y = Math.abs(direction.y);
        }
        direction.y -= 0.1;

        pyramid.rotation.y += 0.01;
        pyramid.position.addScaledVector(direction, speed);
        pyramid.scale.y = Math.abs(Math.sin(t));
        pyramid.position.y = -7 * Math.sin(t * 2);
        renderer.render(scene, camera);
    }
    render();

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    /* To resize the window where all the elements of the page are located. */
    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
}