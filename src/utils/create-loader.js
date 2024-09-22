export const createLoader = () => {
  const loader = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  loader.setAttribute("width", "24");
  loader.setAttribute("height", "24");
  loader.setAttribute("viewBox", "0 0 24 24");
  loader.setAttribute("fill", "#94a3b8");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
  );
  path.setAttribute("class", "feature-find__loading-path");

  loader.appendChild(path);

  return loader;
};
