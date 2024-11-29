// This is all you.
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
window.Alpine = Alpine;
Alpine.plugin(persist);
Alpine.start();

// on scroll

// Hilfsfunktion für Scroll-Verhalten
function handleScroll() {
    const scrollPosition = window.scrollY;
    const logoContainer = document.querySelector('.body');
    const backToTopButton = document.getElementById('backToTopButton');

    // Logo-Änderung bei Scrollen
    if (scrollPosition >= 100) {
        logoContainer.classList.add('scrolled');
    } else {
        logoContainer.classList.remove('scrolled');
    }

    // Back-to-Top Button anzeigen
    if (scrollPosition > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
}
window.addEventListener('scroll', handleScroll);

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
const swiper3 = new Swiper(".imageSlider", {
	initialSlide: 0,
	slidesPerView: 2,
	centeredSlides: false,
    spaceBetween: 20,
	loop:false,
	grabCursor: false,
	speed:2000,
	easing: 'ease-in-out',
	effect: "slide",
	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: ".buttonNext",
		prevEl: ".buttonPrev",
	},
    breakpoints: {
        768: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
    },
});

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

// Modalgallery

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeButton = document.getElementsByClassName('close')[0];
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModalImage();
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModalImage();
    }

    function openModal() {
        modal.style.display = 'block';
        updateModalImage();
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function updateModalImage() {
        const currentGalleryItem = galleryItems[currentIndex];
        const img = currentGalleryItem.querySelector('img');

        // Fügen Sie den Fade-Out-Effekt hinzu
        modalImg.style.opacity = 0;

        // Ändern Sie das Bild und setzen Sie die Bildunterschrift
        setTimeout(function() {
            modalImg.src = img.src;
            modalCaption.textContent = img.alt;

            // Fügen Sie den Fade-In-Effekt hinzu, nachdem das Bild aktualisiert wurde
            modalImg.style.opacity = 1;
        }, 300); // 300ms entspricht der Dauer des Übergangs in CSS
    }

    // Funktion zur Handhabung von Swipe- und Ziehgesten
    function handleStart(event) {
        startX = event.clientX || event.touches[0].clientX;
        isDragging = true;
    }

    function handleMove(event) {
        if (isDragging) {
            event.preventDefault(); // Verhindert das Scrollen der Seite während des Ziehens
            endX = event.clientX || event.touches[0].clientX;
        }
    }

    function handleEnd() {
        if (isDragging) {
            const threshold = 50; // Schwellenwert für die Erkennung eines Swipes oder Ziehens
            const deltaX = startX - endX;

            if (deltaX > threshold) {
                // Swipe oder Ziehen nach links (vorheriges Bild)
                showNextImage();
            } else if (deltaX < -threshold) {
                // Swipe oder Ziehen nach rechts (nächstes Bild)
                showPreviousImage();
            }

            isDragging = false;
        }
    }

    galleryItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            currentIndex = index;
            openModal();
        });
    });

    document.getElementById('nextBtn').addEventListener('click', showNextImage);
    document.getElementById('prevBtn').addEventListener('click', showPreviousImage);
    closeButton.addEventListener('click', closeModal);

    // Event-Listener für Maus- und Touch-Gesten hinzufügen
    modalImg.addEventListener('mousedown', handleStart);
    modalImg.addEventListener('mousemove', handleMove);
    modalImg.addEventListener('mouseup', handleEnd);
    modalImg.addEventListener('touchstart', handleStart);
    modalImg.addEventListener('touchmove', handleMove);
    modalImg.addEventListener('touchend', handleEnd);
});
