function limpar() {
    var limparDiv = document.querySelector('#two');
    if (limparDiv != null) {
        limparDiv.innerHTML = '';
    }
}

function toggleMenu() {
    var menu = document.getElementById("side-menu");
    var body = document.body;
    if (menu.style.display === "none") {
        menu.style.display = "block";
        body.classList.add("side-menu-open");
    } else {
        menu.style.display = "none";
        body.classList.remove("side-menu-open");
    }
}

function onSelectChange() {
    var selectElement = document.getElementById("element");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;

    if (selectedValue === 'circle') {
        bounceCircle();
        selectElement.selectedIndex = -1; // Clear the selection by setting it to -1   
    } else if (selectedValue === 'sphere') {
        bounceSphere();
        selectElement.selectedIndex = -1; // Clear the selection by setting it to -1      
    } else if (selectedValue === 'square') {
        bounceSquare();
        selectElement.selectedIndex = -1; // Clear the selection by setting it to -1       
    } else if (selectedValue === 'triangle') {
        bounceTriangle();
        selectElement.selectedIndex = -1; // Clear the selection by setting it to -1       
    }
}

function hideDivs() {
    var divs = document.querySelectorAll('#one, #two, #three, #four, #five');
    divs.forEach(function (div) {
        div.style.display = 'none';
    });
}

function showSteps() {
    hideDivs();
    var div = document.querySelector('#three');
    div.style.display = 'block';
}

function showBio() {
    hideDivs();
    var div = document.querySelector('#four');
    div.style.display = 'block';
}

function displayDivTwo() {
    hideDivs();
    var div = document.querySelector('#two');
    div.style.display = 'block';
}

function showLeads() {
    hideDivs();
    var div = document.querySelector('#five');
    div.style.display = 'block';
}

function searchPage() {
    limpar();
    var searchTerm = document.getElementById("searchInput").value;
    var pageText = document.body.innerText;
    var searchRegex = new RegExp(searchTerm, "gi");
    var matches = pageText.match(searchRegex);
    var divs = document.querySelectorAll('#three, #four, #five');
    divs.forEach(function (div) {
        var innerHTML = div.innerHTML;
        var newHTML = innerHTML.replace(searchRegex, "<span class='highlighted'>" + searchTerm + "</span>");
        if (newHTML !== innerHTML) {
            div.style.display = 'block';
            div.innerHTML = newHTML;
        } else {
            div.style.display = 'none';
        }
    });
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        searchPage();
    }
}

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    var needResize = canvas.width !== displayWidth ||
        canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}