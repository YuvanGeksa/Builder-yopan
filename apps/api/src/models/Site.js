import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  label: { type: String, default: "" },
  url: { type: String, default: "" }
}, { _id: false });

const SocialSchema = new mongoose.Schema({
  type: { type: String, default: "" }, // tiktok/wa/telegram/etc
  url: { type: String, default: "" }
}, { _id: false });

const SiteSchema = new mongoose.Schema({
  slug: { type: String, unique: true, index: true },
  templateKey: { type: String, index: true },
  tier: { type: String, enum: ["free", "premium"], default: "free" },
  paymentStatus: { type: String, enum: ["free", "pending", "paid"], default: "free" },

  content: {
    profile: {
      displayName: String,
      description: String,
      avatarUrl: String
    },
    socials: [SocialSchema],
    links: [LinkSchema],
    sections: { type: Object, default: {} }
  },

  adminTokenHash: { type: String }, // stub (hash later)
  latestDeploymentUrl: { type: String, default: "" },
  status: { type: String, enum: ["draft", "provisioning", "live", "error"], default: "draft" }
}, { timestamps: true });

export const Site = mongoose.model("Site", SiteSchema);
