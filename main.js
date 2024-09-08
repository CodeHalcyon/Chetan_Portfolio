document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});