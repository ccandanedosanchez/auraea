const container = document.querySelector('.perfumes-container');
const template = document.getElementById('perfume-template');

const params = new URLSearchParams(window.location.search);
const selectedNote = params.get('note'); 

fetch('json/perfumes.json')
  .then(response => response.json())
  .then(perfumes => {
    container.innerHTML = '';
    container.appendChild(template); 

    
    const filteredPerfumes = selectedNote
      ? perfumes.filter(perfume => 
          perfume.notes.top.includes(selectedNote) ||
          perfume.notes.middle.includes(selectedNote) ||
          perfume.notes.base.includes(selectedNote)
        )
      : perfumes;

    
    if (selectedNote) {
      document.querySelector('.title-style').textContent = `Perfumes with ${selectedNote}`;
    }

    filteredPerfumes.forEach(perfume => {
      const perfumeCard = template.cloneNode(true);
      perfumeCard.style.display = 'flex'; 
      
      
      perfumeCard.querySelector('.perfume-image').src = perfume.photo;
      perfumeCard.querySelector('.perfume-image').alt = perfume.perfume_name;
      perfumeCard.querySelector('.perfume-name').textContent = perfume.perfume_name;
      perfumeCard.querySelector('.perfume-brand').textContent = perfume.brand;
      
    
      perfumeCard.addEventListener('click', () => {
        window.location.href = `perfume.html?name=${encodeURIComponent(perfume.perfume_name)}`;
      });
      
      container.appendChild(perfumeCard);
    });
  })
  .catch(error => {
    console.error('Error loading perfumes:', error);
    container.innerHTML = '<p class="error">Failed to load perfumes. Please try again later.</p>';
  });