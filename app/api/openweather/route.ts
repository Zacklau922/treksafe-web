// pages/api/weather/route.ts

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "kulim";
  const apiKey = "82ca4e2718d77fd607019f9cd65a6af4";

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    console.log("API Response:", data); // Log API response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching weather data:", error); // Log any errors
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
