var windowW = $(window).width(); var windowH = $(window).height(); var cnv; var browserZoomLevel;
var sidebarActive = false; var sidebar; var sidebarW = windowW / 40; var sidebarH = windowH / 25;
var menuAnimation = false; var menuW; var menuH;  var header; var sideMenuExitBox; var sidebarBox;
var s20; var s21; var wed; var numAlb = 3; var album = new Array(numAlb); var nullAlbum; var mobile;
let albumW; let albumH; let albumSpace; let photo; var previewsCreated = false; var hovering = false;
let currentPhoto = 1; let currentAlbumMax = new Array(numAlb); let imageSuccessfullyLoaded = false; let curAlbum = 0;
var mainImage;
/*const targetElement = document.querySelector('#screen');
bodyScrollLock.disableBodyScroll(targetElement);*/

function setup()
{
    browserZoomLevel = (Math.round(window.devicePixelRatio * 100))/100;
    menuW = windowW/4; menuH = windowH - 1;

    cnv = createCanvas(windowW, windowH);
    cnv.position(0,0);

    if(windowW > windowH) { mobile = false; } //desktop or landscape
    else { let tempW = windowW; windowW = windowH; windowH = tempW; mobile = true;}

    albumW = menuW/4; albumH = albumW*2;
    albumSpace = albumW;
    eleFont = windowH/40;
    s20 = "Summer '20"; s21 = "Summer '21"; wed = "Wedding";
    //s20 = createElement('h1', "Summer '20"); s21 = createElement('h1', "Summer '21"); wed = createElement('h1', "Wedding");

    //s20.style('font-size', eleFont + 'px'); s21.style('font-size', eleFont + 'px'); wed.style('font-size', eleFont + 'px');
/*    for(let i = 0; i < numAlb; i++){ */
    currentAlbumMax[0] = 25;
    currentAlbumMax[1] = 11;
    currentAlbumMax[2] = 25;
    let albumBoxes = new Array(numAlb);


    for(let i = 0; i < numAlb; i++)
    {
        albumBoxes[i] = new Box( (3*menuW)/8, i*albumH + albumW, (3*menuW)/8 + albumW, i*albumH + albumW + albumW);
    }
    //photo = loadImage('./wedding_jacket_tryon.jpeg');
    nullAlbum = new Album(null, null, null, null, null);
    album[0] = new Album(s20, albumBoxes[0], 0, null, null);
    album[1] = new Album(s21, albumBoxes[1], 0, null, null);
    album[2] = new Album(wed, albumBoxes[2], 0, null, null);
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
    drawSidebarDesktop();
/*    if(previewsCreated)
    {
        for(let i = 0; i < numAlb; i++)
            album[i].photos.mouseMoved(alert('MOUSE IS OVER ALBUM: ' + i));
    }*/


}

function mouseClicked() {
    if (sidebarBox != null && checkRectangle(sidebarBox) && !sidebarActive)
        sidebarActive = true;
    else if (sideMenuExitBox != null) {
        if (checkRectangle(sideMenuExitBox)) {
            menuAnimation = false;
            sidebarActive = false;
            previewsCreated = false;
            removePreviews();
        } else {
            let displayAlbum;
            displayAlbum = checkAlbumClick(1);
            if (displayAlbum != null);
            {
             if(curAlbum != displayAlbum)
                 currentPhoto = 1;
             loadAlbum(displayAlbum);

            }
        }
    }
}

function loadAlbum(album)
{
    curAlbum = album
    if(mainImage != null)
        mainImage.remove();

    let albumName;
    let res;
    if(album == 0 || album == 2) {
        createImg('https://spencerdwallace.github.io/PhotoAlbum/summer20/' + currentPhoto + '.png', 'summer20', 'anonymous', imageLoaded);
    }
    else if(album == 1) {
        createImg('https://spencerdwallace.github.io/PhotoAlbum/summer21/' + currentPhoto + '.jpg', 'summer21', 'anonymous', imageLoaded);
    }
    /*
    res = mainImage.size().height/mainImage.size().width;
    mainImage.size(windowW/3, windowW/3*res);
    mainImage.position(windowW/3,windowH/2 - windowW/6*res);
    fill(100);
    rect(windowW/3, windowH/2 - windowW/6*res, windowW/3, windowW/3*res);
    alert('made it! Album is: ' + album + ' current phtoto is: ' + currentPhoto);
*/
}

