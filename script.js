//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading=document.getElementById("loading");
const errorDiv=document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
	function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => `reject(Failed to load image: ${url})`;
    img.src = url;
  });
}

btn.addEventListener("click", () => {
  output.innerHTML = "";
  errorDiv.innerText = "";
  loading.style.display = "block";

  const promises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(promises)
    .then(imgElements => {
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      errorDiv.innerText = error;
    })
    .finally(() => {
      loading.style.display = "none";
    });
});