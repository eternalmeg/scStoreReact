const CLOUD_NAME = "daosxutfm";
const UPLOAD_PRESET = "scstoreproducts";

export async function uploadToCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Upload failed");

    return data.secure_url;
}