function checkAlbumClick(print)
{
    for(let i = 0; i < numAlb; i++)
    {
        let x = album[i].box.x - albumW/10;
        let x2 = album[i].box.x2 + albumW/10;
        let y = album[i].box.y - albumW/10;
        let y2 = album[i].box.y2 + albumW/10;
        let tempBox = new Box(x,y,x2,y2)
        if (checkRectangle(tempBox)) {
            if(print) {
                if (currentPhoto < currentAlbumMax[curAlbum])
                {
                    currentPhoto++;
                    removePreviews();
                    //previewsCreated = false;
                }
            }
            return i;
        }
    }
    return null;
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
        album[i].photos = null;
        album[i].title.remove();
    }
}

function imageLoaded(photo) {
    mainImage = photo;
    res = mainImage.size().height/mainImage.size().width;
    mainImage.size(windowW/3, windowW/3*res);
    mainImage.position(windowW/3,windowH/2 - windowW/6*res);
}

async function drawAlbums() {
    let i;
    for (i = 0; i < numAlb; i++) {

        imageSuccessfullyLoaded = false;
        let albumHover = checkAlbumClick(0);
        if(albumHover != null && !hovering && album[albumHover].photos != null){
            hovering = true;
            album[albumHover].box.x -= albumW/10;
            album[albumHover].box.x2 += albumW/10;
            album[albumHover].box.y -= albumW/10;
            album[albumHover].box.y2 += albumW/10;

            album[albumHover].photos.size(album[albumHover].box.x2 - album[albumHover].box.x, album[albumHover].box.x2 - album[albumHover].box.x);
            album[albumHover].photos.position(album[albumHover].box.x, album[albumHover].box.y);
            album[albumHover].title.position(album[albumHover].box.x + albumW/10, album[albumHover].box.y2 );
        }
        else if(albumHover == null && hovering){
            hovering = false;
            //removePreviews();

            for(let a = 0; a < numAlb; a++) {
                if (album[a].box.x < (3 * menuW) / 8) {

                    album[a].box.x += albumW / 10;
                    album[a].box.x2 -= albumW / 10;
                    album[a].box.y += albumW / 10;
                    album[a].box.y2 -= albumW / 10;
                    if (album[a].photos != null) {
                        album[a].photos.size(album[a].box.x2 - album[a].box.x, album[a].box.x2 - album[a].box.x)
                        album[a].photos.position(album[a].box.x, album[a].box.y)
                        album[a].title.position(album[a].box.x, album[a].box.y2);
                    }
                }
            }
            //i = 0;
            //previewsCreated = false
            //alert('Hover stop!');
        }

        let x = album[i].box.x;
        let x2 = album[i].box.x2 - album[i].box.x;
        let y = album[i].box.y;
        let y2 = album[i].box.y2 - album[i].box.y - x2 / 2;

        let borderX = x - albumW/10; let borderY = y - albumW/10;
        let borderX2 = x2 + albumW/5;
        stroke(200,160,0);
        fill(20);
        rect(borderX - 5, borderY - 5, borderX2 + 10, borderX2 + 10);
        fill('rgba(70%,40%,0%,0.6)');
        rect(borderX - 5, borderY - 5, borderX2 + 10, borderX2 + 10);
        fill('rgba(100%,40%,0%,0.4)');
        rect(borderX, borderY, borderX2, borderX2);
        fill('rgba(50%,30%,0%,0.6)');
        rect(x - 5, y - 5, x2 + 10, x2 + 10);

        if (album[i].photos == null) {
       
            if(i == 0 || i == 2) {
                album[i].photos = createImg('https://spencerdwallace.github.io/PhotoAlbum/summer20/' + 1 + '.png', 'summer20', 'anonymous');
            }
            else if(i == 1){
                album[i].photos = createImg('https://spencerdwallace.github.io/PhotoAlbum/summer21/' + 1 + '.jpg', 'summer21', 'anonymous');
            }
            album[i].photos.size(album[i].box.x2 - album[i].box.x, album[i].box.x2 - album[i].box.x);
            album[i].photos.position(album[i].box.x, album[i].box.y);
            //alert('Made it to JPG iteration: ' + i);
            //imageSuccessfullyLoaded = false;
            //alert('title created for ' + i);
            album[i].title = createElement('h1', '' + album[i].name);
            album[i].title.style('font-size', eleFont + 'px');
            //album[i].title.style('width', x2 + 'px'); album[i].title.parent(album[i].photos); album[i].title.center();
            album[i].title.position(x, album[i].box.y2);
            //album[i].title.center(); albumBoxes[i] = new Box( (3*menuW)/8, i*albumH + albumSpace, albumW, albumW + albumSpace/2  );
        }
    }


    //previewsCreated = true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sideMenuAnimation()
{
    let wid = 0;  let change = true;
    let curAlbum =  menuW / 20; let i = 0;
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
        if(i >= curAlbum)
        {
            sleep(1);
            i = 0;
        }
    }
    menuAnimation = true;
}

function drawSidebarDesktop()
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
        sideMenu();

}