export async function GET() {
    return new Response('Hello from Next.js', {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })
}