import React, { useState } from 'react';
import { followPicture, likePicture } from '../middleware/Api';


interface PictureProps {
    id: string;
    title: string;
    imageUrl: string;
    likes: number;
    followers: string[];
    userId: string; // Logged-in user's ID
}

const ImageCard: React.FC<PictureProps> = ({ id, title, imageUrl, likes, followers, userId }) => {
    const [likeCount, setLikeCount] = useState<number>(likes);
    const [isFollowing, setIsFollowing] = useState<boolean>(followers.includes(userId));

    // Handle like button click
    const handleLike = async () => {
        try {
            const updatedPicture = await likePicture(id);
            setLikeCount(updatedPicture.likes);
        } catch (error) {
            console.error('Error liking picture:', error);
        }
    };

    // Handle follow button click
    const handleFollow = async () => {
        try {
            const updatedPicture = await followPicture(id, userId);
            setIsFollowing(updatedPicture.followers.includes(userId));
        } catch (error) {
            console.error('Error following picture:', error);
        }
    };

    return (
        <div className="picture-card">
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <div className="actions">
                <button onClick={handleLike}>❤️ Like ({likeCount})</button>
                <button onClick={handleFollow}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    );
};

export default ImageCard;
