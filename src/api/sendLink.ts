// Define the FetchedData interface to represent the shape of the data received from the API
interface FetchedData {
  long?: string;
  code?: string;
}

// Define the sendLinks function that takes a URL as input and returns a Promise of an array of FetchedData
export const sendLinks = (url: string): Promise<FetchedData[]> => {
  // Send a POST request to the API endpoint with the provided URL as input
  return fetch("https://gotiny.cc/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: url }),
  })
    .then((res) => res.json()) // Parse the response as JSON
    .then((data) => {
      // Assuming the API returns an array of objects with 'long' and 'code' properties
      // (based on the FetchedData interface), we return the data as an array of FetchedData.
      if (Array.isArray(data)) {
        return data as FetchedData[];
      } else {
        // If the API response is not an array, wrap the data in an array and return it.
        return [data as FetchedData];
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      console.error("Error while fetching data:", error);
      // Return an empty array to indicate no data is available in case of an error
      return [];
    });
};
