const translateXInput = document.getElementById('translateX');
const translateYInput = document.getElementById('translateY');
const rotateInput = document.getElementById('rotate');
const scaleInput = document.getElementById('scale');
const skewInput = document.getElementById('skew');
const resetButton = document.getElementById('reset');
const box = document.querySelector('.box');

function updateTransform() {
    const translateX = translateXInput.value || 0;
    const translateY = translateYInput.value || 0;
    const rotate = rotateInput.value || 0;
    const scale = scaleInput.value || 1;
    const skew = skewInput.value || 0;

    box.style.transform = `
        translate(${translateX}px, ${translateY}px)
        rotate(${rotate}deg)
        scale(${scale})
        skew(${skew}deg)
    `;
}

translateXInput.addEventListener('input', updateTransform);
translateYInput.addEventListener('input', updateTransform);
rotateInput.addEventListener('input', updateTransform);
scaleInput.addEventListener('input', updateTransform);
skewInput.addEventListener('input', updateTransform);

resetButton.addEventListener('click', () => {
    const confirmation = window.confirm('Biztos törölni akarod?');
    if (confirmation) {
        translateXInput.value = 0;
        translateYInput.value = 0;
        rotateInput.value = 0;
        scaleInput.value = 1;
        skewInput.value = 0;
        updateTransform();
    }
});
