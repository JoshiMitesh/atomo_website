document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('electron-video');
    
    // Remove the loop attribute if present
    video.removeAttribute('loop');
    
    // When video ends, pause it and seek to the last frame
    video.addEventListener('ended', function() {
        // Seek to the end again to ensure we're on the last frame
        video.currentTime = video.duration;
        video.pause();
    });
    
    // For iOS/Safari compatibility
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        // First try to force WebM playback
        video.innerHTML = '<source src="/neutron_page/neutronoutput_vp8final.webm" type="video/webm">';
        
        // If WebM fails, fallback to MP4 after 2 seconds
        setTimeout(() => {
            if (video.readyState === 0) { // If still not playing
                video.innerHTML = '<source src="/neutron_page/neutronoutput.mp4" type="video/mp4">';
                video.load();
                video.play().catch(e => console.log('Autoplay prevented:', e));
            }
        }, 2000);
    }
    
    // Handle autoplay restrictions
    video.play().catch(e => {
        console.log('Autoplay prevented:', e);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Functionality
    function initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navList = document.querySelector('#navbar ul');

        if (!hamburger || !navList) {
            console.warn('Hamburger or navList not found!');
            return;
        }

        hamburger.addEventListener('click', function () {
            navList.classList.toggle('active');
            this.classList.toggle('open');

            const navItems = document.querySelectorAll('#navbar ul li');
            navItems.forEach((item, index) => {
                if (navList.classList.contains('active')) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                }
            });
        });

        const navLinks = document.querySelectorAll('#navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navList.classList.remove('active');
                hamburger.classList.remove('open');
                const navItems = document.querySelectorAll('#navbar ul li');
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                });
            });
        });
    }

    // Video Pause on End
    function initializeVideo() {
        const video = document.getElementById('electron-video');
        if (video) {
            video.addEventListener('ended', () => {
                video.pause();
                video.currentTime = video.duration; // Stay on last frame
            });
        }
    }

    // Popup Functionality
    function initializePopup() {
        const buyButtons = document.querySelectorAll('.buy-button');
        const popup = document.getElementById('subscription-popup');
        const subscribeButton = document.getElementById('subscribe-button');
        const emailInput = document.getElementById('email-input');

        if (!popup || !subscribeButton || !emailInput) {
            console.warn('Popup elements not found!');
            return;
        }

        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                popup.classList.add('active');
            });
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });

        subscribeButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                emailInput.value = '';
                popup.classList.remove('active');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Fourth Page Slider
    function initializeFourthPageSlider() {
        const featureSlider = document.querySelector('.features-slider');
        const featureSlides = document.querySelectorAll('.feature-slide');
        const prevFeatureBtn = document.querySelector('#fourth-page .prev-feature');
        const nextFeatureBtn = document.querySelector('#fourth-page .next-feature');
        const fourthPageSection = document.querySelector('#fourth-page');

        let currentFeatureIndex = 0;
        const autoSlideInterval = 10000; // 10 seconds
        const restartDelay = 1000; // 1 second
        let autoSlideTimer = null;
        let isAutoSliding = false;

        function updateSlidesToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        }

        function updateFeatureSlider() {
            const slidesToShow = updateSlidesToShow();
            const slideWidth = featureSlides[0].offsetWidth + 10; // Width + margin (5px on each side)
            const containerWidth = featureSlider.parentElement.offsetWidth;
            const totalWidthPerSlide = slideWidth;
            const translateX = -currentFeatureIndex * totalWidthPerSlide;
            featureSlider.style.transform = `translateX(${translateX}px)`;

            // Center the slides on mobile
            if (slidesToShow === 1) {
                const offset = (containerWidth - slideWidth) / 2;
                featureSlider.style.transform = `translateX(calc(${translateX}px + ${offset}px))`;
            }

            // Disable buttons at boundaries
            prevFeatureBtn.disabled = currentFeatureIndex === 0;
            nextFeatureBtn.disabled = currentFeatureIndex >= featureSlides.length - slidesToShow;
        }

        function autoSlide() {
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex >= featureSlides.length - slidesToShow) {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            } else {
                currentFeatureIndex++;
                updateFeatureSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!isAutoSliding) {
                            isAutoSliding = true;
                            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                        }
                    } else {
                        if (isAutoSliding) {
                            isAutoSliding = false;
                            clearTimeout(autoSlideTimer);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(fourthPageSection);

        prevFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (currentFeatureIndex > 0) {
                currentFeatureIndex--;
                updateFeatureSlider();
            }
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        });

        nextFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex < featureSlides.length - slidesToShow) {
                currentFeatureIndex++;
                updateFeatureSlider();
            } else {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            }
        });

        window.addEventListener('resize', () => {
            const slidesToShow = updateSlidesToShow();
            currentFeatureIndex = Math.min(currentFeatureIndex, featureSlides.length - slidesToShow);
            updateFeatureSlider();
        });

        updateFeatureSlider();
    }

    function initializeSecondPageSlider() {
    const slider = document.querySelector('#slidesContainer');
    const prevBtn = document.querySelector('#second-page .prev-slide');
    const nextBtn = document.querySelector('#second-page .next-slide');
    const secondPageSection = document.querySelector('#second-page');

    // Check if all required elements exist
    if (!slider || !prevBtn || !nextBtn || !secondPageSection) {
        console.warn('Slider elements not found:', { slider, prevBtn, nextBtn, secondPageSection });
        return;
    }

    let currentIndex = 0;
    const autoSlideInterval = 10000; // 10 seconds
    const restartDelay = 1000; // 1 second
    let autoSlideTimer = null;
    let isAutoSliding = false;

    // Sample data for slides
    const slidesData = [
        {
            image: '/neutron_page/Frame.svg',
            title: 'What Is Neutron?',
            description: 'Neutron is Atomo Innovation’s entry-level smart home controller, designed for simplicity, efficiency, and seamless use in everyday homes.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Why It Exists?',
            description: 'Our mission is to make smart living accessible to all by providing essential home automation solutions at an affordable price point.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: "Who It's For?",
            description: 'Perfect for first-time users, renters, and compact homes, Neutron offers easy, plug-and-play automation for hassle-free smart living.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Designed for Daily Comfort.',
            description: 'Manages daily tasks such as lighting, fan control, remote switching, and basic sensor automation for convenient smart home control.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Intuitive by Nature.',
            description: 'With a simple app interface and easy setup, Neutron enables users of all ages to operate smart home controls effortlessly without technical skills.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Silently Powerful.',
            description: 'Neutron seamlessly blends into your lifestyle, offering smart, hassle-free control that operates smoothly without any fuss or complexity.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Smart, Not Complicated.',
            description: 'Provides the perfect balance of intelligence to automate your home efficiently, delivering smart control without overwhelming complexity.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Future-Ready Starter Kit.',
            description: 'Neutron serves as your gateway into the Atomo ecosystem - start simple and upgrade to Proton or Electron as your smart home needs grow.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Affordable, Yet Advanced.',
            description: 'Despite its affordable price, Neutron supports essential protocols including WiFi, BLE, RF, and IR for versatile smart home connectivity.'
        },
        {
            image: '/neutron_page/Frame.svg',
            title: 'Built for India.',
            description: 'Neutron, engineered for Indian power systems, appliances, and lifestyles with reliability, efficiency, and smart functionality.'
        }
    ];

    // Create slides
    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}" class="slide-img">
            <div class="slide-content">
                <h3 class="text-2xl font-bold mb-2 pb-[50px]">${slide.title}</h3>
                <p class="text-base">${slide.description}</p>
            </div>
        `;
        slider.appendChild(slideElement);
    });

    const slides = document.querySelectorAll('#second-page .slide');

    // Ensure slides exist
    if (slides.length === 0) {
        console.warn('No slides found in #slidesContainer');
        return;
    }

    function updateSlidesToShow() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function updateSlider() {
        const slidesToShow = updateSlidesToShow();
        const slideWidth = slides[0].offsetWidth + 10; // Width + margin (5px on each side)
        const containerWidth = slider.parentElement.offsetWidth;
        const totalWidthPerSlide = slideWidth;
        let translateX = -currentIndex * totalWidthPerSlide;

        // Center the slides on mobile
        if (slidesToShow === 1) {
            const offset = (containerWidth - slideWidth) / 2;
            translateX += offset;
        }

        slider.style.transform = `translateX(${translateX}px)`;

        // Update button states (corrected 'preview' to 'prevBtn')
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
    }

    function autoSlide() {
        const slidesToShow = updateSlidesToShow();
        if (currentIndex >= slides.length - slidesToShow) {
            setTimeout(() => {
                currentIndex = 0;
                updateSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }, restartDelay);
        } else {
            currentIndex++;
            updateSlider();
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!isAutoSliding) {
                        isAutoSliding = true;
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                } else {
                    if (isAutoSliding) {
                        isAutoSliding = false;
                        clearTimeout(autoSlideTimer);
                    }
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(secondPageSection);

    prevBtn.addEventListener('click', () => {
        clearTimeout(autoSlideTimer);
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
        if (isAutoSliding) {
            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
        }
    });

    nextBtn.addEventListener('click', () => {
        clearTimeout(autoSlideTimer);
        const slidesToShow = updateSlidesToShow();
        if (currentIndex < slides.length - slidesToShow) {
            currentIndex++;
            updateSlider();
        } else {
            setTimeout(() => {
                currentIndex = 0;
                updateSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }, restartDelay);
        }
    });

    window.addEventListener('resize', () => {
        const slidesToShow = updateSlidesToShow();
        currentIndex = Math.min(currentIndex, slides.length - slidesToShow);
        updateSlider();
    });

    updateSlider();
}
    // Initialize all components
    initializeHamburgerMenu();
    initializeVideo();
    initializePopup();
    initializeFourthPageSlider();
    initializeSecondPageSlider();
});