/**
 * The two people on /about.
 *
 * Photos live in /public/photos/team. School marks live in /public/schools.
 * Swap the files in place when new portraits or marks land — the paths
 * stay put so the page doesn't have to change with them.
 */

export type Founder = {
  name: string;
  role: string;
  school: {
    label: string;
    src: string;
  };
  image: {
    src: string;
    alt: string;
  };
  /** First paragraph is the job. The rest is why they know this work. */
  lead: string;
  body: string;
};

export const founders: Founder[] = [
  {
    name: "Aristotle Taylor",
    role: "CEO & Co-Founder",
    school: {
      label: "Stanford MS&E",
      src: "/schools/stanford.png",
    },
    image: {
      src: "/photos/team/aristotle-taylor.jpg",
      alt: "Aristotle Taylor",
    },
    lead: "Leads client strategy, operations methodology, and business development. His background combines Stanford MS&E, hands-on consulting, and time in the field selling AI.",
    body: "Construction and home service were around long before any of that. His father worked as a handyman across roofing, electrical, painting, landscaping, and other residential work, and Aristotle grew up riding along to job sites and customers’ homes. His father was also into computers well before most people saw where they were headed. If the tools Levron builds today had existed then, he probably would’ve been one of the first to use them.",
  },
  {
    name: "Eliya Khajeie",
    role: "CTO & Co-Founder",
    school: {
      label: "UC Irvine CS",
      src: "/schools/uc-irvine.png",
    },
    image: {
      src: "/photos/team/eliya-khajeie.jpg",
      alt: "Eliya Khajeie",
    },
    lead: "Leads system architecture, automation engineering, and full-stack development. He has built and shipped cloud applications, APIs, and automation pipelines end to end, and has also worked on the technical side of a construction company.",
    body: "That experience is reinforced by family exposure to the industry as well — his uncle runs a construction company — so he’s seen both the technical and operational sides of how these businesses work.",
  },
];
