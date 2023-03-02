import axios from "axios";

const API_URL = "http://localhost:3000";

export async function uploadAudio(
  userId: string,
  movieId: string,
  audioFile: File
): Promise<void> {
  const formData = new FormData();
  formData.append("audio", audioFile);

  try {
    console.log('tentativa de salvar');
    await axios.post(
        
      `${API_URL}/library/audioUpload?userId=${userId}&movieId=${movieId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload audio");
  }
}
