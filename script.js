const carouselInner = document.querySelector('.carousel-inner'); // Corrigido seletor
const leftButton = document.querySelector('.arrow-left');
const rightButton = document.querySelector('.arrow-right');

let currentIndex = 0; // Índice atual do slide
const slides = document.querySelectorAll('.carousel-inner > .flex-shrink-0'); // Seleciona os slides corretamente
let slidesVisible = 4; // Quantidade de slides visíveis por vez (ajustável)

// Função para atualizar os slides visíveis com base no tamanho da janela
function updateSlidesVisible() {
  if (window.innerWidth < 640) slidesVisible = 1;
  else if (window.innerWidth < 1024) slidesVisible = 2;
  else slidesVisible = 4;
}

// Função para atualizar o carrossel
function updateCarousel() {
  const slideWidth = slides[0].offsetWidth; // Largura de um único slide
  const offset = currentIndex * slideWidth; // Cálculo do deslocamento
  carouselInner.style.transform = `translateX(-${offset}px)`; // Move os slides
}

// Botão da seta esquerda
leftButton.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = Math.max(0, slides.length - slidesVisible);
  } else {
    currentIndex--;
  }
  updateCarousel();
});

// Botão da seta direita
rightButton.addEventListener('click', () => {
  if (currentIndex >= slides.length - slidesVisible) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateCarousel();
});

// Atualiza o carrossel ao redimensionar a janela com debounce
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateSlidesVisible();
    updateCarousel();
  }, 200);
});

// Inicializa o carrossel
updateSlidesVisible();
updateCarousel();