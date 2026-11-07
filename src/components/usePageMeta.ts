import { useEffect } from "react";

const BRAND = "S.C.R.U.B. Robotics";
const HOME_TITLE = `${BRAND} | Clean water, better future`;
const SITE = "https://www.scrubrobotics.in";

function tag(attr: "name" | "property", key: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  return el;
}

function canonicalLink() {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Gives each route its own title, description, share tags and canonical URL (a single-page app
 * otherwise keeps the home page's for every URL), and keeps pages like the 404 out of search results.
 * `title: null` is the home page. Everything is put back when the page unmounts.
 */
export function usePageMeta(title: string | null, description?: string, noindex = false) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${BRAND}` : HOME_TITLE;
    const prevTitle = document.title;
    document.title = fullTitle;

    const touched: [HTMLMetaElement, string][] = [];
    const set = (el: HTMLMetaElement, value: string) => {
      touched.push([el, el.content]);
      el.content = value;
    };
    set(tag("property", "og:title"), fullTitle);
    set(tag("name", "twitter:title"), fullTitle);
    if (description) {
      set(tag("name", "description"), description);
      set(tag("property", "og:description"), description);
      set(tag("name", "twitter:description"), description);
    }
    const url = SITE + (window.location.pathname.replace(/\/+$/, "") || "/");
    set(tag("property", "og:url"), url);
    const canon = canonicalLink();
    const prevCanon = canon.href;
    canon.href = url;

    const robots = noindex ? tag("name", "robots") : null;
    if (robots) robots.content = "noindex";

    return () => {
      document.title = prevTitle;
      touched.reverse().forEach(([el, v]) => (el.content = v));
      canon.href = prevCanon;
      robots?.remove();
    };
  }, [title, description, noindex]);
}
