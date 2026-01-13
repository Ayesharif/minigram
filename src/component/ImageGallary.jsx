export const ImageGallery = ({ images }) => {
  const count = images.length;

  // Layout for 1 image
  if (count === 1) {
    return (
      <div className="w-full">
        <img src={images[0].imageUrl} alt="Post" className="w-full max-h-96 object-cover rounded-lg" />
      </div>
    );
  }

  // Layout for 2 images
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-1">
        {images.map((img, idx) => (
          <div key={idx} className="aspect-square">
            <img src={img.imageUrl} alt={`Post ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  // Layout for 3 images
  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2 aspect-video">
          <img src={images[0].imageUrl} alt="Post 1" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="aspect-square">
          <img src={images[1].imageUrl} alt="Post 2" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="aspect-square">
          <img src={images[2].imageUrl} alt="Post 3" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
    );
  }

  // Layout for 4 images
  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-1">
        {images.map((img, idx) => (
          <div key={idx} className="aspect-square">
            <img src={img.imageUrl} alt={`Post ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  // Layout for 5+ images (show first 4, with counter on 4th)
  if (count >= 5) {
    const remaining = count - 4;
    return (
      <div className="grid grid-cols-2 gap-1">
        {images.slice(0, 3).map((img, idx) => (
          <div key={idx} className="w-full aspect-square overflow-hidden rounded-lg">
            <img src={img.imageUrl} alt={`Post ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
        <div className="aspect-square relative">
          <img src={images[3].imageUrl} alt="Post 4" className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-70 transition">
            <span className="text-white text-4xl font-bold">+{remaining}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};