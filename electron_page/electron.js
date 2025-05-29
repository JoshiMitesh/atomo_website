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

    // Second Page Slider
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
                image: '/electron_page/Frame.svg',
                title: 'What Is Electron?',
                description: 'Atomo Innovation’s Electron is a powerful edge computing platform for industries, offering real-time intelligence, faster processing and automation at the edge.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Why It Exists?',
                description: 'With Electron, industries can run AI locally—no cloud needed. This means faster, secure, and reliable operations, even offline or in remote locations.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: "Who It's For?",
                description: 'Built for system integrators and IIoT providers, Electron delivers smart, scalable, and ultra-reliable edge computing solutions.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Built for Harsh Realities!',
                description: 'Electron excels in real-world environments - from remote farms to factory floors and power stations - delivering reliable edge intelligence wherever its needed most.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Not Just a Device – A Platform!',
                description: 'Industrial-grade toughness. Electron thrives in farms, factories, and power plants—ensuring AI never quits, even off-grid.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Powers Smarter Operations',
                description: 'It empowers machines to communicate, predict potential issues, and optimize performance autonomously-directly at the edge, without relying on the cloud.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Your First Step into Industry 4.0!',
                description: 'Electron serves as a gateway to modern industrial practices, seamlessly bridging legacy systems with future-ready, intelligent infrastructure.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Easy to Integrate, Hard to Replace',
                description: 'Electron integrates effortlessly into existing systems-and once its there, it becomes an indispensable part of operations, redefining efficiency and control.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Part of a Bigger Family',
                description: 'Electron works seamlessly with Atomo’s Neutron and Proton systems, creating a powerful connected smart ecosystem for homes and industries.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Designed in India, Made for the World!',
                description: 'Born in India, built for the world—Electron combines rugged engineering with scalable intelligence to transform industries everywhere.'
            }
        ];

        // Create slides
        slidesData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" class="slide-img">
                <div class="slide-content">
                    <h3 class="text-xl font-bold mb-2">${slide.title}</h3>
                    <p class="text-sm">${slide.description}</p>
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

            console.log('Updating slider: currentIndex:', currentIndex, 'translateX:', translateX);
            slider.style.transform = `translateX(${translateX}px)`;

            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
            console.log('Button states:', { prevDisabled: prevBtn.disabled, nextDisabled: nextBtn.disabled });
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
            console.log('Prev button clicked, currentIndex before:', currentIndex);
            clearTimeout(autoSlideTimer);
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
                console.log('Prev button clicked, currentIndex after:', currentIndex);
            }
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        });

        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked, currentIndex:', currentIndex);
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

        // Initial update
        updateSlider();
    }

    // Fourth Page Slider
    function initializeFourthPageSlider() {
        const featureSlider = document.querySelector('.features-slider');
        const featureSlides = document.querySelectorAll('.feature-slide');
        const prevFeatureBtn = document.querySelector('#fourth-page .prev-feature');
        const nextFeatureBtn = document.querySelector('#fourth-page .next-feature');
        const fourthPageSection = document.querySelector('#fourth-page');

        let currentFeatureIndex = 0;
        const autoSlideinterval = 10000; // 10 seconds
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

            // Center the slides on mobile
            if (slidesToShow === 1) {
                const offset = (containerWidth - slideWidth) / 2;
                featureSlider.style.transform = `translateX(calc(${translateX}px + ${offset}px))`;
            } else {
                featureSlider.style.transform = `translateX(${translateX}px)`;
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

    // Initialize all components
    initializeHamburgerMenu();
    initializeVideo();
    initializePopup();
    initializeFourthPageSlider();
    initializeSecondPageSlider();
});