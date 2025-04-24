import { showErrorToast } from "../../utils/toast";
import "./imageUploader.css";
import { useState } from "react";

type imageSelect = {
  onImageChange: (file:File | null)=> void;
}

export const ImageUploader = ({onImageChange}:imageSelect) => {
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          if (file.type.startsWith("image/")) {
            onImageChange(file);
            setFilePreview(URL.createObjectURL(file));
          } else {
            showErrorToast("Please select a valid image file.");
          }
        }
      };

  return (
    <>
      {filePreview && (
        <div className="file-preview">
          <img src={filePreview} alt="Preview" className="image-preview" />{" "}
        </div>
      )}
      <div className="file-uploader">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-entered-by-user"
        />
      </div>
    </>
  );
};
