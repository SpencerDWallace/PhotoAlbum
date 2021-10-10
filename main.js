var windowW = $(window).width()*0.99; var windowH = $(window).height()*0.97; var cnv;
var sidebarActive = false; var sidebar; var sidebarW = windowW / 40; var sidebarH = windowH / 25;
var menuAnimation = false; var menuW; var menuH; var sideMenuExitBox; var header;


function setup()
{
    cnv = createCanvas(windowW, windowH);
    menuW = windowW/4; menuH = windowH - 1;

}

let Box = class {
    constructor(x, y, x2, y2) {
        this.x = x; this.y = y; this.x2 = x2; this.y2 = y2;
    }
};

function draw()
{
    clear();
    background('#EEAA88');
    if(windowW > windowH)
        drawSidebarDesktop();

}

function mouseClicked()
{
    if(mouseX >= 0 && mouseX <= sidebarW && mouseY >= 0 && mouseY <= sidebarH && !sidebarActive)
        sidebarActive = true;
    if(sideMenuExitBox != null && mouseX >= sideMenuExitBox.x && mouseX <= sideMenuExitBox.x2 && mouseY >= sideMenuExitBox.y && mouseY <= sideMenuExitBox.y2)
        sidebarActive = false;

}

function sideMenu()
{
    fill('#DDDDDD');
/*    if(!menuAnimation)
        sideMenuAnimation();
    else
    {*/
    rect(0, 0, menuW, menuH);
    noStroke();
    rect(menuW - sidebarW - 1, 1, sidebarW, sidebarH);
    fill(0);
    strokeWeight(3);
    stroke(1);
    sideMenuExitBox = new Box (menuW - sidebarW, 0, menuW, sidebarH);
    line(menuW - sidebarW*0.75, sidebarH*0.25, menuW - sidebarW*0.25, sidebarH*0.75);
    line(menuW - sidebarW*0.25, sidebarH*0.25, menuW - sidebarW*0.75, sidebarH*0.75);
    strokeWeight(1);




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
            //await sleep(1);
            i = 0;
        }
    }
    menuAnimation = true;
}

async function drawSidebarDesktop()
{
    if(!sidebarActive)
    {


        fill('#DDDDDD');
        stroke(1);
        sidebar = rect(0, 0, sidebarW, sidebarH);
        fill(0);
        rect(sidebarW / 4, (sidebarH / 3) - 1, sidebarW / 2, 2);
        rect(sidebarW / 4, (sidebarH / 2) - 1, sidebarW / 2, 2);
        rect(sidebarW / 4, (sidebarH * 2 / 3) - 1, sidebarW / 2, 2);
    }
    else
        await sideMenu();

}