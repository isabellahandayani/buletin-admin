import { ACCESS_TOKEN } from "../const";

export const upload = async (file: any, folder: any) => {
  let result;
  let windowObj = window as any;
  let ResumeableUpload = windowObj.ResumableUploadToGoogleDrive2;
  let resource = {
    file: file,
    accessToken: ACCESS_TOKEN,
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
