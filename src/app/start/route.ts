const LAT_DESTINATION = "https://krackeddevs.com/lat";

function redirectToLat() {
  return new Response(null, {
    status: 301,
    headers: {
      Location: LAT_DESTINATION,
    },
  });
}

export function GET() {
  return redirectToLat();
}

export function HEAD() {
  return redirectToLat();
}
