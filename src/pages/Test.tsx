import { ChangeEvent, useState } from "react";
import { upload } from "../service/GoogleServices";
import { ID } from "../const"

const Test = () => {
  const [image, setImage] = useState<any>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (image) {
		upload(image, ID.CATEGORY);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default Test;
