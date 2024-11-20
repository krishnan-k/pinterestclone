// ImageCard.tsx
import React, { useState } from "react";

interface ImageCardProps {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  followers: string[];
  userId: string;
}

const ImageCard: React.FC<ImageCardProps> = ({id,title,imageUrl,likes,followers,userId,}) => {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localFollowers, setLocalFollowers] = useState(followers);
  const [isLiked, setIsLiked] = useState(false); 
  // Like 
  const handleLike = () => {
    if (isLiked) {
      setLocalLikes(localLikes - 1);
    } else {
      setLocalLikes(localLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Follow/unfollow 
  const handleFollow = () => {
    if (localFollowers.includes(userId)) {
      setLocalFollowers(localFollowers.filter((follower) => follower !== userId));
    } else {
      setLocalFollowers([...localFollowers, userId]);
    }
  };

  //Tag
  const handleTag = () => {
    alert(`Tagging image with ID: ${id}`); 
  };

  return (
    <div className="img-card">
      <img src={imageUrl} alt={title} />
      <button className="like-btn" onClick={handleLike}>Like ({localLikes})</button>
      <div className="img-info">
        <div className="img-actions">
          <button className="follow-btn" onClick={handleFollow}>
            {localFollowers.includes(userId) ? "Unfollow" : "Follow"} ({localFollowers.length})
          </button>
          <button className="tag-btn" onClick={handleTag}>Tag</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
