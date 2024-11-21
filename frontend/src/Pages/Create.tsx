import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import "../component-css/create.css";

interface ProductFormData {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const AddImage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleTagAddition = () => {
    if (tagInput.trim() === "") {
      alert("Tag cannot be empty.");
      return;
    }
    if (tags.includes(tagInput.trim())) {
      alert("Tag already exists.");
      return;
    }
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const handleTagRemoval = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !imageUrl) {
      alert("Please fill all fields.");
      return;
    }

    const productObject: ProductFormData = { title, description, imageUrl, tags };

    try {
      const response = await fetch("http://localhost:5000/api/postimage/imagespost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObject),
      });

      if (response.ok) {
        alert("Image added successfully!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setTags([]);
        window.location.href="/"
      } else {
        alert("Error adding image. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pannel">
      <div className="form-control-section">
        <form className="addpannel" onSubmit={handleSubmit}>
          <div className="form_title mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form_image mb-3">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="form_title mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="tag-section">
            <label>Tags</label>
            <div className="tag-input">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
              />
              <button className="adding-tag" type="button" onClick={handleTagAddition}>
                Add Tag
              </button>
            </div>
            <div className="tag-list">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  <span className="tag-content">{tag}
                  <button className="closing-tag" type="button" onClick={() => handleTagRemoval(tag)}>
                    x
                  </button>
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="editable-buttons">
            <button type="submit" className="upload-button shine-effect">
              <IoMdCloudUpload /> Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImage;
