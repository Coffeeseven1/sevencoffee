export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Canonicalize /admin/ so relative CSS/JS paths resolve from the site root.
    if (url.pathname === "/admin/") {
      url.pathname = "/admin";
      return Response.redirect(url.toString(), 301);
    }

    // Serve the single-page app at /admin while keeping /admin in the address bar.
    if (url.pathname === "/admin") {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(assetUrl.toString(), request));
    }

    return env.ASSETS.fetch(request);
  }
};
