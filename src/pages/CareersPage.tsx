import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  TrendingUp,
  Award,
  Heart,
  Users,
  Shield,
  GraduationCap,
  Gift,
  Star,
  ChevronRight,
  X,
  Search,
} from "lucide-react";
import { z } from "zod";

// const jobOpenings = [
//   {
//     id: 1,
//     title: "Sales Executive – JCB Machines",
//     location: "Patna, Bihar",
//     experience: "2-4 Years",
//     type: "fullTime" as const,
//     description:
//       "Drive sales of JCB earthmoving equipment across Bihar. Meet clients, conduct demos, and close deals. Strong knowledge of construction equipment preferred.",
//     requirements: [
//       "Bachelor's degree in any field",
//       "2+ years of B2B sales experience",
//       "Valid driving license",
//       "Excellent communication in Hindi & English",
//     ],
//   },
//   {
//     id: 2,
//     title: "Service Technician – Ashok Leyland",
//     location: "Patna, Bihar",
//     experience: "3-5 Years",
//     type: "fullTime" as const,
//     description:
//       "Perform maintenance and repair of Ashok Leyland commercial vehicles. Diagnose issues, manage service schedules, and ensure customer satisfaction.",
//     requirements: [
//       "ITI / Diploma in Automobile Engineering",
//       "3+ years in commercial vehicle servicing",
//       "Knowledge of BS-VI engine systems",
//       "Willingness to travel within Bihar",
//     ],
//   },
//   {
//     id: 3,
//     title: "Finance & Insurance Executive",
//     location: "Patna, Bihar",
//     experience: "1-3 Years",
//     type: "fullTime" as const,
//     description:
//       "Process vehicle finance applications, coordinate with banks & NBFCs, and handle insurance documentation for customers purchasing vehicles.",
//     requirements: [
//       "Graduate in Commerce / Finance",
//       "Experience with vehicle finance processing",
//       "Knowledge of NBFC and bank loan procedures",
//       "Good documentation skills",
//     ],
//   },
//   {
//     id: 4,
//     title: "Digital Marketing Executive",
//     location: "Patna, Bihar",
//     experience: "1-2 Years",
//     type: "fullTime" as const,
//     description:
//       "Manage social media accounts, create marketing content, run digital ad campaigns, and track leads for the virtual showroom platform.",
//     requirements: [
//       "Degree in Marketing / Mass Communication",
//       "Experience with Meta Ads and Google Ads",
//       "Content creation skills (graphics & video)",
//       "Analytical mindset with reporting skills",
//     ],
//   },
//   {
//     id: 5,
//     title: "Showroom Receptionist",
//     location: "Patna, Bihar",
//     experience: "0-1 Year",
//     type: "fullTime" as const,
//     description:
//       "Welcome and guide visitors, manage incoming calls, schedule appointments, and support the sales team with administrative tasks.",
//     requirements: [
//       "Graduate in any field",
//       "Pleasant personality and communication skills",
//       "Computer proficiency (MS Office)",
//       "Hindi and English fluency",
//     ],
//   },
// ];


