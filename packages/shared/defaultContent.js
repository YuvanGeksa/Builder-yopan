export function defaultContent(templateKey) {
  const base = {
    profile: {
      displayName: "",
      description: "",
      avatarUrl: ""
    },
    socials: [],
    links: []
  };

  switch (templateKey) {
    case "bio-links":
      return {
        ...base,
        links: [
          { label: "TikTok", url: "" },
          { label: "WhatsApp", url: "" },
          { label: "Telegram", url: "" },
          { label: "Instagram", url: "" },
          { label: "YouTube", url: "" }
        ]
      };
    case "portfolio":
      return {
        ...base,
        sections: {
          about: "",
          projects: [{ title: "", description: "", url: "" }]
        }
      };
    case "cv":
      return {
        ...base,
        sections: {
          summary: "",
          experience: [{ company: "", role: "", period: "", bullets: [""] }],
          education: [{ school: "", degree: "", period: "" }],
          skills: [""]
        }
      };
    case "business-profile":
      return {
        ...base,
        sections: {
          services: [{ title: "", description: "" }],
          whatsapp: "",
          address: "",
          testimonials: [{ name: "", quote: "" }]
        }
      };
    default:
      return base;
  }
}
