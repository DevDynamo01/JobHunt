import React, { useState } from "react";
import { useJobs, Job, JobApplication } from "@/context/JobContext";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileEdit, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const AppliedJobs = () => {
  const { jobs, appliedJobs, updateApplicationStatus, updateApplicationNotes } =
    useJobs();
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // Get the full job data for each applied job
  const appliedJobsWithData = appliedJobs
    .map((application) => {
      const jobData = jobs.find((job) => job.id === application.jobId);
      return {
        ...application,
        job: jobData,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );

  const handleUpdateStatus = (
    jobId: string,
    status: JobApplication["status"]
  ) => {
    updateApplicationStatus(jobId, status);
  };

  const handleSaveNotes = () => {
    if (activeJob) {
      updateApplicationNotes(activeJob, notes);
      setActiveJob(null);
    }
  };

  const getStatusColor = (status: JobApplication["status"]) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "interviewing":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "offered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "accepted":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  if (appliedJobs.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-2xl font-bold mb-6">Applied Jobs</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-xl mb-2">No applications yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You haven't applied to any jobs yet. Browse jobs and start applying!
          </p>
          <Button href="/jobs" variant="default" className="mt-2" asChild>
            <a href="/jobs">Browse Jobs</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-2xl font-bold mb-6">Applied Jobs</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliedJobsWithData.map(
              ({ jobId, appliedDate, status, notes, job }) => (
                <TableRow key={jobId}>
                  <TableCell className="font-medium">
                    {job?.title || "Unknown Job"}
                  </TableCell>
                  <TableCell>{job?.company || "Unknown Company"}</TableCell>
                  <TableCell>
                    {format(new Date(appliedDate), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(status)
                      )}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setActiveJob(jobId);
                            setNotes(notes || "");
                          }}
                        >
                          <FileEdit className="h-4 w-4 mr-1" />
                          {notes ? "Edit Notes" : "Add Notes"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Application Notes</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Textarea
                            value={notes || ""}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add your notes about this application..."
                            className="min-h-[150px]"
                          />
                          <Button onClick={handleSaveNotes}>Save Notes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select
                        defaultValue={status}
                        onValueChange={(value) =>
                          handleUpdateStatus(
                            jobId,
                            value as JobApplication["status"]
                          )
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="interviewing">
                            Interviewing
                          </SelectItem>
                          <SelectItem value="offered">Offered</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>

                      {job && (
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center p-1 hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobs;
