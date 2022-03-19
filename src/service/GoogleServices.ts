import { SCRIPT_URL } from "../const";

export const upload = (file: any, type: any) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    let rawLog = (reader!!.result!! as string).split(",")[1];
    let dataSend = {
      dataReq: {
        data: rawLog,
        name: file.name,
        type: file.type,
      },
      fname: type,
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(dataSend),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };
};
