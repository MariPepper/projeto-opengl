/* This is good to go. */
var pyramid, scene, camera, renderer;

var triangleimg = document.querySelector('img[src="./img/triangle.png"]');
triangleimg.addEventListener('click', callTriangle);

function callTriangle() {
    //resizeCanvasToDisplaySize(gl.canvas);
    echoTriangle();
}

function echoTriangle() {
    limpar();

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xFFFFFF);

    var coneGeometry = new THREE.ConeGeometry(7, 14, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2,
        wireframe: true,
    });
    var pyramid = new THREE.Mesh(coneGeometry, lambertMaterial);
    pyramid.position.x = 25;
    scene.add(pyramid);

    var pyramidPosition = new THREE.Vector3(0, 0, 0);
    /* To set the triangle x, y, z motion and velocity. */
    var pyramidVelocity = new THREE.Vector3(0.01, 0.01, 0.05);

    function render() {
        requestAnimationFrame(render);

        pyramid.rotation.y += 0.01;

        pyramidPosition.add(pyramidVelocity);
        pyramid.position.copy(pyramidPosition);

        renderer.render(scene, camera);
    }

    render();

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    var vInput = document.getElementById('v-input');
    var wInput = document.getElementById('w-input');
    var xInput = document.getElementById('x-input');
    var yInput = document.getElementById('y-input');
    var zInput = document.getElementById('z-input');

    vInput.addEventListener('input', function () {
        var zoomAmount = Number(vInput.value);
        /* Zoom adjusted to new minimum and maximum position of the camera. */
        var extendedMinPositionz = -100;
        var extendedMaxPositionz = 100;
        var range = extendedMaxPositionz - extendedMinPositionz;
        var stepSize = range / 50; // 50 steps for the entire range    
        camera.position.z -= zoomAmount * stepSize;
        camera.position.z = Math.max(extendedMinPositionz, Math.min(extendedMaxPositionz, camera.position.z));
    });

    wInput.addEventListener('input', function () {
        pyramidVelocity.x = Number(wInput.value) * 0.01;
        pyramidVelocity.y = Number(wInput.value) * 0.01;
        var scale = Math.abs(Math.sin(Number(wInput.value)));
        pyramid.scale.set(scale, scale, scale);
        /* 
         * pyramid.scale.set(Math.abs(Math.sin(Number(wInput.value))), 
         * Math.abs(Math.sin(Number(wInput.value))), 
         * Math.abs(Math.sin(Number(wInput.value)))); 
         * */
    });

    xInput.addEventListener('input', function () {
        pyramidPosition.x = Number(xInput.value);
        pyramid.position.x = pyramidPosition.x;
    });

    yInput.addEventListener('input', function () {
        pyramidPosition.y = Number(yInput.value);
        pyramid.position.y = pyramidPosition.y;
    });

    zInput.addEventListener('input', function () {
        pyramidPosition.z = Number(zInput.value);
        pyramid.position.z = pyramidPosition.z;

        /* To increase the speed and use z coordinates. */
        pyramidVelocity.z = pyramidPosition.z * 0.01;
    });

    /* To resize the canvas where the object exists. */
    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
}

function bounceTriangle() {
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

    var coneGeometry = new THREE.ConeGeometry(7, 14, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    pyramid = new THREE.Mesh(coneGeometry, lambertMaterial);
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