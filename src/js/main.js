// ================== Navigation ==================
// ============= NAVIGATION BUTTON ===============
const navButton = document.querySelector(".nav-btn");
const navList = document.querySelector(".nav-list");
const navOverlay = document.querySelector(".nav-overlay");
const navItem = document.querySelectorAll(".nav-item");


let showMenu = false;
navButton.addEventListener("click", openMenu);
// navButton.addEventListener("click", console.log("you clicked"));
navOverlay.addEventListener("click", openMenu);
// navItem.forEach(item => {
//     item.addEventListener("click", openMenu)
// })

function openMenu () {
    if(!showMenu) {
        navButton.classList.add("close");
        navList.classList.add("show");
        navOverlay.classList.add("show");
        navItem.forEach(item => {
            item.classList.add("show");
        });
        // document.body.classList.add("no-scroll");
        showMenu = true;
    }else {
        navButton.classList.remove("close");
        navList.classList.remove("show");
        navButton.classList.remove("show");
        navOverlay.classList.remove("show");
        navItem.forEach(item => {
            item.classList.remove("show");
        });
        // document.body.classList.remove("no-scroll");
        showMenu = false;
    }
}






import { Dialog, Tablist } from "jolty";
Dialog.initAll();
Tablist.initAll();