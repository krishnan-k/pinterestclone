import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../component-css/ImageGrid.css";
import "../component-css/Mainimage.css";
import heart from "../images/heart.svg";
import like from "../images/like.svg";
interface Picture {
  _id: string;
  title: string;
  imageUrl: string;
  likes: number;
  followers: string[];
  description: string;
  tags: string[];
}

const MainImage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [picture, setPicture] = useState<Picture | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/postimage/imagesget/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPicture(data);
        setIsLiked(data.likes.includes("user123"));
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, [id]);

  const handleLike = async () => {
    if (picture) {
      const updatedLikes = isLiked ? picture.likes - 1 : picture.likes + 1;
      setIsLiked(!isLiked);
      setPicture({ ...picture, likes: updatedLikes });

      try {
        await fetch(`http://localhost:5000/api/postimage/like/${picture._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "user123", liked: !isLiked }),
        });
      } catch (error) {
        console.error("Error updating like:", error);
      }
    }
  };

  const handleFollow = () => {
    if (picture) {
      const updatedFollowers = picture.followers.includes("user123")
        ? picture.followers.filter((follower) => follower !== "user123")
        : [...picture.followers, "user123"];
      setPicture({ ...picture, followers: updatedFollowers });

      fetch(`http://localhost:5000/api/postimage/follow/${picture._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123",
        }),
      }).catch((error) =>
        console.error("Error updating follow status:", error)
      );
    }
  };
  if (!picture) return <div>Loading...</div>;

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
            {isLiked ? (
              <>
                <img src={like} alt="like-icon" />
                Like
              </>
            ) : (
              <>
              <img src={heart} alt="liked-icon" />
                
                Like
              </>
            )}
            ({picture.likes})
          </button>
          <h2>{picture.title}</h2>
          <p>{picture.description}</p>
          <div className="tag-list">
            <h3>Tags:</h3>
            {picture.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag},
              </span>
            ))}
          </div>
          <button
            className={`follow-btn ${
              picture.followers.includes("user123") ? "active" : ""
            }`}
            onClick={handleFollow}
          >
            {picture.followers.includes("user123") ? "Following" : "Follow"} (
            {picture.followers.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
