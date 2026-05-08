const fit = (img) => {
  const w = img.offsetWidth, h = img.offsetHeight;
  if (!w || !h || !img.naturalWidth) return;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = w / h;
  const diff = Math.abs(Math.log(imgRatio / boxRatio));
  const threshold = parseFloat(img.dataset.smartFit) || 0.35;
  img.style.objectFit = diff > threshold ? 'contain' : 'cover';
};

document.querySelectorAll('img[data-smart-fit]').forEach((img) => {
  const apply = () => fit(img);
  if (img.complete && img.naturalWidth) apply();
  else img.addEventListener('load', apply, { once: true });
  new ResizeObserver(apply).observe(img);
});