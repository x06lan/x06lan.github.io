function every_update() {
    if (document.querySelectorAll(".hljs-keyword") != 0) {
        document.querySelectorAll(".hljs-keyword").forEach(element => {
            if (element.innerText == "return") {
                element.className = "hijs-return"
                    // console.log(element.innerText)

            }
            // console.log(element.innerText)
        });
    }

}

function auto_hight() {
    let root = document.documentElement;

    document.addEventListener("", e => {
        console.log(window.innerHeight);
        // root.style.setProperty('--windowgh', document.window.style.hight + "px");
    });
}

function durg_bar() {
    var handler = document.querySelector('.handler');
    var wrapper = handler.closest('.wrapper');
    var boxA = wrapper.querySelector('#editor');
    var isHandlerDragging = false;

    document.addEventListener('mousedown', function(e) {
        // If mousedown event is fired from .handler, toggle flag to true
        if (e.target === handler) {
            isHandlerDragging = true;
        }
    });

    document.addEventListener('mousemove', function(e) {
        // Don't do anything if dragging flag is false
        if (!isHandlerDragging) {
            return false;
        }

        // Get offset
        var containerOffsetLeft = wrapper.offsetLeft;

        // Get x-coordinate of pointer relative to container
        var pointerRelativeXpos = e.clientX - containerOffsetLeft;

        // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
        var boxAminWidth = 20;

        // Resize box A
        // * 8px is the left/right spacing between .handler and its inner pseudo-element
        // * Set flex-grow to 0 to prevent it from growing
        boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
        boxA.style.flexGrow = -1;
    });

    document.addEventListener('mouseup', function(e) {
        // Turn off dragging flag when user mouse is up
        isHandlerDragging = false;
    });
}