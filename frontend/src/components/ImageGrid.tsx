import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard"; // Ensure ImageCard is imported
import "./ImageGrid.css"; // Import CSS file for layout styles

interface Picture {
  _id: string;
  title: string;
  imageUrl: string;
  likes: number;
  followers: string[];
}

const ImageGrid: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const userId = "user123";

  // Fetch images from the API
  const fetchPictures = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/api/postimage/imagesget");
      const data: Picture[] = await response.json();
      setPictures(data);
    } catch (error) {
      console.error("Error fetching pictures:", error);
    }
  };  

  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <div className="image-section">
      <div className="picture-grid">
        {pictures.map((picture) => (
          <ImageCard
            key={picture._id}
            id={picture._id}
            title={picture.title}
            imageUrl={picture.imageUrl}
            likes={picture.likes}
            followers={picture.followers}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
