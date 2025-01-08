// Adjust screen size based on device resolution
(function() {
    var width = Graphics.width;
    var height = Graphics.height;

    // Resize to fit the window size
    window.onresize = function() {
        width = window.innerWidth;
        height = window.innerHeight;
        Graphics._canvas.style.width = width + 'px';
        Graphics._canvas.style.height = height + 'px';
    };
})();