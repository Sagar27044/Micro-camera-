// Check if the browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            const video = document.getElementById('video');
            video.srcObject = stream;

            // Capture button event listener
            document.getElementById('capture').addEventListener('click', function() {
                const canvas = document.getElementById('canvas');
                const context = canvas.getContext('2d');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);

                // Get the picture name from the input
                const picName = document.getElementById('picName').value || 'captured_image';
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `${picName}.png`; // Set the file name
                link.click(); // Trigger the download
            });
        })
        .catch(function(error) {
            console.error("Error accessing the camera: ", error);
        });
} else {
    console.error("getUserMedia is not supported in this browser.");
}
