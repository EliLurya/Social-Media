import Compressor from "compressorjs";

const compressImage = (file, callback, errorCallback) => {
  new Compressor(file, {
    quality: 0.6,
    success(result) {
      callback(result);
    },
    error(err) {
      if (errorCallback) errorCallback(err);
      else console.error("Compression error:", err.message);
    },
  });
};

export default compressImage;
