/**
 * 
 * @property {HTMLElement} element
 * 
 */


class lightbox {

    static init () {
        const links = document.querySelectorAll('a[href$=".jpg"],a[href$=".mp4"],a[href$=".png"]')
        .forEach(link => link.addEventListener("click", e => {
                e.preventDefault()
                new lightbox(e.currentTarget.getAttribute("href"))
        }))
    }

    /**
     * 
     * @param {string} url  URL of image
     * 
     */

    
    constructor(url) {
            this.element = this.buildDOM(url)
            this.loadImage(url)
            document.body.appendChild(this.element)
    }

     /**
     * 
     * @param {string} url  URL of image
     * 
     */

     loadImage (url) {
         const image = new Image()
         const container = this.element.querySelector(".lightbox__container")
         const loader = document.createElement("div")
         loader.classList.add("lightbox__loader")
         container.appendChild(loader)
         image.onload = function () {
           container.removeChild(loader)
           container.appendChild(image)
         }
         image.src = url
     }


    /**
    * Close lightbbox
    * @param {MouseEvent} e
    * 
    */

    close (e) {
      e.preventDefault()
      this.element.classList.add('fadeOut')
      window.setTimeout(() => {
        this.element.parentElement.removeChild(this.element)
        }, 500)
    }



     /**
     * 
     * @param {string} url  url of image
     * @return {HTMLElement}
     */
     
     buildDOM (url) {
        const dom = document.createElement("div")
        dom.classList.add("lightbox")
        dom.innerHTML = `
            <button class="lightbox__close">Close</button>
            <button class="lightbox__next">Next</button>
            <button class="lightbox__prev">Prev</button>
            <div class="lightbox__container"></div>`
        dom.querySelector(".lightbox__close").addEventListener("click",
        this.close.bind(this))
        return dom
     };
   
}
// document.querySelector(".lightbox__close").addEventListener("click",
// function() {
//     document.querySelector(".lightbox").style.display = "none";
// });



// document.querySelector(".lightbox__close").addEventListener("click",
// function() {
//     document.querySelector(".lightbox").style.display = "none";
// });





/* <div class="lightbox" >
        <button class="lightbox__close">Close</button>
        <button class="lightbox__next">Next</button>
        <button class="lightbox__prev">Prev</button>
        <div class="lightbox__container">
            <img class="foto" src="Documents/Sample Photos/Ellie-Rose Wilkens/Architecture_Water_on_Modern.jpg" alt="">
        </div>
    </div> */

lightbox.init()