/**
 *
 * @property {HTMLElement} element
 * @property {string[]} images links to the images of the lightbox
 * @property {string} url images showed
 */

class Lightbox {
  static init() {
    const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
      .forEach(link => link.addEventListener("click", (e) => {
          e.preventDefault()
          new Lightbox(e.currentTarget.getAttribute("href"))
        }))
  }

  /**
   *
   * @param {string} url URL of the image
   */

  constructor (url) {
      const element = this.buildDOM(url)
      document.body.appendChild(element)
  }

  /**
   *
   * @param {string} url URL of the image
   * @return {HTMLElement}
   */

  buildDOM (url) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
                <img="Documents/Sample Photos/${filteredUser.name}/${photo.image}">
                <p class="galerie__title">${photo.title}</p>
        </div>`
    return dom
  }
}

Lightbox.init();
