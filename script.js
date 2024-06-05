document.addEventListener('DOMContentLoaded', function() {
    const fontForm = document.getElementById('fontForm');
    const fontList = document.getElementById('fontList');

    fontForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const fontTitle = document.getElementById('font-title').value;
        const fontFamily = document.getElementById('font-family').value;
        const fontUrl = document.getElementById('font-url').value;

        addFont(fontTitle, fontFamily, fontUrl);
    });

    function addFont(title, family, url) {
        fetch('add_font.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, family, url })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadFonts();
                fontForm.reset();
                showSuccessPopup(); // Show success popup

            }
        });
    }

    function loadFonts() {
        fetch('get_fonts.php')
        .then(response => response.json())
        .then(data => {
            fontList.innerHTML = '';
            data.fonts.forEach(font => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${font.title}</td>
                    <td>${font.family}</td>
                    <td>${font.url}</td>
                    <td class="actions">
                        <button onclick="deleteFont(${font.id})">Delete</button>
                    </td>
                `;
                fontList.appendChild(row);
            });
        });
    }

    // Define deleteFont function in the global scope
    window.deleteFont = function(id) {
        fetch('delete_font.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadFonts();
            }
        });
    }

    // Load fonts when the page is loaded
    function showSuccessPopup() {
        const overlaySuccess = document.getElementById('overlaySuccess');
        const popupSuccess = document.getElementById('popupSuccess');
        overlaySuccess.style.display = 'block';
        popupSuccess.style.display = 'block';
    }

    function closeSuccessPopup() {
        const overlaySuccess = document.getElementById('overlaySuccess');
        const popupSuccess = document.getElementById('popupSuccess');
        overlaySuccess.style.display = 'none';
        popupSuccess.style.display = 'none';
    }
    
    window.closeSuccessPopup = closeSuccessPopup; // Expose closeSuccessPopup globally
    loadFonts(); // Load fonts when the page is loaded

});
