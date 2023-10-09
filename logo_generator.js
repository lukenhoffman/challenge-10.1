const fs = require('fs');
const prompt = require('prompt-sync')();

const getText = () => {
    let text = '';
    while (text.length < 1 || text.length > 3) {
        text = prompt('Enter a text (up to 3 characters): ');
    }
    return text;
};

const getColor = (type) => {
    let color = '';
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    while (!color.match(regex) && !color) {
        color = prompt(`Enter ${type} color (keyword or hex): `);
    }
    return color;
};

const getShape = () => {
    const shapes = ['circle', 'triangle', 'square'];
    let shape = '';
    while (!shapes.includes(shape)) {
        shape = prompt('Choose a shape (circle, triangle, square): ');
    }
    return shape;
};

const generateSvg = (text, textColor, shape, shapeColor) => {
    let shapeElement = '';
    
    switch(shape) {
        case 'circle':
            shapeElement = `<circle cx="150" cy="100" r="90" fill="${shapeColor}" />`;
            break;
        case 'triangle':
            shapeElement = `<polygon points="150,10 280,190 20,190" fill="${shapeColor}" />`;
            break;
        case 'square':
            shapeElement = `<rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />`;
            break;
    }

    const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeElement}
        <text x="150" y="115" font-family="Arial" font-size="40" fill="${textColor}" text-anchor="middle">${text}</text>
    </svg>`;
    

    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
};

const main = () => {
    const text = getText();
    const textColor = getColor('text');
    const shape = getShape();
    const shapeColor = getColor(shape);
    generateSvg(text, textColor, shape, shapeColor);
};

main();
