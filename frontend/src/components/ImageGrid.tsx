import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import { fetchPictures } from '../middleware/Api';


interface Picture {
    _id: string;
    title: string;
    imageUrl: string;
    likes: number;
    followers: string[];
}

const ImageGrid: React.FC = () => {
    const [pictures, setPictures] = useState<Picture[]>([]);
    const userId = 'user123'; // Replace with logged-in user's ID

    useEffect(() => {
        const loadPictures = async () => {
            try {
                const data = await fetchPictures();
                setPictures(data);
            } catch (error) {
                console.error('Error fetching pictures:', error);
            }
        };

        loadPictures();
    }, []);

    return (
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
            <p></p>
        </div>
    );
};

export default ImageGrid;
