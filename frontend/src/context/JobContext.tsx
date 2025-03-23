import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { filterJobs, searchJobs } from "@/utils/jobUtils";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  posted: string;
  type: string;
  experience: string;
  category: string;
  applyLink: string;
  logo: string;
  source: "linkedin" | "indeed" | "wellfound";
}

export interface JobApplication {
  jobId: string;
  appliedDate: string;
  status: "applied" | "interviewing" | "rejected" | "offered" | "accepted";
  notes?: string;
}

interface JobFilters {
  location: string[];
  type: string[];
  experience: string[];
  category: string[];
  company: string[];
}

interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  savedJobs: Job[];
  appliedJobs: JobApplication[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: JobFilters;
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
  applyToJob: (jobId: string, notes?: string) => void;
  updateApplicationStatus: (
    jobId: string,
    status: JobApplication["status"]
  ) => void;
  updateApplicationNotes: (jobId: string, notes: string) => void;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  getJobById: (id: string) => Job | undefined;
  getApplicationByJobId: (jobId: string) => JobApplication | undefined;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

// Sample data - in a real app, this would come from an API
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Apple",
    location: "San Francisco, CA",
    description:
      "We are looking for a Frontend Developer to join our team. You will be responsible for developing and implementing user interface components using React.js and other frontend technologies.",
    salary: "$120,000 - $150,000",
    posted: "2023-04-15",
    type: "Full-time",
    experience: "Mid-level",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/apple.com",
    source: "linkedin",
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Google",
    location: "Remote",
    description:
      "Join our design team to create beautiful, functional interfaces that delight our users. You will work on product design, user research, and prototyping.",
    salary: "$130,000 - $160,000",
    posted: "2023-04-10",
    type: "Full-time",
    experience: "Senior",
    category: "Design",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/google.com",
    source: "wellfound",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Netflix",
    location: "Los Angeles, CA",
    description:
      "Apply your statistical and mathematical expertise to extract insights from our vast data. You will build models and algorithms to support business decisions.",
    salary: "$140,000 - $180,000",
    posted: "2023-04-05",
    type: "Full-time",
    experience: "Senior",
    category: "Data Science",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/netflix.com",
    source: "indeed",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    description:
      "Help us build and maintain our cloud infrastructure. You will be responsible for deployment, monitoring, and scaling of our systems.",
    posted: "2023-04-01",
    type: "Contract",
    experience: "Mid-level",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/amazon.com",
    source: "linkedin",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "Meta",
    location: "New York, NY",
    description:
      "Drive the development of new features from conception to launch. You will work with engineers, designers, and stakeholders to deliver excellent products.",
    salary: "$150,000 - $180,000",
    posted: "2023-03-25",
    type: "Full-time",
    experience: "Senior",
    category: "Product",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/meta.com",
    source: "wellfound",
  },
  {
    id: "6",
    title: "Backend Developer",
    company: "Spotify",
    location: "Remote",
    description:
      "Build scalable and reliable backend services for our music streaming platform. You will work with Node.js, databases, and cloud technologies.",
    salary: "$110,000 - $140,000",
    posted: "2023-03-20",
    type: "Full-time",
    experience: "Junior",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/spotify.com",
    source: "indeed",
  },
  {
    id: "7",
    title: "Marketing Manager",
    company: "Airbnb",
    location: "San Francisco, CA",
    description:
      "Lead our marketing efforts to drive growth and engagement. You will develop and execute marketing strategies across various channels.",
    salary: "$120,000 - $150,000",
    posted: "2023-03-15",
    type: "Full-time",
    experience: "Mid-level",
    category: "Marketing",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/airbnb.com",
    source: "linkedin",
  },
  {
    id: "8",
    title: "iOS Developer",
    company: "Uber",
    location: "Chicago, IL",
    description:
      "Join our mobile team to build and maintain our iOS app. You will work with Swift, UIKit, and other iOS technologies.",
    posted: "2023-03-10",
    type: "Part-time",
    experience: "Mid-level",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/uber.com",
    source: "wellfound",
  },
  {
    id: "9",
    title: "Machine Learning Engineer",
    company: "Microsoft",
    location: "Redmond, WA",
    description:
      "Join our AI team to develop and deploy machine learning models for our products. You will work with large datasets and build scalable ML solutions.",
    salary: "$130,000 - $170,000",
    posted: "2023-03-05",
    type: "Full-time",
    experience: "Senior",
    category: "Data Science",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/microsoft.com",
    source: "linkedin",
  },
  {
    id: "10",
    title: "UI/UX Designer",
    company: "Canva",
    location: "Remote",
    description:
      "Design beautiful and intuitive user interfaces for our design platform. You will collaborate with product managers and developers to create exceptional user experiences.",
    salary: "$95,000 - $125,000",
    posted: "2023-03-01",
    type: "Full-time",
    experience: "Mid-level",
    category: "Design",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/canva.com",
    source: "wellfound",
  },
  {
    id: "11",
    title: "Technical Writer",
    company: "GitLab",
    location: "Remote",
    description:
      "Create clear, concise documentation for our development platform. You will work with engineers to document features and write technical guides.",
    salary: "$85,000 - $110,000",
    posted: "2023-02-25",
    type: "Full-time",
    experience: "Mid-level",
    category: "Documentation",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/gitlab.com",
    source: "indeed",
  },
  {
    id: "12",
    title: "Android Developer",
    company: "Twitter",
    location: "San Francisco, CA",
    description:
      "Build and maintain our Android application. You will implement new features and ensure high performance and reliability.",
    salary: "$120,000 - $150,000",
    posted: "2023-02-20",
    type: "Full-time",
    experience: "Mid-level",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/twitter.com",
    source: "linkedin",
  },
  {
    id: "13",
    title: "Product Marketing Manager",
    company: "Slack",
    location: "San Francisco, CA",
    description:
      "Develop and execute marketing strategies for our products. You will work with product teams to position and promote our offerings effectively.",
    salary: "$110,000 - $140,000",
    posted: "2023-02-15",
    type: "Full-time",
    experience: "Senior",
    category: "Marketing",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/slack.com",
    source: "wellfound",
  },
  {
    id: "14",
    title: "QA Engineer",
    company: "Adobe",
    location: "San Jose, CA",
    description:
      "Ensure the quality of our software products through manual and automated testing. You will develop test plans and identify bugs before release.",
    salary: "$90,000 - $120,000",
    posted: "2023-02-10",
    type: "Full-time",
    experience: "Junior",
    category: "QA",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/adobe.com",
    source: "indeed",
  },
  {
    id: "15",
    title: "Cloud Solutions Architect",
    company: "IBM",
    location: "Austin, TX",
    description:
      "Design and implement cloud-based solutions for our clients. You will work with AWS, Azure, and Google Cloud to create scalable and secure architectures.",
    salary: "$140,000 - $180,000",
    posted: "2023-02-05",
    type: "Full-time",
    experience: "Senior",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/ibm.com",
    source: "linkedin",
  },
  {
    id: "16",
    title: "Content Strategist",
    company: "HubSpot",
    location: "Boston, MA",
    description:
      "Develop content strategies to engage our audience and drive growth. You will create and optimize content for various channels and measure its effectiveness.",
    salary: "$85,000 - $110,000",
    posted: "2023-02-01",
    type: "Part-time",
    experience: "Mid-level",
    category: "Marketing",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/hubspot.com",
    source: "wellfound",
  },
  {
    id: "17",
    title: "Blockchain Developer",
    company: "Coinbase",
    location: "Remote",
    description:
      "Build and maintain blockchain-based applications and infrastructure. You will work with various cryptocurrencies and implement smart contracts.",
    salary: "$130,000 - $170,000",
    posted: "2023-01-25",
    type: "Contract",
    experience: "Senior",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/coinbase.com",
    source: "indeed",
  },
  {
    id: "18",
    title: "Growth Hacker",
    company: "Shopify",
    location: "Toronto, Canada",
    description:
      "Drive user acquisition and engagement through innovative growth strategies. You will run experiments and analyze data to optimize conversion rates.",
    salary: "$95,000 - $125,000",
    posted: "2023-01-20",
    type: "Full-time",
    experience: "Mid-level",
    category: "Marketing",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/shopify.com",
    source: "linkedin",
  },
  {
    id: "19",
    title: "Site Reliability Engineer",
    company: "Salesforce",
    location: "Chicago, IL",
    description:
      "Ensure the reliability and performance of our cloud infrastructure. You will implement automation, monitoring, and incident response procedures.",
    salary: "$120,000 - $160,000",
    posted: "2023-01-15",
    type: "Full-time",
    experience: "Senior",
    category: "Engineering",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/salesforce.com",
    source: "wellfound",
  },
  {
    id: "20",
    title: "Security Analyst",
    company: "CrowdStrike",
    location: "Austin, TX",
    description:
      "Protect our systems and data from security threats. You will monitor for suspicious activities, perform security assessments, and respond to incidents.",
    salary: "$105,000 - $135,000",
    posted: "2023-01-10",
    type: "Full-time",
    experience: "Mid-level",
    category: "Security",
    applyLink: "https://example.com/apply",
    logo: "https://logo.clearbit.com/crowdstrike.com",
    source: "indeed",
  },
];

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedJobs, setSavedJobs] = useLocalStorage<Job[]>("savedJobs", []);
  const [appliedJobs, setAppliedJobs] = useLocalStorage<JobApplication[]>(
    "appliedJobs",
    []
  );
  const [filters, setFilters] = useState<JobFilters>({
    location: [],
    type: [],
    experience: [],
    category: [],
    company: [],
  });

  // Filter and search jobs whenever filters or search term changes
  const filteredJobs = React.useMemo(() => {
    let result = [...jobs];

    // Apply search
    if (searchTerm) {
      result = searchJobs(result, searchTerm);
    }

    // Apply filters
    result = filterJobs(result, filters);

    return result;
  }, [jobs, searchTerm, filters]);

  // In a real app, we would fetch jobs from an API here
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setJobs(MOCK_JOBS);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const saveJob = (job: Job) => {
    if (!savedJobs.some((savedJob) => savedJob.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const removeJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
  };

  const applyToJob = (jobId: string, notes?: string) => {
    if (!appliedJobs.some((app) => app.jobId === jobId)) {
      const newApplication: JobApplication = {
        jobId,
        appliedDate: new Date().toISOString(),
        status: "applied",
        notes,
      };
      setAppliedJobs([...appliedJobs, newApplication]);
    }
  };

  const updateApplicationStatus = (
    jobId: string,
    status: JobApplication["status"]
  ) => {
    setAppliedJobs(
      appliedJobs.map((app) => (app.jobId === jobId ? { ...app, status } : app))
    );
  };

  const updateApplicationNotes = (jobId: string, notes: string) => {
    setAppliedJobs(
      appliedJobs.map((app) => (app.jobId === jobId ? { ...app, notes } : app))
    );
  };

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: [],
      type: [],
      experience: [],
      category: [],
      company: [],
    });
    setSearchTerm("");
  };

  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  const getApplicationByJobId = (jobId: string) => {
    return appliedJobs.find((app) => app.jobId === jobId);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        savedJobs,
        appliedJobs,
        loading,
        error,
        searchTerm,
        filters,
        saveJob,
        removeJob,
        applyToJob,
        updateApplicationStatus,
        updateApplicationNotes,
        setSearchTerm,
        setFilters: updateFilters,
        resetFilters,
        getJobById,
        getApplicationByJobId,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
