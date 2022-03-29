import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, TOKEN_URL } from "../const";

export const upload = async (file: any, folder: any) => {
  let result;
  let windowObj = window as any;
  let ResumeableUpload = windowObj.ResumableUploadToGoogleDrive2;

  let token = await getToken();

  let resource = {
    file: file,
    accessToken: token.access_token,
    folderId: folder,
  };

  let ru = new ResumeableUpload();

  await ru.Do(resource, (res: any, err: any) => {
    if (err) return;
    if (res.status === "Done") {
      result = res.result;
    }
  });

  return result;
};

export const getToken = async () => {
  let res = await fetch(TOKEN_URL, {
    method: "post",
    body: `client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}&client_id=${CLIENT_ID}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return await res.json();
};
