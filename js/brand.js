const container = document.querySelector('.brands-container');

fetch('json/brands.json')  
  .then(response => response.json())
  .then(perfumesBrands => {
    container.innerHTML = '';

    for (const brandName in perfumesBrands) {
      const brandCard = document.createElement('div');
      brandCard.className = 'brand-card';

     
      const brandTitle = document.createElement('h3');
      brandTitle.className = 'brand-name';
      brandTitle.innerHTML = `${brandName}<span class="underline"></span>`; //optional decoration underline
      
      // Perfume list (hidden until we put the mouse on it)
      const perfumeList = document.createElement('ul');
      perfumeList.className = 'perfume-list';
      
      perfumesBrands[brandName].forEach(perfume => {
        const li = document.createElement('li');
        li.textContent = perfume;
        
        //clickable
        li.style.cursor = 'pointer'; 
        li.addEventListener('click', () => {
          window.location.href = `perfume.html?name=${perfume}`;
        });
        
        perfumeList.appendChild(li);
      });

      brandCard.appendChild(brandTitle);
      brandCard.appendChild(perfumeList);
      container.appendChild(brandCard);
    }
  })
  .catch(error => {
    console.error('Error loading brands:', error);
  });