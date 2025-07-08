document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    

    // When the user clicks the menuBtn run this funtion
    menuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active'); // menu burger works when we toggle (menu slide in / slide out. Check css .active)
        
        // if the menu is open, change the icon to x
        const icon = this.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('ri-menu-line'); // Remove the burger icon
            icon.classList.add('ri-close-line'); // Add the X (close)
        } else { // if not show me the burger icon 
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line'); // add the burger icon
        }
    });
    
    // For each link <a> that is in .navbar, when clicked run this function
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {

            // if the menu is open it will close
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('ri-close-line'); // remove x icon
                icon.classList.add('ri-menu-line'); // shows burger icon
            }
            
            // when active, link is highlighted
            document.querySelectorAll('.navbar a').forEach(item => {
                item.classList.remove('active');
            });
            
            this.classList.add('active');
        });
    });
    
    // Styles for shadow 
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });
});


