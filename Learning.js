const scrollContainer = document.getElementById('cardContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

scrollLeftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -scrollContainer.clientWidth, // Scroll to the left by one card width
    behavior: 'smooth'
  });
});

scrollRightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: scrollContainer.clientWidth, // Scroll to the right by one card width
    behavior: 'smooth'
  });
});
