export default {
  beforeMount: (element) => {
    const loadImage = () => {
      const imageElement = Array.from(element.children).find(
        (element) => element.nodeName === "IMG"
      );
      if (imageElement) {
        imageElement.addEventListener("load", () => {
          setTimeout(() => element.classList.add("loaded"), 100);
        });
        imageElement.addEventListener("error", () => console.log("error"));
        imageElement.src = imageElement.dataset.src;
      }
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(element);
        }
      });
    };

    const createObserver = () => {
      const options = {
        root: null,
        threshold: "0",
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(element);
    };

    if (window["IntersectionObserver"]) {
      createObserver();
    } else {
      loadImage();
    }
  },
};
