import React, { useEffect, useState } from "react";
import '../component-css/ImageGrid.css'; // Assuming this CSS is still required for styling
import { Link } from "react-router-dom";

interface Picture {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  followers: string[];
}

const ImageGridWithCards: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const userId = "user123"; // Example user ID

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

  // UseEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchPictures();
  }, []);

  // Handle like functionality
  // const handleLike = (id: string, isLiked: boolean, currentLikes: number) => {
  //   const updatedPictures = pictures.map((picture) => {
  //     if (picture._id === id) {
  //       return {
  //         ...picture,
  //         likes: isLiked ? currentLikes - 1 : currentLikes + 1,
  //       };
  //     }
  //     return picture;
  //   });
  //   setPictures(updatedPictures);
  // };

  // // Handle follow functionality
  // const handleFollow = (id: string, currentFollowers: string[]) => {
  //   const updatedPictures = pictures.map((picture) => {
  //     if (picture._id === id) {
  //       const updatedFollowers = currentFollowers.includes(userId)
  //         ? currentFollowers.filter((follower) => follower !== userId)
  //         : [...currentFollowers, userId];
  //       return {
  //         ...picture,
  //         followers: updatedFollowers,
  //       };
  //     }
  //     return picture;
  //   });
  //   setPictures(updatedPictures);
  // };

  // Handle tag functionality
  // const handleTag = (id: string) => {
  //   alert(`Tagging image with ID: ${id}`);
  // };

  return (
    <div className="image-section">
      <div className="picture-grid">
        {pictures.map((picture) => (
            <Link to={`/imagesget/${picture._id}`}>
                <div key={picture._id} className="img-card">
                    <img src={picture.imageUrl} alt={picture.title} />
                    <p>{picture.description}</p>
                    <button
                    className="like-btn"
                    >
                    Like ({picture.likes})
                    </button>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageGridWithCards;
