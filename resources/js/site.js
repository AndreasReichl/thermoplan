// This is all you.
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
window.Alpine = Alpine;
Alpine.plugin(persist);
Alpine.start();

// on scroll

let scrollPosition = window.scrollY;
let logoContainer = document.getElementsByClassName('body')[0];

window.addEventListener('scroll', function() {

	scrollPosition = window.scrollY;

	if (scrollPosition >= 100) {
		logoContainer.classList.add('scrolled');
	} else {
		logoContainer.classList.remove('scrolled');
	}

});

// backToTopButton
let backToTopButton = document.getElementById('backToTopButton');

window.addEventListener('scroll', function() {
	if (window.scrollY > 300) {
		backToTopButton.classList.add('active');
	} else {
		backToTopButton.classList.remove('active');
	}
});

backToTopButton.addEventListener('click', function(e) {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: 'smooth' });
});




// burgerButton
document.addEventListener('DOMContentLoaded', function () {
	let mainwrapper  = document.querySelector('body');
	let burgerButton = document.querySelector('.burgerBtn'),
		mainmenuButtons = document.querySelectorAll('.mainmenu'),
		isClosed = true;

	// Event listener for burger button
	burgerButton.addEventListener('click', function () {
		toggleBurgerMenu();
	});

	// Event listeners for all mainmenu buttons
	mainmenuButtons.forEach(button => {
		button.addEventListener('click', function () {
			closeBurgerMenu();
		});
	});

	// Function to toggle burger menu
	function toggleBurgerMenu() {
		if (isClosed) {
			mainwrapper.classList.add('mobileMenuOpen');
			burgerButton.classList.remove('open-burger');
			burgerButton.classList.add('closed-burger');
			isClosed = false;
		} else {
			mainwrapper.classList.remove('mobileMenuOpen');
			burgerButton.classList.remove('closed-burger');
			burgerButton.classList.add('open-burger');
			isClosed = true;
		}
	}

	// Function to close burger menu (used by mainmenu buttons)
	function closeBurgerMenu() {
		if (!isClosed) {
			mainwrapper.classList.remove('mobileMenuOpen');
			burgerButton.classList.remove('closed-burger');
			burgerButton.classList.add('open-burger');
			isClosed = true;
		}
	}


	function scrollToWithOffset(id) {
        const element = document.querySelector(id);
        if (!element) return; // Falls kein Element mit der ID existiert, nichts tun

        // Setze den Offset je nach Bildschirmbreite
        const offset = window.innerWidth <= 768 ? 60 : 90;

        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // EventListener für Links mit der Klasse 'mainmenu'
    document.querySelectorAll('.mainmenu').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetHref = anchor.getAttribute('href'); // Holen des Href-Werts (z.B. /#sprechzeiten oder #sprechzeiten)

            // Prüfen, ob es ein Anker-Link ist (beginnt mit /# oder nur #)
            if (targetHref.startsWith('/#') || targetHref.startsWith('#')) {
                e.preventDefault(); // Verhindert das standardmäßige Scroll-Verhalten

                // Extrahiere die ID (z.B. aus /#sprechzeiten wird #sprechzeiten)
                const targetId = targetHref.includes('#') ? targetHref.split('#')[1] : '';

                if (targetId) {
                    // Wenn wir uns nicht auf der Startseite befinden, leite zur Startseite weiter und scrolle nach dem Laden
                    if (window.location.pathname !== '/') {
                        window.location.href = `/#${targetId}`;
                    } else {
                        scrollToWithOffset(`#${targetId}`);
                    }
                }
            }
        });
    });
});





/* DROPDOWN */

function closeAllDropdowns(obj) {
	const dropdowns = document.querySelectorAll('.dropdown');

	for (const dropdown of dropdowns) {
		if (dropdown == obj) { continue; }
		dropdown.classList.remove('open');
	};
}

function toggleDropdown(id) {
	const dropdown = document.getElementById(id);
	closeAllDropdowns(dropdown);
	dropdown.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
	closeAllDropdowns();
});

document.addEventListener('click', function(event) {
	const isDropdownButton = event.target.closest('.dropdown .dropdownToggle');
	const isDropdownContent = event.target.closest('.dropdown-content');

	if (!isDropdownButton && !isDropdownContent) {
		closeAllDropdowns();
	}
});

document.querySelectorAll('.dropdown [data-dropdown-id]').forEach(function(dropdownToggle) {
    dropdownToggle.addEventListener('click', function(event) {
        const dropdownId = this.dataset.dropdownId;
        toggleDropdown(dropdownId);
        event.stopPropagation();
    });
});


// Swiper

const swiper5 = new Swiper(".logoslideshow", {
	slidesPerView: 3,
    spaceBetween: 40,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	grabCursor: true,
	duration:5000,
    breakpoints: {
        768: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 7,
        },
    },
});
