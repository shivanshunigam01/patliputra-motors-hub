import { SeoContentPage } from "@/components/seo/SeoContentPage";

export default function BlogsHubPage() {
  return (
    <SeoContentPage
      path="/blogs"
      title="Blogs – JCB, Truck Business & Contractor Guides Bihar"
      description="Practical Bihar-focused guides: JCB earning, truck business, sand transport, EV ROI, used machine buying checklist."
      h1="Blogs"
      intro="Generic articles nahi — practical Bihar business content. Month 3 mein full cluster publish hoga; abhi cornerstone topics ready hain."
      keywords={["JCB earning Bihar", "Truck business guide", "Contractor machine guide"]}
      sections={[
        {
          heading: "Upcoming content clusters",
          body: "JCB earning & contractor start guides · Truck business (cement/sand/milk) · Switch EV ROI · Used machine inspection & RC transfer.",
        },
        {
          heading: "Abhi useful pages",
          body: "FAQ, EMI calculator, district landing pages aur finance guides pehle se live hain — unse internal linking strong hai.",
        },
      ]}
      relatedLinks={[
        { name: "FAQ", path: "/faq" },
        { name: "EMI Calculator", path: "/emi-calculator" },
        { name: "JCB Patna", path: "/jcb/patna" },
        { name: "Used JCB Patna", path: "/used-jcb/patna" },
      ]}
    />
  );
}
