'use strict';
for (const layer of document.querySelectorAll('.layer')) {
  const key = layer.dataset.sound;
  const button = layer.querySelector('button');
  const slider = layer.querySelector('input');
  const output = layer.querySelector('output');
  const label = button.querySelector('strong').textContent;
  const audio = new Audio('audio/' + key + '.mp3' + (key === 'stream' ? '?v=trickle' : ''));
  audio.preload = 'none';
  audio.loop = true;
  try {
    const stored = localStorage.getItem('volume-' + key);
    if (stored !== null && Number.isFinite(Number(stored))) slider.value = stored;
  } catch {}
  function updateVolume() {
    audio.volume = Number(slider.value) / 100;
    output.textContent = slider.value + '%';
  }
  function updateButton() {
    button.setAttribute('aria-pressed', String(!audio.paused));
    button.setAttribute('aria-label', label + (audio.paused ? 'を再生' : 'を停止'));
    button.querySelector('span').textContent = audio.paused ? '▶' : 'Ⅱ';
  }
  slider.oninput = () => {
    updateVolume();
    try { localStorage.setItem('volume-' + key, slider.value); } catch {}
  };
  button.onclick = async () => {
    const error = document.querySelector('#ambient-error');
    error.hidden = true;
    if (!audio.paused) return audio.pause();
    try { await audio.play(); }
    catch (failure) {
      if (failure.name === 'AbortError') return;
      error.textContent = label + 'を読み込めませんでした。もう一度再生してください。';
      error.hidden = false;
    }
  };
  audio.onplay = audio.onpause = updateButton;
  updateVolume();
}
