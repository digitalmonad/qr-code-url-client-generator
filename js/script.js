const form = document.getElementById('form');
const qrWrapper = document.getElementById('qr-code-wrapper');

const clearUI = () => {
  qrWrapper.innerHTML = null;
};

const createSaveButton = (saveUrl) => {
  const link = document.createElement('a');
  link.href = saveUrl;
  link.classList = 'text-xs text-white mt-8 rounded bg-purple-800 px-4 py-2';
  link.download = 'qr-code';
  link.innerHTML = 'Save Image';
  qrWrapper.appendChild(link);
};

const createQRElement = (url, size, color) => {
  // ugly :(
  new QRCode(qrWrapper, {
    text: url,
    width: size,
    height: size,
    colorDark: color,
  });
};

const updateDomWithRQCode = ({ url, size, color, timeout }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      createQRElement(url, size, color);
      resolve();
    }, timeout);
  });

const updateDomWithSaveButton = ({ timeout }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const imageUrl = qrWrapper.querySelector('img').src;
      createSaveButton(imageUrl);
      resolve();
    }, timeout);
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;
  const color = document.getElementById('color').value;

  if (url === '') {
    alert('Please fill in a URL.');
  } else {
    await updateDomWithRQCode({ url, size, color, timeout: 0 });
    await updateDomWithSaveButton({ timeout: 0 });
  }
};

form.addEventListener('submit', handleSubmit);

// Theme switcher
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

let isIT = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Change the icons inside the button based on previous settings
if (isIT) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');
  document.documentElement.classList.toggle('dark');
});
