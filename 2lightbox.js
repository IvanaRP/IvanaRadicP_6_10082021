/**
 * @property {HTMLElement} element
 * @property {string[]} images links to the images of the lightbox
 * @property {string} url images showed
 */

class Lightbox {

  static init() {
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
    const gallery = links.map(link => link.getAttribute('href'))
    // debugger
    links.forEach(link => link.addEventListener("click", e => {
          e.preventDefault()
          new Lightbox(e.currentTarget.getAttribute("href"), gallery)
        }))
  }

  /**
   *@param {string} url URL of the image
   * @param {string[]} images liste des URL des images du diaporama
   */

  constructor (url, images) {
      const element = this.buildDOM(url);
      this.images = images;
      this.loadMedia(url);
      this.onKeyUp = this.onKeyUp.bind(this);
      document.body.appendChild(this.element);
      document.addEventListener('keyup', this.onKeyUp);
  }

  loadMedia(url) {
    const extension = url.split('.').pop();
    this.url = null;

    if(extension == 'jpg') {
      // const image = new Image();
      const image = document.createElement('img');
      const containerImage = this.element.querySelector('.lightbox_container');
      const loader = document.createElement('div');
      loader.classList.add('lightbox_loader');
      containerImage.innerHTML = '';

      containerImage.appendChild(loader);
      
      image.onload = () => {
        this.url = url;
        containerImage.removeChild(loader);
        containerImage.appendChild(image);
      }
      image.src = url
    }

    else if(extension == 'mp4') {
      const video = document.createElement('video');

      video.controls = true;
      video.innerHTML = `<source src="${url}" type="video/mp4">`;

      const containerVideo = this.element.querySelector('.lightbox_container');
      const loader = document.createElement('div');
      loader.classList.add('lightbox_loader');
      containerVideo.innerHTML = '';

      containerVideo.appendChild(loader);
      
      video.onloadstart  = () => {
        this.url = url;
        containerVideo.removeChild(loader);
        containerVideo.appendChild(video);
        
      }
      video.src = url
    }
    
  }

  /**
   * Ferme la lightbox via touche ESC
   * Image precedente de la lightbox via touche gauche
   * Image suivante de la lightbox via touche droite
   * @param {KeyboardEvent} e 
   */
   onKeyUp(e) {
    if      (e.key === 'Escape')     { this.close(e) }
    else if (e.key === 'ArrowLeft')  { this.prev(e) }
    else if (e.key === 'ArrowRight') { this.next(e) }
  }

  /**
   * Ferme la livebox
   * @param {MouseEvent|KeyboardEvent} e 
   */
   close(e) {
    e.preventDefault()
    this.element.classList.add('fadeOut')
    window.setTimeout(() => {
        this.element.parentElement.removeChild(this.element)
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp)
    mainContainer.setAttribute('aria-hidden', 'false');
    photoContainer.setAttribute('aria-hidden', 'true');
  }

  /**
   * Passe à l'image suivante
   * @param {MouseEvent|KeyboardEvent} e 
   */
   next(e) {
    e.preventDefault()
    // debugger
    let i = this.images.findIndex(image => image === this.url)
    if (i === this.images.length - 1) {
        i = -1;
    }
    this.loadMedia(this.images[i + 1])
  }


  /**
   * Passe à l'image suivante
   * @param {MouseEvent|KeyboardEvent} e 
   */
   prev(e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image === this.url)
    if (i === 0) {
        i = this.images.length;
    }
    this.loadMedia(this.images[i - 1])
  }

  /**
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDOM(url) {
    mainContainer.setAttribute('aria-hidden', 'true');
    photoContainer.setAttribute('aria-hidden', 'false');

    const dom = document.createElement('div')
    dom.classList.add('lightbox_bground')
    dom.innerHTML = `
        <button class="lightbox_close">Fermer</button>
        <button class="lightbox_next">Suivant</button>
        <button class="lightbox_prev">Précédent</button>
        <div class="lightbox_container"></div>
    `
    dom.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this))
    dom.querySelector('.lightbox_prev').addEventListener('click', this.prev.bind(this))
    return dom
  }
}

Lightbox.init();



// Media Factory?!

// class VideoMedia {
//   constructor(optionOfMedia) {
//     this.optionOfMedia  = optionOfMedia;

//     function create(parameter, data) {
//       return new VideoMedia();
//     }
//   }
  
// }

// class ImageMedia {
//   constructor() {
//     this.width  = width;
//     this.height = height;

//     function create(data) {
//       return new ImageMedia();
//     }
//   }
// }