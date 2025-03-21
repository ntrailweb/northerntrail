const baseURL = "news/"; // Replace with the actual base URL

function checkFileExists(url) {
  return new Promise((resolve) => {
    fetch(url, { method: 'HEAD' })
      .then((response) => {
        if (response.ok) { // Check for successful HTTP status (200-299)
          resolve(true);
        } else {
          resolve(false); // Resolve with false for non-successful status (e.g., 404)
        }
      })
      .catch(() => {
        resolve(false); // Resolve with false for network or other errors
      });
  });
}


function findLatestFile(n) {
  
	const today = new Date();
	const date = new Date();
	var week = date.getDay();
	week = week + n * 7; // 
	
	const current_date = new Date();
	current_date.setDate(date.getDate() - week);
	const year = current_date.getFullYear().toString().slice(-2);
	const month = String(current_date.getMonth() + 1).padStart(2, '0');
	const day = String(current_date.getDate()).padStart(2, '0');
	
	return `${year}_${month}_${day}.html\n`;
}
function fill_list(n)
{
  
  const linkElement = document.getElementById('current');
  linkElement.href = baseURL + findLatestFile(0);
    
  const draftElement = document.getElementById('draft');
  draftElement.href = baseURL + findLatestFile(-1);
  	
  var output = "<p>";
  for(i=1;i<n;i++)
  {
     console.log(i);
	 var file_name = findLatestFile(i);
	 console.log(baseURL + file_name);
	 
 	 output = output + `<a href="` + baseURL + file_name + `">`+ file_name + `</a><br />`;
 		
  }
  output = output + "</p>";
  document.getElementById("list").innerHTML = output; 
}
