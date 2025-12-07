export async function GET() {
  return new Response(JSON.stringify({ message: "Authentication removed" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  return new Response(JSON.stringify({ message: "Authentication removed" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}