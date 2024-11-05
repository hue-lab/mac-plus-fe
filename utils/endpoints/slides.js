export async function getSlides() {
  const res = await fetch(
    process.env.API_HOST +
      "/article?" +
      new URLSearchParams({
        isSlide: true,
      })
  );
  let data = (await res.json()) || [];
  if (data?.data?.length) {
    data.data.forEach((slide) => {
      delete slide.content
    })
  }
  return data;
}

export async function getBannerSlide() {
  const res = await fetch(
    process.env.API_HOST +
      "/article?" +
      new URLSearchParams({
        tags: ["banner"],
      })
  );
  return (await res.json()) || [];
}
