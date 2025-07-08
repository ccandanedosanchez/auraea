document.addEventListener('DOMContentLoaded', function() {
    // Button Back to Category
    document.getElementById('back-categories').addEventListener('click', function() {
        window.location.href = 'category.html';
    });

    fetch('json/category.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(' Error can not fectch from category.json');
            }
            return response.json();
        })
        .then(noteCategories => {
            const selectedCategory = localStorage.getItem('selectedCategory');
            const notesContainer = document.querySelector('.notes-container');
            const alphabetLetters = document.querySelector('.alphabet-letters');

            // Clear containers
            notesContainer.innerHTML = '';
            
            // Get ALL notes from all categories 
            const allNotes = [];
            for (const category in noteCategories) {
                allNotes.push(...noteCategories[category]);
            }
            
            // Create title
            const title = document.createElement('h2');
            title.textContent = selectedCategory ? `${selectedCategory} Notes` : "All Notes";
            title.id = 'notes-title'; 
            title.className = 'notes-title'; 
            notesContainer.appendChild(title);
            
            // Create alphabet filter (now works with ALL notes)
            createAlphabetFilter(alphabetLetters, allNotes, notesContainer, noteCategories, selectedCategory);
            
            // Display notes - if a category is selected, show only those initially
            const initialNotes = selectedCategory ? noteCategories[selectedCategory] : allNotes;
            displayFilteredNotes(initialNotes, notesContainer);
        })
        .catch(error => {
            console.error('Error loading notes:', error);
        });
});

function createAlphabetFilter(container, allNotes, notesContainer, noteCategories, selectedCategory) {
    // Get all unique starting letters from ALL notes
    const letters = new Set();
    allNotes.forEach(note => {
        if (note.length > 0) {
            letters.add(note[0].toUpperCase());
        }
    });
    
    // Convert to array and sort
    const sortedLetters = Array.from(letters).sort();
    
    // Add "All" option - now shows ALL notes from every category
    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';
    allBtn.classList.add('letter-btn', 'active');
    allBtn.addEventListener('click', () => {
        document.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
        allBtn.classList.add('active');
        // Update the title when "All" is clicked
        const title = document.getElementById('notes-title');
        if (title) title.textContent = "All Notes";
        displayFilteredNotes(allNotes, notesContainer);
    });
    container.appendChild(allBtn);
    
    // Add letter buttons - these will filter ALL notes
    sortedLetters.forEach(letter => {
        const letterBtn = document.createElement('button');
        letterBtn.textContent = letter;
        letterBtn.classList.add('letter-btn');
        letterBtn.addEventListener('click', () => {
            document.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
            letterBtn.classList.add('active');
            const filteredNotes = allNotes.filter(note => 
                note.toUpperCase().startsWith(letter)
            );
            // Update the title when a letter is clicked
            const title = document.getElementById('notes-title');
            if (title) title.textContent = `Notes starting with ${letter}`;
            displayFilteredNotes(filteredNotes, notesContainer);
        });
        container.appendChild(letterBtn);
    });

    // Add a "Current Category" button if a category is selected
    if (selectedCategory) {
        const categoryBtn = document.createElement('button');
        categoryBtn.textContent = 'Current Category';
        categoryBtn.classList.add('letter-btn');
        categoryBtn.addEventListener('click', () => {
            document.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
            categoryBtn.classList.add('active');
            // Update the title when "Current Category" is clicked
            const title = document.getElementById('notes-title');
            if (title) title.textContent = `${selectedCategory} Notes`;
            displayFilteredNotes(noteCategories[selectedCategory], notesContainer);
        });
        container.appendChild(categoryBtn);
    }
}

function displayFilteredNotes(notes, container) {
    // Clear previous notes
    const existingList = container.querySelector('.notes-list');
    if (existingList) {
        existingList.remove();
    }
    
    // Create new list
    const ul = document.createElement('ul');
    ul.classList.add('notes-list');

    // Sort notes alphabetically
    const sortedNotes = [...notes].sort((a, b) => a.localeCompare(b));
    
    // Add clickable notes
    sortedNotes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        
        // Make notes clickable 
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            window.location.href = `perfumes.html?note=${encodeURIComponent(note)}`;
        });
        
        ul.appendChild(li);
    });

  
    if (container.firstChild) {
        container.insertBefore(ul, container.firstChild.nextSibling);
    } else {
        container.appendChild(ul);
    }
}
