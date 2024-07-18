import React, { useRef, useEffect } from "react";

function Card(props) {
  const imgRef = useRef(null);

  useEffect(() => {
    let options = {};
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector("img");
          const source = entry.target.querySelector("source");
          img.src = img.dataset.src;
          source.srcset = source.dataset.srcset;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [props.image]);

  return (
    <div className='Card text-center' ref={imgRef}>
      <picture>
        <source data-srcset={props.webp} type='image/webp' />
        <img data-src={props.image} alt='board photo' />
      </picture>
      <div className='p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all'>
        {props.children}
      </div>
    </div>
  );
}

export default Card;
