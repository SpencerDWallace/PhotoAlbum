var windowW = $(window).width(); var windowH = $(window).height(); var cnv; var browserZoomLevel;
var sidebarActive = false; var sidebar; var sidebarW = windowW / 40; var sidebarH = windowH / 25;
var menuAnimation = false; var menuW; var menuH;  var header; var sideMenuExitBox; var sidebarBox;
var s20; var s21; var wed; var numAlb = 3; var album = new Array(numAlb); var nullAlbum;
let albumW; let albumH; let albumSpace; let photo; var previewsCreated = false;
/*const targetElement = document.querySelector('#screen');
bodyScrollLock.disableBodyScroll(targetElement);*/

function setup()
{
    browserZoomLevel = (Math.round(window.devicePixelRatio * 100))/100;
    cnv = createCanvas(windowW, windowH);
    cnv.position(0,0);
    s20 = "Summer '20"; s21 = "Summer '21"; wed = "Wedding";
    //s20 = createElement('h1', "Summer '20"); s21 = createElement('h1', "Summer '21"); wed = createElement('h1', "Wedding");
    menuW = windowW/4; menuH = windowH - 1; eleFont = windowH/40;
    //s20.style('font-size', eleFont + 'px'); s21.style('font-size', eleFont + 'px'); wed.style('font-size', eleFont + 'px');
/*    for(let i = 0; i < numAlb; i++){ */
    let albumBoxes = new Array(numAlb);
    let albumW = menuW/4; let albumH = albumW*2;
    let albumSpace = albumW;

    for(let i = 0; i < numAlb; i++)
    {
        albumBoxes[i] = new Box( (3*menuW)/8, i*albumH + albumW, (3*menuW)/8 + albumW, i*albumH + albumW + albumW + albumSpace/2 );
    }
    //photo = loadImage('./wedding_jacket_tryon.jpeg');
    nullAlbum = new Album(null, null, null, null, null);
    album[0] = new Album(s20, albumBoxes[0], 0, 0, null);
    album[1] = new Album(s21, albumBoxes[1], 0, 0, null);
    album[2] = new Album(wed, albumBoxes[2], 0, 0, null);
    strokeCap(SQUARE);
}

let Box = class {
    constructor(x, y, x2, y2) {
        this.x = x; this.y = y; this.x2 = x2; this.y2 = y2;
    }
};

let Album = class{
    constructor(name, box, size, photos, title) {
        this.name = name; this.box = box; this.size = size; this.photos = photos; this.title = title;
    }
}

function draw()
{
    clear();
    background(252,255,252);
    if(windowW > windowH)
        drawSidebarDesktop();

}

function mouseClicked()
{
    if(sidebarBox != null && checkRectangle(sidebarBox) && !sidebarActive)
        sidebarActive = true;
    else if(sideMenuExitBox != null && checkRectangle(sideMenuExitBox)) {
        menuAnimation = false;
        sidebarActive = false;
        previewsCreated = false;
        removePreviews();
    }

}

function checkRectangle(box)
{
if(mouseX >= box.x && mouseX <= box.x2 && mouseY >= box.y && mouseY <= box.y2)
    return true;

return false;
}

function sideMenu()
{
    fill('#77AAFF');
/*    if(!menuAnimation)
        sideMenuAnimation();
    else {*/
        stroke(150);
        rect(0, 0, menuW, menuH);
        noStroke();
        rect(menuW - sidebarW, 0, sidebarW, sidebarH);
        fill(0);
        stroke(1);
        strokeWeight(3);
        sideMenuExitBox = new Box(menuW - sidebarW, 0, menuW, sidebarH);
        noSmooth();
        line(menuW - sidebarW * 0.75, sidebarH * 0.25, menuW - sidebarW * 0.25, sidebarH * 0.75);
        line(menuW - sidebarW * 0.25, sidebarH * 0.25, menuW - sidebarW * 0.75, sidebarH * 0.75);
        strokeWeight(1);
        drawAlbums();

}

function removePreviews()
{
    for (let i = 0; i < numAlb; i++)
    {
        album[i].photos.remove();
        album[i].title.remove();
    }
}

function drawAlbums() {

    for (let i = 0; i < numAlb; i++) {
        x = album[i].box.x;
        x2 = album[i].box.x2 - album[i].box.x;
        y = album[i].box.y;
        y2 = album[i].box.y2 - album[i].box.y - x2 / 2;
        stroke(150);
        fill(20);
        rect(x - 5, y - 5, x2 + 10, x2 + 10);
        fill('rgba(50%,30%,10%,0.3)');
        rect(x - 15, y - 15, x2 + 30, x2 + 30);
        if (!previewsCreated) {
            album[i].photos = createImg('https://spencerdwallace.github.io/Home/wedding_jacket_tryon.jpeg', 'wedding jacket tryon', 'anonymous');
            album[i].photos.size(x2, x2)
            album[i].photos.position(x, y)


            album[i].title = createElement('h1', '' + album[i].name);
            album[i].title.style('font-size', eleFont + 'px');
            //album[i].title.style('width', x2 + 'px');
            //album[i].title.parent(album[i].photos);
            //album[i].title.center();
            album[i].title.position(x, album[i].box.y2 - x2 / 2);
            //album[i].title.center();
            //albumBoxes[i] = new Box( (3*menuW)/8, i*albumH + albumSpace, albumW, albumW + albumSpace/2  );
        }

    }
    previewsCreated = true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sideMenuAnimation()
{
    let wid = 0;  let change = true;
    let num =  menuW / 20; let i = 0;
    while(change)
    {
        change = false;
        rect(0, 0, wid, menuH);
        if(wid < menuW - 1)
        {
            wid++;
            change = true;
        }
        else
            wid = menuW;

        i++;
        if(i >= num)
        {
            await sleep(1);
            i = 0;
        }
    }
    menuAnimation = true;
}

async function drawSidebarDesktop()
{
    if(!sidebarActive)
    {

        noStroke();
        fill('#77AAFF');
        stroke(175);
        sidebar = rect(0, 0, sidebarW, sidebarH);
        sidebarBox = new Box(0,0, sidebarW, sidebarH);
        fill(0);
        stroke(1);
        rect(sidebarW / 4, (sidebarH / 3) - 1, sidebarW / 2, 2);
        rect(sidebarW / 4, (sidebarH / 2) - 1, sidebarW / 2, 2);
        rect(sidebarW / 4, (sidebarH * 2 / 3) - 1, sidebarW / 2, 2);
    }
    else
        await sideMenu();

}
