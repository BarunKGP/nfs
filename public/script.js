const uploadArea = document.getElementById('uploadArea');
const uploadButton = document.getElementById('uploadButton');

uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadArea.classList.add('active');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('active');
});

uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadArea.classList.remove('active');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

uploadButton.addEventListener('click', () => {
    const files = document.getElementById('fileInput').files;
    handleFiles(files);
});

function handleFiles(files) {
    for (const file of files) {
        uploadFile(file);
    }
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(fileUrl => {
        console.log('File uploaded:', fileUrl);
        // You can handle the file URL here
        alert('File uploaded successfully. URL: ' + fileUrl);
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
    });
}

