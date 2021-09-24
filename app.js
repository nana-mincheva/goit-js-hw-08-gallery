const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryList = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const modalRef = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay")
const closeBtn = document.querySelector(".lightbox__button");
const rightBtn = document.querySelector(".scroll-right");
const leftBtn = document.querySelector(".scroll-left");

galleryList.addEventListener('click', modalOpen);
galleryList.insertAdjacentHTML("beforeend", galleryCardMarkup(galleryItems));
   
function galleryCardMarkup(img) {
    return img.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
                    <a class="gallery__link"
                     href=${original}>
                         <img class="gallery__image"
                          src=${preview}
                          data-source=${original}
                          alt=${description} />
                    </a>
                    </li>`
    }).join("");
};

function modalOpen(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return
    };
    modal.classList.add("is-open");
    modalImg.src = event.target.dataset.source;
    modalImg.alt = event.target.alt;
    overlay.addEventListener("click", modalCloseByOverlayClick);
    document.addEventListener("keydown", modalCloseByEsc);
    closeBtn.addEventListener('click', modalClose);
    window.addEventListener("keydown", modalImgScrolling); 
};

function modalClose(event) {
    modal.classList.remove("is-open");
    overlay.removeEventListener("click", modalCloseByOverlayClick);
    document.removeEventListener("keydown", modalCloseByEsc);
    closeBtn.removeEventListener('click', modalClose);
    window.removeEventListener("keydown", modalImgScrolling);
};

function modalCloseByEsc(event) {
    if (event.code === "Escape") {
        modalClose(event)        
    }
};

function modalCloseByOverlayClick(event) {
    if (event.currentTarget === event.target) {
        modalClose(event)      
    }
};


function modalImgScrolling(event) {

    let imgIndex = galleryItems.findIndex(img => img.original === modalImg.src);

    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown' || leftBtn === event.target) {
        if (imgIndex === 0) {
            imgIndex += galleryItems.length;
        }
        imgIndex -= 1;
    };

    if (event.code === 'ArrowRight' || event.code === 'ArrowUp' || rightBtn === event.target || modalRef === event.target) {
        if (imgIndex === galleryItems.length - 1) {
            imgIndex -= galleryItems.length;
        }
        imgIndex += 1;
    };

    modalImg.src = galleryItems[imgIndex].original;
    modalImg.alt = galleryItems[imgIndex].description;

};