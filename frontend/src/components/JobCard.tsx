import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, MapPin, Clock, ExternalLink } from "lucide-react";
import { useJobs } from "@/context/JobContext";
import {
  formatDate,
  getJobTypeColor,
  getExperienceColor,
  generatePlaceholderImage,
} from "@/utils/jobUtils";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface JobCardProps {
  job: any;
  className?: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, className }) => {
  const { savedJobs, saveJob, removeJob } = useJobs();
  const [imageError, setImageError] = useState(false);

  const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      removeJob(job.id);
      toast({
        title: "Job removed",
        description: `${job.title} has been removed from saved jobs`,
        duration: 3000,
      });
    } else {
      saveJob(job);
      toast({
        title: "Job saved",
        description: `${job.title} has been added to saved jobs`,
        duration: 3000,
      });
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      to={`/job/${job.id}`}
      className={cn(
        "glass-card block overflow-hidden rounded-xl transition-all duration-300 hover-lift",
        className
      )}
    >
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
              <img
                src={
                  imageError ? generatePlaceholderImage(job.company) : job.logo
                }
                alt={`${job.company} logo`}
                onError={handleImageError}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg line-clamp-1">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {job.company}
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveToggle}
            className={cn(
              "flex-shrink-0 p-2 rounded-full transition-all duration-200",
              isSaved
                ? "text-primary bg-primary/10 hover:bg-primary/20"
                : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <Bookmark
              className={cn("w-5 h-5", isSaved ? "fill-primary" : "fill-none")}
            />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{job.location}</span>
          </div>

          {job.salary && (
            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
              {job.salary}
            </p>
          )}

          <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
            <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
            <span>Posted {formatDate(job.posted)}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={cn("pill", getJobTypeColor(job.type))}>
            {job.type}
          </span>
          <span className={cn("pill", getExperienceColor(job.experience))}>
            {job.experience}
          </span>
          <span className="pill bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            {job.category}
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {job.description}
        </p>
      </div>

      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Source: {job.source}
        </div>
        <div className="flex items-center text-primary text-sm font-medium">
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
