function chapter(chapter_number){    
    const mangaContainer = document.querySelector('.manga-container');
    const mangaPages = document.querySelector('.manga-pages');
    const pages = document.querySelectorAll('.manga-page');
    const pageImages = document.querySelectorAll('.manga-page img');
    let chapterPageIndex = localStorage.getItem('chapter_' + chapter_number + '_pageindex') ? parseInt(localStorage.getItem('chapter_' + chapter_number + '_pageindex')) : 0;

    function updatePageIndicators() {
        const currentPageSpan = document.getElementById('currentPage');
        const totalPagesSpan = document.getElementById('totalPages');
        
        currentPageSpan.textContent = chapterPageIndex + 1;
        totalPagesSpan.textContent = pages.length;

        // Update active state of page buttons
        document.querySelectorAll('.page_button').forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.page_button[href="#page${chapterPageIndex + 1}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Store chapter_pageindex in localStorage
        localStorage.setItem('chapter_' + chapter_number + '_pageindex', chapterPageIndex);
    }

    function changePage(delta) {
        const containerHeight = mangaContainer.clientHeight;
        chapterPageIndex = Math.min(Math.max(chapterPageIndex + delta, 0), pages.length - 1);
        const offset = -chapterPageIndex * containerHeight;
        mangaPages.style.transform = `translateY(${offset}px)`;
        updatePageIndicators();
    }

    // Function to load saved chapter_pageindex from localStorage on page load
    function loadSavedPage() {
        const savedPageIndex = localStorage.getItem('chapter_' + chapter_number + '_pageindex');
        if (savedPageIndex !== null) {
            chapterPageIndex = parseInt(savedPageIndex);
            scrollToPage(chapterPageIndex);
            updatePageIndicators(); // Update active state on page load
        }
    }

    // Call loadSavedPage on page load
    loadSavedPage();

    function scrollToPage(pageIndex) {
        const pageHeight = mangaContainer.clientHeight;
        const offset = -pageIndex * pageHeight;
        mangaPages.style.transform = `translateY(${offset}px)`;
        updatePageIndicators();
    }

    document.querySelectorAll('.page_button').forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const pageNumber = index + 1;
            scrollToPage(pageNumber - 1);
        });
    });

    document.querySelectorAll('.page_button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPageId = event.target.getAttribute('href');
            const targetPageIndex = parseInt(targetPageId.match(/\d+/)[0]) - 1;
            chapterPageIndex = targetPageIndex;
            scrollToPage(chapterPageIndex);
            updatePageIndicators();
        });
    });

    function updatePageHeight() {
        const pageHeight = mangaContainer.clientHeight;
        pages.forEach(page => {
            page.style.height = `${pageHeight}px`;
        });
        const offset = -chapterPageIndex * pageHeight;
        mangaPages.style.transform = `translateY(${offset}px)`;
    }

    updatePageHeight();
    updatePageIndicators();
    window.addEventListener('resize', updatePageHeight);

    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = (new Date).getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    }

    mangaContainer.addEventListener('wheel', throttle((event) => {
        if (event.deltaY < 0) {
            changePage(-1); // Scroll up
        } else if (event.deltaY > 0) {
            changePage(1); // Scroll down
        }
        event.preventDefault();
    }, 500));

    window.addEventListener('keydown', throttle((event) => {
        if (event.key === 'ArrowUp') {
            changePage(-1); // Scroll up
        } else if (event.key === 'ArrowDown') {
            changePage(1); // Scroll down
        }
    }, 500));

    pageImages.forEach((img) => {
        img.addEventListener('click', (event) => {
            const imgRect = img.getBoundingClientRect();
            const clickY = event.clientY - imgRect.top;
            const imgHeight = img.clientHeight;
            if (clickY < imgHeight / 2) {
                changePage(-1); // Clicked on top half = Scroll up
            } else {
                changePage(1); // Clicked on bottom half = Scroll down
            }

            // Update active state of page buttons
            const activeButton = document.querySelector(`.page_button[href="#page${chapterPageIndex + 1}"]`);
            document.querySelectorAll('.page_button').forEach(btn => btn.classList.remove('active'));
            activeButton.classList.add('active');
        });
    });

}

function openWindow(Url, winName) {
    window.open(Url, winName, "width=" + screen.width + ",height=" + screen.height);
}