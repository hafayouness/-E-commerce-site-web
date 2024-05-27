async function ImagetoBase64(file) {
  const render = new FileReader();
  render.readAsDataURL(file);
  const data = new Promise((resolve, reject) => {
    render.onload = () => resolve(render.result);
    render.onerror = (err) => reject(err);
  });
  return data;
}

export { ImagetoBase64 };
