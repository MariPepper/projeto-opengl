/* This is good to go. */
var circle, scene, camera, renderer;

var circleimg = document.querySelector('img[src="./img/circle.png"]');
circleimg.addEventListener('click', callCircle);

function callCircle() {
    echoCircle();
}

function echoCircle() {
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

    var circleGeometry = new THREE.CircleGeometry(1, 32);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
    });
    circle = new THREE.Mesh(circleGeometry, material);
    scene.add(circle);

    circle.userData.velocity = new THREE.Vector3(0.05, 0.05, 0);

    rotateCircle(circle);

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    animateCircle();

    /* To resize the canvas where the object exists. */
    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
}

/* It is important to change the functions name. */
function rotateCircle(circle) {

    var circlePosition = {
        x: 0,
        y: 0,
        z: 0
    };

    var circleVelocity = {
        x: 0.05,
        y: 0.05
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
        circleVelocity.x = Number(wInput.value) * 0.01;
        circleVelocity.y = Number(wInput.value) * 0.01;
        circle.scale.set(
            Math.abs(Math.sin(Number(wInput.value))),
            Math.abs(Math.sin(Number(wInput.value))),
            Math.abs(Math.sin(Number(wInput.value))));
    });

    xInput.addEventListener('input', function () {
        circlePosition.x = Number(xInput.value);
        circle.position.x = circlePosition.x;
    });

    yInput.addEventListener('input', function () {
        circlePosition.y = Number(yInput.value);
        circle.position.y = circlePosition.y;
    });

    zInput.addEventListener('input', function () {
        circlePosition.z = Number(zInput.value);
        circle.position.z = circlePosition.z;
    });
}

/* It is important to change the functions name. */
function animateCircle() {
    requestAnimationFrame(animateCircle);

    var center = new THREE.Vector3(0, 0, 0);
    if (circle.position.x >= 5 || circle.position.x <= -5) {
        circle.userData.velocity.x = -circle.userData.velocity.x;
        circle.position.x = circle.position.x;
    }
    if (circle.position.y >= 5 || circle.position.y <= -5) {
        circle.userData.velocity.y = -circle.userData.velocity.y;
        circle.position.y = circle.position.y;
    }
    if (circle.position.z <= -5) {
        circle.userData.velocity.z = -circle.userData.velocity.z;
        circle.position.z = circle.position.z;
    }

    var zInput = document.getElementById('z-input');
    var zVelocityMultiplier = Number(zInput.value) * 0.01;
    zInput.addEventListener('input', function () {
        /* To return the object to a fixed position at the center. */
        if (circle.position.distanceTo(center) <= 1) {
            circle.userData.velocity.y -= 0.01;
            /* To increase the speed for x and y coordinates. */
            circle.userData.velocity.x += Number(xInput.value) * zVelocityMultiplier;
            circle.userData.velocity.y += Number(yInput.value) * zVelocityMultiplier;
            /* To combine the speed and direction of the object. */
            circle.position.x += circle.userData.velocity.x;
            circle.position.y += circle.userData.velocity.y;
            circle.position.z += circle.userData.velocity.z;
        }
    });

    circle.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.1);

    renderer.render(scene, camera);
}

function bounceCircle() {
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

    //var torusGeometry = new THREE.TorusGeometry(7, 14, 4);
    var torusGeometry = new THREE.TorusGeometry(
        7, // radius of the entire torus
        1.4, // radius of the tube
        112, // number of radial segments
        84 // number of tubular segments
    );
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    var pyramid = new THREE.Mesh(torusGeometry, lambertMaterial);
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

function bounceSphere() {
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

    var sphereGeometry = new THREE.SphereGeometry(7, 64, 64);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    var sphere = new THREE.Mesh(sphereGeometry, lambertMaterial);
    sphere.position.x = 0;
    scene.add(sphere);

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.set(-10, 15, 50);
    scene.add(light);

    var t = 0;
    var speed = 0.01;
    var direction = new THREE.Vector3(1, 0, 0);

    function render() {
        t += speed;
        requestAnimationFrame(render);

        if (sphere.position.y < -20) {
            direction.y = Math.abs(direction.y);
        }
        direction.y -= 0.1;

        sphere.rotation.y += 0.01;
        sphere.position.addScaledVector(direction, speed);
        sphere.scale.y = Math.abs(Math.sin(t));
        sphere.position.y = -7 * Math.sin(t * 2);
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