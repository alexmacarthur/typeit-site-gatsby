module.exports = [
  {
    slug: "typeit_limited",
    friendlySlug: "limited",
    name: "TypeIt - Limited License",
    htmlTitle: "<strong>Limited</strong> Commercial License",
    simpleTitle: "Limited License",
    price: 1900, // must be in cents!
    description:
      "Use TypeIt on a single commercial project. Includes lifetime updates.",
    permissionDescription:
      "You are now eligible to use TypeIt for a single commercial project.",
    licenseLink: "https://typeitjs.com/licenses/download/limited-commercial",
    usageScope: "a single commercial project",
    priceId: process.env.STRIPE_LIMITED_LICENSE_PRICE_ID,
  },
  {
    slug: "typeit_unlimited",
    friendlySlug: "unlimited",
    name: "TypeIt - Unlimited License",
    htmlTitle: "<strong>Unlimited</strong> Commercial License",
    simpleTitle: "Unlimited License",
    price: 4400, // must be in cents!
    description:
      "Unlimited use on any commercial project. Includes lifetime updates.",
    permissionDescription:
      "You are now eligible to use TypeIt commercially for an unlimited number of projects.",
    usageScope: "any number of commercial projects",
    licenseLink: "https://typeitjs.com/licenses/download/unlimited-commercial",
    priceId: process.env.STRIPE_UNLIMITED_LICENSE_PRICE_ID,
  },
];
