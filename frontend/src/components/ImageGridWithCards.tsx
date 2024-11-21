import React, { useEffect, useState } from "react";
import "../component-css/ImageGrid.css"; 
import { Link } from "react-router-dom";
import heart from "../images/heart.svg";
import like from "../images/like.svg";
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
  const [likedImages, setLikedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const userId = "user123"; 

  // Fetch images from the API
  const fetchPictures = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/postimage/imagesget"
      );
      const data: Picture[] = await response.json();
      setPictures(data);
    } catch (error) {
      console.error("Error fetching pictures:", error);
    }
  };

  
  useEffect(() => {
    fetchPictures();
  }, []);

  //Like
  const handleLike = async (id: string,isLiked: boolean,currentLikes: number) => {
    
    const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
    setLikedImages((prevState) => ({...prevState,[id]: !isLiked, }));

    // Update the likes
    const updatedPictures = pictures.map((picture) => {
      if (picture._id === id) {
        return {
          ...picture,
          likes: updatedLikes,
        };
      }
      return picture;
    });
    setPictures(updatedPictures);
  };

  return (
    <div className="image-section">
      <div className="picture-grid">
        {pictures.map((picture) => (
          <div key={picture._id} className="img-card">
            <Link className="" to={`/imagesget/${picture._id}`}>
              <div className="img-inner-bg">
                <img
                  className="img-class"
                  src={picture.imageUrl}
                  alt={picture.title}
                />
              </div>
            </Link>
            <div className="card-body">
              <h5 className="card-title">{picture.title}</h5>
              <p className="card-text">{picture.description}</p>
            </div>
            <button
              className="like-btn-main like-btn"
              onClick={() =>
                handleLike(
                  picture._id,
                  likedImages[picture._id] || false,
                  picture.likes
                )
              }
            >
              {likedImages[picture._id] ? (
                <>
                  <img src={like} alt="like-icon" />
                  Liked
                </>
              ) : (
                <>
                  <img src={heart} alt="liked-icon" />
                  Like
                </>
              )}
              ({picture.likes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridWithCards;
