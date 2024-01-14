
export const useSharePost = () => {
  const handleShare = async (link) => {
    if (navigator.share) {
      try {
        await navigator.share({ url: link });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  return { handleShare };
};
