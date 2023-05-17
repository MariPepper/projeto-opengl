var cube, scene, camera, renderer;

var groupimg = document.querySelector('img[src="./img/Vector-1.png"]');
groupimg.addEventListener('click', callShapes);

var mainimg = document.querySelector('img[src="./img/Vector-4.png"]');
mainimg.addEventListener('click', callTemplate);

function callShapes() {
    groupShapes();
}

function callTemplate() {
    templateSquare();
}

function templateSquare() {
    limpar();

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.z = 50;
    scene.add(camera);

    var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    var basicMaterial = new THREE.MeshBasicMaterial({
        color: 0x0095DD,
        wireframe: true
    });
    var cube = new THREE.Mesh(boxGeometry, basicMaterial);
    cube.position.x = 15;
    cube.rotation.set(0.4, 0.2, 0);
    scene.add(cube);

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.set(-10, 15, 50);
    scene.add(light);

    function render() {
        requestAnimationFrame(render);
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
}

function groupShapes() {
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

    var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    var basicMaterial = new THREE.MeshBasicMaterial({
        color: 0x0095DD,
    });
    var cube = new THREE.Mesh(boxGeometry, basicMaterial);
    cube.position.x = -25;
    cube.rotation.set(0.4, 0.2, 0);
    scene.add(cube);

    var torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
    var phongMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF9500
    });
    var torus = new THREE.Mesh(torusGeometry, phongMaterial);
    scene.add(torus);

    var strangeGeometry = new THREE.DodecahedronGeometry(7);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    var dodecahedron = new THREE.Mesh(strangeGeometry, lambertMaterial);
    dodecahedron.position.x = 25;
    scene.add(dodecahedron);

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.set(-10, 15, 50);
    scene.add(light);

    var t = 0;
    var speed = 0.01;
    var direction = new THREE.Vector3(1, 0, 0);

    function render() {
        t += speed;
        requestAnimationFrame(render);

        if (cube.position.y < -20) {
            direction.y = Math.abs(direction.y);
        }
        direction.y -= 0.1;

        cube.rotation.y += 0.01;
        cube.position.addScaledVector(direction, speed);
        torus.scale.y = Math.abs(Math.sin(t));
        dodecahedron.position.y = -7 * Math.sin(t * 2);
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