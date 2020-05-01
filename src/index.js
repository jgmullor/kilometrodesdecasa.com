import { boot, start } from './mapbox.js';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    boot();
    
    document.getElementById('startButton').addEventListener('click', () => {
        start();
    });
});