import React from "react";
import { IoMdCloudUpload } from "react-icons/io";

// Define the types for the form data
interface ProductFormData {
  title: string;
  imageUrl: string;
}

const AddImage: React.FC = () => {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast form to HTMLFormElement to access input values
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const imageUrl = (form.elements.namedItem("imageUrl") as HTMLInputElement).value;

    // Validate form fields
    if (title === '' || imageUrl === '') {
      alert('Fill in all fields');
      return;
    }

    // Create the product object to be sent to the backend
    const productObject: ProductFormData = { title, imageUrl };

    // Send data to backend using fetch API
    fetch("http://localhost:5000/api/postimage/imagespost", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productObject)
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Product Added Successfully');
        form.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="pannel">
      <div className="form-control-section">
        <form className="editdashboard" onSubmit={handleSubmit}>
          <div className="form_title mb-3">
            <label className="text-capitalize" htmlFor="title">
              Title
            </label>
            <input
              className="text-capitalize"
              type="text"
              id="title"
              name="title"
              placeholder="Add your title here"
            />
          </div>

          <div className="form_image mb-3">
            <label className="text-capitalize" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              className="text-capitalize"
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Add your image URL here"
            />
          </div>

          <div className="editable-buttons">
            <button
              id="upload"
              className="text-capitalize upload-button shine-effect"
              type="submit"
            >
              <IoMdCloudUpload /> Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImage;