import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Bookmark,
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Award,
  Tag,
  DollarSign,
  Calendar,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useJobs } from "@/context/JobContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applicationNotes, setApplicationNotes] = React.useState("");
  const { getJobById, saveJob, savedJobs, applyToJob, getApplicationByJobId } =
    useJobs();

  const job = getJobById(id || "");
  const isJobSaved = savedJobs.some((savedJob) => savedJob.id === id);
  const application = getApplicationByJobId(id || "");
  const hasApplied = !!application;

  if (!job) {
    return (
      <div className="container max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Job not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            The job listing you're looking for doesn't exist or has been
            removed.
          </p>
          <Button asChild>
            <Link to="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveJob = () => {
    saveJob(job);
    toast({
      title: "Job Saved",
      description: "This job has been added to your saved list",
    });
  };

  const handleApplyToJob = () => {
    applyToJob(job.id, applicationNotes);
    toast({
      title: "Application Submitted",
      description: "Your application has been recorded",
    });
    // Navigate to applied jobs page after successful application
    navigate("/applied");
  };

  const sourceColors = {
    linkedin:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    indeed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    wellfound:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 pt-24 pb-16">
      <Link
        to="/jobs"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to job listings
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4 flex-shrink-0">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">{job.title}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                <span className="mr-2">{job.company}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                  {job.source}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            {!isJobSaved ? (
              <Button variant="outline" size="sm" onClick={handleSaveJob}>
                <Bookmark className="w-4 h-4 mr-1" />
                Save
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <Bookmark className="w-4 h-4 mr-1 fill-current" />
                Saved
              </Button>
            )}

            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium"
            >
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Apply Externally
              </Button>
            </a>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {job.location}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Job Type</p>
                <p className="text-gray-600 dark:text-gray-400">{job.type}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Award className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Experience</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {job.experience}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {job.category}
                </p>
              </div>
            </div>

            {job.salary && (
              <div className="flex items-start">
                <DollarSign className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Salary</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {job.salary}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Posted On</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {format(new Date(job.posted), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Job Description</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>

          {hasApplied ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg p-4 flex items-center">
              <CheckCircle className="text-green-600 dark:text-green-400 w-5 h-5 mr-2" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-300">
                  You've already applied to this job
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Applied on{" "}
                  {format(new Date(application.appliedDate), "MMMM d, yyyy")} -
                  Current status:{" "}
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </p>
                <Link
                  to="/applied"
                  className="text-sm font-medium text-green-800 dark:text-green-300 underline"
                >
                  View your application
                </Link>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">
                Track Your Application
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Keep track of your application by using our tracking system. You
                can later update the status and add notes.
              </p>

              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium mb-1"
                >
                  Application Notes (Optional)
                </label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about your application..."
                  value={applicationNotes}
                  onChange={(e) => setApplicationNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={handleApplyToJob} className="w-full sm:w-auto">
                Track This Application
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
