function restorePosition(targ, lastX, lastY, lastColor) {
    targ.style.top = lastX;
    targ.style.left = lastY;
    targ.style.backgroundColor = lastColor;
}

function prepareDivs() {
    const divs = document.getElementsByClassName("target");

    let isActive = false;
    let isColorChangeActive = false;
    let isResizing = false;
    let targ = null;
    let lastX, lastY, lastColor;
    let offset = [0, 0];

    const startDrag = (e) => {
        targ = e.target;
        lastX = targ.style.top;
        lastY = targ.style.left;
        lastColor = targ.style.backgroundColor;
        isActive = true;
        offset = [
            targ.offsetLeft - (e.clientX || e.touches[0].clientX),
            targ.offsetTop - (e.clientY || e.touches[0].clientY),
        ];
    };

    const stopDrag = () => {
        isActive = false;
        isColorChangeActive = false;
        isResizing = false;
    };

    const handleMove = (e) => {
        if (isActive) {
            const x = e.clientX || e.touches[0].clientX;
            const y = e.clientY || e.touches[0].clientY;
            targ.style.left = `${x + offset[0]}px`;
            targ.style.top = `${y + offset[1]}px`;
        }
    };

    const changeColor = (e) => {
        if (isColorChangeActive) {
            const x = e.clientX || e.touches[0]?.clientX;
            const y = e.clientY || e.touches[0]?.clientY;
            const color = `rgb(${x % 256}, ${y % 256}, ${(x + y) % 256})`;
            targ.style.backgroundColor = color;
        }
    };

    const handleDoubleClick = (e) => {
        targ = e.target;
        lastX = targ.style.top;
        lastY = targ.style.left;
        lastColor = targ.style.backgroundColor;
        isActive = true;
        isColorChangeActive = true;
    };

    const handleEscape = (e) => {
        if (e.key === "Escape") {
            stopDrag();
            restorePosition(targ, lastX, lastY, lastColor);
        }
    };

    for (let div of divs) {
        div.addEventListener("mousedown", startDrag);
        div.addEventListener("mouseup", stopDrag);
        div.addEventListener("dblclick", handleDoubleClick);
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mousemove", changeColor);
    document.addEventListener("keydown", handleEscape);
}

prepareDivs();