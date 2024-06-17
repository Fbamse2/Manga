// dynamic-chapters.js

// Sample JSON data (replace with your actual JSON data)
const chapters = [
    { "chapter": "Chapter 1", "file": "Chapter 1.html", "title": "Punch 1: One Punch" },
    { "chapter": "Chapter 2", "file": "Chapter 2.html", "title": "Punch 2: Crab and job hunting" },
    { "chapter": "Chapter 3", "file": "Chapter 3.html", "title": "" },
    { "chapter": "Chapter 4", "file": "Chapter 4.html", "title": "" },
    { "chapter": "Chapter 5", "file": "Chapter 5.html", "title": "" },
    { "chapter": "Chapter 6", "file": "Chapter 6.html", "title": "" },
    { "chapter": "Chapter 7", "file": "Chapter 7.html", "title": "" },
    { "chapter": "Chapter 8", "file": "Chapter 8.html", "title": "" },
    { "chapter": "Chapter 9", "file": "Chapter 9.html", "title": "" },
    { "chapter": "Chapter 10", "file": "Chapter 10.html", "title": "" },
    { "chapter": "Chapter 11", "file": "Chapter 11.html", "title": "" },
    { "chapter": "Chapter 12", "file": "Chapter 12.html", "title": "" }
];

// Function to generate the HTML based on JSON data
function generateChaptersList(chapters) {
    const chaptersList = document.getElementById('chaptersList');

    chapters.forEach(chapter => {
        const listItem = document.createElement('li');
        listItem.classList.add('chapter-item');
        listItem.textContent = `${chapter.chapter}:`;

        if (chapter.title) {
            const titleSpan = document.createElement('span');
            titleSpan.textContent = chapter.title;
            listItem.appendChild(document.createElement('br'));
            listItem.appendChild(titleSpan);
        }

        listItem.setAttribute('data-file', chapter.file); // Set data-file attribute
        chaptersList.appendChild(listItem);
    });

    // Add event listener to each chapter item
    chaptersList.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove 'clicked' class from all items
            chaptersList.querySelectorAll('.chapter-item').forEach(item => {
                item.classList.remove('clicked');
            });

            // Add 'clicked' class to the clicked item
            this.classList.add('clicked');

            // Call your function to open the chapter file
            openWindow(this.dataset.file, 'preview');
        });
    });
}

// Call the function to generate the chapters list
generateChaptersList(chapters);