interface FetchedData {
  long?: string;
  code?: string;
}

export const sendLinks = (url: string): Promise<FetchedData[]> => {
  return fetch("https://gotiny.cc/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: url }),
  }).then((res) => res.json());
};
