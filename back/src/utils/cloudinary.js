import {v2 as cloudinary} from "cloudinary";

export async function uploadImg(filePath){

    return cloudinary.uploader.upload(filePath);

}
