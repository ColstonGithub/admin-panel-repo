import { toast } from "react-toastify";

export const notify = ({ messgae, type }) => {
  return toast(messgae, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2500,
    type: type,
    closeOnClick: true,
    theme: "colored",
  });
};


export const getImagePreview = ({ selectedImage, setPreviewImage }) => {
  const imageReader = new FileReader();

  imageReader.onload = (e) => {
    const image = new Image();
    image.src = e.target.result;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 400;
      canvas.height = 200;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const resizedImage = canvas.toDataURL();
      setPreviewImage(resizedImage);
    };
  };

  imageReader.readAsDataURL(selectedImage);
};
