export function setupInstructions() {
  // Create bar for prompt
  let bar = document.getElementById('instructions-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'instructions-bar';
    bar.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    `;
    document.body.appendChild(bar);
  }
  
  // Create blinking prompt
  const prompt = document.createElement('span');
  prompt.id = 'instructions-prompt';
  prompt.textContent = 'Press I for instructions';
  prompt.style.cssText = `
    color: #fff;
    font-family: Arial, sans-serif;
    font-size: 14px;
    text-shadow: 0 0 8px #000, 0 0 2px #000;
  `;
  bar.appendChild(prompt);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'instructions-overlay';
  overlay.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1000;
    align-items: center;
    justify-content: center;
  `;
  overlay.innerHTML = `
    <div class="instructions-content" style="
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      padding: 2em;
      max-width: 500px;
      position: relative;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    ">
      <button id="close-instructions" style="
        position: absolute;
        top: 1em;
        right: 1em;
        font-size: 1.3em;
        background: #fff;
        border: none;
        color: #222;
        cursor: pointer;
        width: 2em;
        height: 2em;
        line-height: 1.2em;
        border-radius: 50%;
        box-shadow: 0 0 8px #000;
        font-weight: bold;
      ">&times;</button>
      <h2 style="color:#fff; margin-top: 0; text-align: center; font-family: Arial, sans-serif;">Controls</h2>
      <ul style="
        color: #fff;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        padding-left: 1.5em;
      ">
        <li>Left Mouse Button: Rotate view</li>
        <li>Right Mouse Button: Pan</li>
        <li>Mouse Wheel: Zoom in/out</li>
        <li>H Key: Toggle help overlay</li>
        <li>V Key: Toggle between FPS and Orbit camera controls</li>
        <li>I Key: Show/hide instructions overlay</li>
        <li>Esc: Close instructions overlay</li>
      </ul>
    </div>
  `;
  document.body.appendChild(overlay);

  // Blinking effect
  let blink = true;
  let blinkInterval = setInterval(() => {
    prompt.style.visibility = blink ? 'hidden' : 'visible';
    blink = !blink;
  }, 600);

  // Show/hide overlay and manage prompt
  function showOverlay() {
    overlay.style.display = 'flex';
    bar.style.display = 'none';
    clearInterval(blinkInterval);
    prompt.style.visibility = 'visible';
  }
  function hideOverlay() {
    overlay.style.display = 'none';
    bar.style.display = 'flex';
    blink = true;
    blinkInterval = setInterval(() => {
      prompt.style.visibility = blink ? 'hidden' : 'visible';
      blink = !blink;
    }, 600);
  }
  function toggleOverlay(forceShow) {
    if (forceShow === true || overlay.style.display === 'none') {
      showOverlay();
    } else {
      hideOverlay();
    }
  }
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'i') toggleOverlay();
    if (e.key === 'Escape') hideOverlay();
  });
  overlay.querySelector('#close-instructions').onclick = hideOverlay;
} 