const applicationSchema = z.object({
  name: z.string().min(2, "Full name is required"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number"),

  email: z
    .string()
    .email("Enter valid email address"),

  address: z
    .string()
    .min(5, "Address is required"),

  state: z
    .string()
    .min(2, "State is required"),

  district: z
    .string()
    .min(2, "District is required"),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter valid pincode"),

  position: z
    .string()
    .min(2, "Select position"),

  qualification: z
    .string()
    .min(2, "Qualification required"),

  employmentStatus: z
    .string()
    .min(2, "Select employment status"),

  expectedSalary: z
    .string()
    .min(1, "Expected salary required"),

  message: z.string().optional(),
});

const locations = [
  "Arwal", "Patna", "Aurangabad", "Bhojpur", "Buxar", "East Champaran",
  "Gaya", "Gopalganj", "Jehanabad", "Kaimur", "Muzaffarpur", "Nalanda",
  "Nawada", "Rohtas", "Saran", "Sasaram", "Sheikhpura", "Sheohar",
  "Sitamarhi", "Siwan", "Vaishali", "West Champaran", "Others",
];
type ApplicationForm = {
  name: string;
  email: string;
  mobile: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  position: string;
  qualification: string;
  employmentStatus: string;
  expectedSalary: string;
  message: string;
  resumeFile: File | null;
};

const CareersPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
const [formData, setFormData] = useState<ApplicationForm>({
  name: "",
  email: "",
  mobile: "",
  address: "",
  state: "",
  district: "",
  pincode: "",
  position: "",
  qualification: "",
  employmentStatus: "",
  expectedSalary: "",
  message: "",
  resumeFile: null,
});
type FormErrors = {
  name?: string;
  email?: string;
  mobile?: string;
  address?: string;
  state?: string;
  district?: string;
  pincode?: string;
  position?: string;
  qualification?: string;
  employmentStatus?: string;
  expectedSalary?: string;
  message?: string;
  resumeFile?: string;
};
const [errors, setErrors] = useState<FormErrors>({});
  const [jobOpenings, setJobOpenings] = useState<any[]>([]);
useEffect(() => {
  const fetchJobs = async () => {
    try {
    const res = await fetch("https://api.patliputragroup.com/careers/openings/active");
      const data = await res.json();

      if (data?.data) {
        setJobOpenings(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  fetchJobs();
}, []);

const filteredJobs = jobOpenings.filter((job) => {
  const matchesSearch =
    searchQuery === "" ||
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesLocation =
    selectedLocation === "" ||
    job.location?.toLowerCase().includes(selectedLocation.toLowerCase());

  return matchesSearch && matchesLocation;
});
  const [submitting, setSubmitting] = useState(false);

  const whyJoinCards = [
    {
      icon: TrendingUp,
      title: t("careers.whyJoin1Title"),
      desc: t("careers.whyJoin1Desc"),
    },
    {
      icon: Award,
      title: t("careers.whyJoin2Title"),
      desc: t("careers.whyJoin2Desc"),
    },
    {
      icon: Heart,
      title: t("careers.whyJoin3Title"),
      desc: t("careers.whyJoin3Desc"),
    },
    {
      icon: Users,
      title: t("careers.whyJoin4Title"),
      desc: t("careers.whyJoin4Desc"),
    },
  ];

  const benefits = [
    { icon: Shield, label: t("careers.benefit1") },
    { icon: Briefcase, label: t("careers.benefit2") },
    { icon: Star, label: t("careers.benefit3") },
    { icon: GraduationCap, label: t("careers.benefit4") },
    { icon: Gift, label: t("careers.benefit5") },
    { icon: TrendingUp, label: t("careers.benefit6") },
  ];

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrors({});

  //   const result = applicationSchema.safeParse(formData);
  //   if (!result.success) {
  //     const fieldErrors: Record<string, string> = {};
  //     result.error.errors.forEach((err) => {
  //       if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
  //     });
  //     setErrors(fieldErrors);
  //     return;
  //   }

  //   setSubmitting(true);
  //   // Simulate submission
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
  //   setSubmitting(false);

  //   toast({
  //     title: t("careers.successTitle"),
  //     description: t("careers.successMessage"),
  //   });

  //   setFormData({ name: "", email: "", mobile: "", resumeLink: "", message: "" });
  //   setSelectedJob(null);
  // };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const validation = applicationSchema.safeParse(formData);

  if (!validation.success) {
    const fieldErrors: any = {};
    validation.error.errors.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });

    setErrors(fieldErrors);
    return;
  }
  if (!formData.resumeFile) {
setErrors((prev)=>({...prev,resumeFile:"Resume is required"}))
return
}

  if (!selectedJob) return;

  const form = new FormData();

  form.append("jobId", selectedJob._id);
  form.append("name", formData.name);
  form.append("mobile", formData.mobile);
  form.append("email", formData.email);
  form.append("address", formData.address);
  form.append("state", formData.state);
  form.append("district", formData.district);
  form.append("pincode", formData.pincode);
  form.append("position", formData.position);
  form.append("qualification", formData.qualification);
  form.append("employmentStatus", formData.employmentStatus);
  form.append("expectedSalary", formData.expectedSalary);
  form.append("whyShouldWeHire", formData.message);

  if (formData.resumeFile) {
    form.append("resume", formData.resumeFile);
  }

  try {
    setSubmitting(true);

    const res = await fetch(
      "https://api.patliputragroup.com/careers/applications",
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

toast({
  title: "Application Submitted",
  description: "Our HR team will contact you soon.",
});

setFormData({
  name: "",
  email: "",
  mobile: "",
  address: "",
  state: "",
  district: "",
  pincode: "",
  position: "",
  qualification: "",
  employmentStatus: "",
  expectedSalary: "",
  message: "",
  resumeFile: null,
});

setErrors({});
setSelectedJob(null);
  } catch (err: any) {
    toast({
      title: "Error",
      description: err.message || "Failed to submit application",
      variant: "destructive",
    });
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6bTAgMTJ2Nmg2di02aC02em0wIDEydjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-jcb text-jcb-foreground text-sm font-semibold mb-4"
          >
            {t("careers.badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold mb-4"
          >
            {t("careers.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground/70 text-lg max-w-2xl mx-auto"
          >
            {t("careers.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t("careers.whyJoinTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoinCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-jcb/10 flex items-center justify-center mx-auto mb-4">
                  <card.icon className="h-7 w-7 text-jcb" />
                </div>
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Benefits */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {t("careers.benefitsTitle")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 border border-border text-center hover:border-jcb/40 transition-colors"
              >
                <b.icon className="h-8 w-8 text-jcb mx-auto mb-2" />
                <p className="text-sm font-medium">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {t("careers.openingsTitle")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("careers.openingsSubtitle")}
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-primary rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search for jobs by title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-4 h-11 bg-background border-0 rounded-lg text-sm"
                />
              </div>
              <div className="relative sm:w-48">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-11 pl-9 pr-4 bg-background border-0 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <Button
                onClick={() => {}}
                className="bg-jcb text-jcb-foreground hover:bg-jcb/90 h-11 px-5"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {filteredJobs.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No job openings found matching your criteria.</p>
            )}
            {filteredJobs.map((job, i) => (
              <motion.div
              key={job._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {job.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />{job.employmentType}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{job.description}</p>
                {job.qualifications?.length > 0 && (
                      <ul className="mt-3 space-y-1">
            {job.qualifications.map((req: string, ri: number) => (
                          <li key={ri} className="text-sm text-muted-foreground flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-jcb flex-shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => setSelectedJob(job)}
                      className="bg-jcb text-jcb-foreground hover:bg-jcb/90 gap-2"
                    >
                      {t("careers.applyNow")}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative"
          >
            <button
              onClick={() => {
                setSelectedJob(null);
                setErrors({});
              }}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold mb-1">{t("careers.formTitle")}</h3>
            <p className="text-sm text-muted-foreground mb-6">{selectedJob.title}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("careers.nameLabel")}
                </label>
                <Input
                  placeholder={t("careers.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("careers.emailLabel")}
                </label>
                <Input
                  type="email"
                  placeholder={t("careers.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  maxLength={255}
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("careers.mobileLabel")}
                </label>
                <Input
                  placeholder={t("careers.mobilePlaceholder")}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  maxLength={10}
                />
                {errors.mobile && <p className="text-destructive text-xs mt-1">{errors.mobile}</p>}
                <div>
<label className="text-sm font-medium mb-1 block">
Current Address
</label>

<Textarea
rows={3}
value={formData.address}
onChange={(e) =>
setFormData({ ...formData, address: e.target.value })
}
/>

{errors.address && (
<p className="text-destructive text-xs mt-1">{errors.address}</p>
)}
</div>
              </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">

<div>
<label className="text-sm font-medium mb-1 block">State</label>
<Input
value={formData.state}
onChange={(e)=>setFormData({...formData,state:e.target.value})}
/>
{errors.state && <p className="text-destructive text-xs">{errors.state}</p>}
</div>

<div>
<label className="text-sm font-medium mb-1 block">District</label>
<Input
value={formData.district}
onChange={(e)=>setFormData({...formData,district:e.target.value})}
/>
{errors.district && <p className="text-destructive text-xs">{errors.district}</p>}
</div>

<div>
<label className="text-sm font-medium mb-1 block">Pincode</label>
<Input
value={formData.pincode}
onChange={(e)=>setFormData({...formData,pincode:e.target.value})}
/>
{errors.pincode && <p className="text-destructive text-xs">{errors.pincode}</p>}
</div>

</div><div>

<label className="text-sm font-medium mb-1 block">
Position Applying For
</label>

<select
value={formData.position}
onChange={(e)=>setFormData({...formData,position:e.target.value})}
className="w-full border rounded-md h-10 px-3"
>

<option value="">Select Position</option>
<option value="Sales">Sales</option>
<option value="Service">Service</option>
<option value="Technician">Technician</option>
<option value="Electrician">Electrician</option>
<option value="Marketing">Marketing</option>
<option value="Back Office">Back Office</option>
<option value="Accounts">Accounts</option>
<option value="Parts">Parts</option>

</select>

{errors.position && (
<p className="text-destructive text-xs">{errors.position}</p>
)}

</div><div>

<label className="text-sm font-medium mb-1 block">
Highest Qualification
</label>

<Input
value={formData.qualification}
onChange={(e)=>setFormData({...formData,qualification:e.target.value})}
/>

{errors.qualification && (
<p className="text-destructive text-xs">{errors.qualification}</p>
)}

</div><div>

<label className="text-sm font-medium mb-2 block">
Employment Status
</label>

<div className="flex gap-6">

<label className="flex items-center gap-2">

<input
type="radio"
value="Fresher"
checked={formData.employmentStatus==="Fresher"}
onChange={(e)=>setFormData({...formData,employmentStatus:e.target.value})}
/>

Fresher

</label>

<label className="flex items-center gap-2">

<input
type="radio"
value="Currently Employed"
checked={formData.employmentStatus==="Currently Employed"}
onChange={(e)=>setFormData({...formData,employmentStatus:e.target.value})}
/>

Currently Employed

</label>

</div>

{errors.employmentStatus && (
<p className="text-destructive text-xs">{errors.employmentStatus}</p>
)}

</div><div>

<label className="text-sm font-medium mb-1 block">
Expected Salary
</label>

<Input
value={formData.expectedSalary}
onChange={(e)=>setFormData({...formData,expectedSalary:e.target.value})}
/>

{errors.expectedSalary && (
<p className="text-destructive text-xs">{errors.expectedSalary}</p>
)}

</div>
              

              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("careers.resumeLabel")}
                </label>
     <Input
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={(e) => {
    const file = (e.target as HTMLInputElement).files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      resumeFile: file,
    }));
  }}
/>
            {errors.resumeFile && (
  <p className="text-destructive text-xs mt-1">{errors.resumeFile}</p>
)}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("careers.messageLabel")}
                </label>
                <Textarea
                  placeholder={t("careers.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={1000}
                  rows={4}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-jcb text-jcb-foreground hover:bg-jcb/90"
              >
                {submitting ? t("common.loading") : t("careers.submitApplication")}
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default CareersPage;
