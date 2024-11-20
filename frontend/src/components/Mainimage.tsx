import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../component-css/ImageGrid.css"; // Assuming this CSS is still required for styling
import "../component-css/Mainimage.css"; // Ensure styling is correct for description
import heart from '../images/heart.svg'
interface Picture {
  _id: string;
  title: string;
  imageUrl: string;
  likes: number;
  followers: string[];
  description: string; // Ensure description is included in your Picture interface
}

const MainImage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get image ID from URL params
  const [picture, setPicture] = useState<Picture | null>(null); // State for the single picture
  const [isLiked, setIsLiked] = useState(false); // Track if the user has liked this image

  // Fetch single image details based on the ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/postimage/imagesget/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPicture(data);
        setIsLiked(data.likes.includes("user123")); // Check if the user has already liked this image
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, [id]);

  // Handle like functionality
  const handleLike = () => {
    if (picture) {
      const updatedLikes = isLiked ? picture.likes - 1 : picture.likes + 1;
      setIsLiked(!isLiked); // Toggle the like status

      // Update the picture's like count in the local state
      setPicture({ ...picture, likes: updatedLikes });

      // Optionally, you can send the updated like count to the server
      fetch(`http://localhost:5000/api/postimage/like/${picture._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123", // Replace with dynamic user ID if applicable
          liked: !isLiked,
        }),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error updating like status:", error));
    }
  };

  // Handle follow functionality
  const handleFollow = () => {
    if (picture) {
      const updatedFollowers = picture.followers.includes("user123")
        ? picture.followers.filter((follower) => follower !== "user123")
        : [...picture.followers, "user123"];
      setPicture({ ...picture, followers: updatedFollowers });
      // Optional: Send the updated followers to the server
    }
  };

  // Handle tag functionality
  const handleTag = () => {
    if (picture) {
      alert(`Tagging image with ID: ${picture._id}`);
    }
  };

  // If picture data is not loaded yet, show a loading message
  if (!picture) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-section main-image">
      <div className="img-card-detail">
        <div className="card-image">
          <img
            src={picture.imageUrl}
            alt={picture.title}
            className="detail-image"
          />
        </div>
        <div className="card-inner-content">

          <button className="like-btn-main" onClick={handleLike}>
            <img src={heart} alt="lik-icon"/>
            {isLiked ? "Like" : "Like"} ({picture.likes})
          </button>
          <h2>{picture.title}</h2>
          <p className="image-description">{picture.description}</p> {/* Ensure this is rendered properly */}
          <div className="img-info-main">
            <button className={`follow-btn ${picture.followers.length === 0 ? 'active' : ''}`} onClick={handleFollow}>
              {picture.followers.includes("user123") ? "Following" : "Follow"} (
              {picture.followers.length})
            </button>
            <button className="tag-btn" onClick={handleTag}>
              Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
