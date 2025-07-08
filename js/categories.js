const container = document.querySelector('.categories-container');
const template = document.getElementById('category-template');

fetch('json/category.json')  
  .then(response => {
    if (!response.ok) throw new Error('Error, cannot fetch the categories');
    return response.json(); 
  })
  .then(noteCategories => {
    container.innerHTML = '';
    
    for (const category in noteCategories) {

      const card = template.cloneNode(true);
      card.style.display = 'block'; 
      
  
      const img = card.querySelector('.category-image');
      const title = card.querySelector('.category-name');
      

      img.src = `photos/${category.toLowerCase()}.jpg`;
      img.alt = category;
      title.textContent = category;
      

      card.addEventListener('click', () => {
        localStorage.setItem('selectedCategory', category);
        window.location.href = 'notes.html';
      });
      
   
      container.appendChild(card);
    }
  })
  .catch(error => {
    console.error(error);
    container.innerHTML = '<p class="error">Failed to load categories</p>';
  });