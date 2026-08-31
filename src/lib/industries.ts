/**
 * The industries taxonomy: catch-all groups, each with a handful of
 * tighter sub-pages. Nav.tsx renders this as the "Industries" dropdown,
 * Footer.tsx renders it as a flat link list, and the hub pages use it to
 * cross-link their own children.
 *
 * The group pages stay the catch-all — anyone in construction or home
 * service who doesn't see their trade named below still belongs on the
 * group page. The sub-pages exist where we have something more specific to
 * say, not to imply the group page is thin.
 */

export type IndustryLink = {
  slug: string;
  href: string;
  label: string;
  /** One line, used in nav/footer and as the sub-page's own eyebrow context. */
  eyebrow: string;
};

export type IndustryGroup = {
  slug: string;
  href: string;
  label: string;
  eyebrow: string;
  children: IndustryLink[];
};

export const industries: IndustryGroup[] = [
  {
    slug: "construction",
    href: "/industries/construction",
    label: "Construction",
    eyebrow: "For general contractors, builders & site work",
    children: [
      {
        slug: "general-contractors-design-build",
        href: "/industries/construction/general-contractors-design-build",
        label: "General Contractors & Design-Build",
        eyebrow: "For custom builders, GCs & design-build firms",
      },
      {
        slug: "civil-excavation-site-work",
        href: "/industries/construction/civil-excavation-site-work",
        label: "Civil, Excavation & Site Work",
        eyebrow: "For site work, excavation, grading & heavy civil",
      },
    ],
  },
  {
    slug: "home-services",
    href: "/industries/home-services",
    label: "Home Services",
    eyebrow: "For HVAC, roofing, plumbing & electrical",
    children: [
      {
        slug: "hvac",
        href: "/industries/home-services/hvac",
        label: "HVAC",
        eyebrow: "For HVAC contractors & mechanical shops",
      },
      {
        slug: "roofing",
        href: "/industries/home-services/roofing",
        label: "Roofing",
        eyebrow: "For retail & storm roofing contractors",
      },
      {
        slug: "plumbing",
        href: "/industries/home-services/plumbing",
        label: "Plumbing",
        eyebrow: "For plumbing contractors & emergency service shops",
      },
      {
        slug: "electrical",
        href: "/industries/home-services/electrical",
        label: "Electrical",
        eyebrow: "For electrical contractors & panel/rewire shops",
      },
    ],
  },
];

/**
 * Tax & Accounting — deliberately left out of `industries` so it drops out
 * of the nav dropdown, footer, and the /industries listing without deleting
 * the hub or trade pages themselves. Those pages import this directly
 * instead of looking it up in `industries`.
 */
export const taxIndustry: IndustryGroup = {
  slug: "tax",
  href: "/industries/tax",
  label: "Tax & Accounting",
  eyebrow: "For tax preparers, bookkeepers & accounting firms",
  children: [
    {
      slug: "tax-preparation",
      href: "/industries/tax/tax-preparation",
      label: "Tax Preparation & Planning",
      eyebrow: "For seasonal and year-round tax prep firms",
    },
    {
      slug: "bookkeeping-accounting",
      href: "/industries/tax/bookkeeping-accounting",
      label: "Bookkeeping & Accounting",
      eyebrow: "For bookkeeping & full-service accounting firms",
    },
  ],
};
