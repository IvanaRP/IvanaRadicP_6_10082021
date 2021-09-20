class Lightbox {

    static init(){
        const links = document.querySelectorAll(`a[href$=".jpg"]`)
        .forEach(link => link.addEventListener("click", e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute("href"))
        }))
        
    }

    /*
    @param {string} url URL de l'image
    */

    constructor (url){
        const element = this.buildDOM(url)
        document.body.appendChild(element)
    }

     /*
    @param {string} url URL de l'image
    * @return {HTMLElement} 
    */

    buildDOM (url) {
        const dom =createElement("div")
        dom.classList.add("lightbox")
        dom.innerHTML = `
        <div class="lightbox" >
        <button class="lightbox__close"></button>
        <button class="lightbox__next"></button>
        <button class="lightbox__prev"></button>
        <div class="lightbox__container">
            <img class="foto" src="${url}" alt="">
        </div>`
        return dom
    }

}


/*<div class="lightbox" >


</div>*/


Lightbox.init();