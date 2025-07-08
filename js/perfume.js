document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const perfumeName = params.get('name'); 

  fetch('json/perfumes.json')
    .then(res => res.json())
    .then(data => {
      const perfume = data.find(p => 
        p.perfume_name.trim().toLowerCase() === perfumeName.trim().toLowerCase()
      );

      if (!perfume) {
        document.querySelector('.not-found').style.display = 'block';
        document.querySelector('.perfume-detail-container').style.display = 'none';
        document.getElementById('not-found-message').textContent = `Perfume "${perfumeName}" not found.`;
        return;
      }

      document.getElementById('perfume-image').src = perfume.photo;
      document.getElementById('perfume-image').alt = perfume.perfume_name;
      document.getElementById('perfume-name').textContent = perfume.perfume_name;
      document.getElementById('perfume-brand').textContent = `Brand: ${perfume.brand}`;
      document.getElementById('perfume-longevity').textContent = `Longevity: ${perfume.longevity}`;
      document.getElementById('top-notes').textContent = perfume.notes.top.join(', ');
      document.getElementById('middle-notes').textContent = perfume.notes.middle.join(', ');
      document.getElementById('base-notes').textContent = perfume.notes.base.join(', ');

      document.querySelector('.perfume-detail-container').style.display = 'block';
      document.querySelector('.not-found').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      document.querySelector('.error-message').style.display = 'block';
      document.querySelector('.perfume-detail-container').style.display = 'none';
      document.querySelector('.not-found').style.display = 'none';
    });
});