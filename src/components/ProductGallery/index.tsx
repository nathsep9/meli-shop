import React, { useState } from 'react';

import './ProductGallery.scss';

interface ProductGalleryProps {
  image: string[];
  altText?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ image, altText = 'Producto' }) => {
  const [mainImage, setMainImage] = useState(image[0]);

  return (
    <div className="gallery">
      <div className="gallery__thumbnails">
        {image.map((img, idx) => (
          <button
            key={idx}
            className={`gallery__thumb ${img === mainImage ? 'active' : ''}`}
            onClick={() => setMainImage(img)}
          >
            <img src={img} alt={`${altText} miniatura ${idx + 1}`} />
          </button>
        ))}
      </div>

      <div className="gallery__main">
        <img src={mainImage} alt={altText} />
      </div>
    </div>
  );
};

export default ProductGallery;
