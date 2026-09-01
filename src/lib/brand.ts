import { industries } from "./industries";

export type NavBrand = "partners" | "construction" | "home_services";

const GROUP_BRANDS: Partial<Record<string, NavBrand>> = {
  construction: "construction",
  "home-services": "home_services",
};

/** Industry hub + trade pages get their vertical lockup in the nav. */
export function navBrandForPath(pathname: string): NavBrand {
  for (const group of industries) {
    const brand = GROUP_BRANDS[group.slug];
    if (!brand) continue;
    if (pathname === group.href || pathname.startsWith(`${group.href}/`)) {
      return brand;
    }
  }
  return "partners";
}
