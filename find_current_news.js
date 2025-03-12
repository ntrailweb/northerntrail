function findLatestFile() {
  const baseURL = "https://ntrail.org/news/"; // Replace with the actual base URL
  const today = new Date();

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
 
 return `${year}_${month}_${day}.html`;
  }

  function checkFileExists(url) {
    return new Promise((resolve) => {
      fetch(url, { method: 'HEAD' }) // Use HEAD request for efficiency
        .then((response) => {
          resolve(response.ok); // Resolve with true if status is 200-299
        })
        .catch(() => {
          resolve(false); // Resolve with false on error
        });
    });
  }

  async function findExistingFile(currentDate) {
      if (currentDate.getFullYear() < 2020) { //add a safety net, to prevent infinite loops
          return null;
      }
    const fileName = formatDate(currentDate);
    const fileURL = baseURL + fileName;

    if (await checkFileExists(fileURL)) {
      return fileURL;
    } else {
      const previousDay = new Date(currentDate);
      previousDay.setDate(currentDate.getDate() - 1);
      return findExistingFile(previousDay);
    }
  }

  findExistingFile(today).then((existingFileURL) => {
    if (existingFileURL) {
      // Load the found file into your page
      fetch(existingFileURL)
        .then((response) => response.text())
        .then((htmlContent) => {
          document.getElementById("content-area").innerHTML = htmlContent; // Replace "content-area" with your container ID
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    } else {
      console.log("No matching files found.");
    }
  });
}

// Call the function when your page loads
window.onload = findLatestFile;