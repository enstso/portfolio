"use client";

import Projects from "@/components/projects/project";
import { Button } from "@/components/ui/button";
import { IProject } from "@/lib/projectService";
import { getData, urls } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, SortAsc, SortDesc } from "lucide-react";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function Project() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.itemsPerPage.toString(),
        sortBy,
        sortOrder
      });

      const res = await getData(`${urls.projectApi}?${params}`);

      if (res?.projects) {
        setProjects(res.projects);
        setPagination(res.pagination);
      } else {
        setProjects([]);
        setPagination(prev => ({ ...prev, totalItems: 0, totalPages: 1 }));
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortOrder, pagination.itemsPerPage]);

  useEffect(() => {
    fetchProjects(1);
  }, [sortBy, sortOrder]);

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProjects(newPage);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent">
              Projects Portfolio
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Discover my latest work and technical achievements
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Sort by:
                        </span>
              <div className="flex gap-2">
                <button
                    onClick={() => handleSortChange("date")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        sortBy === "date"
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                    }`}
                >
                  Date
                  {sortBy === "date" && (
                      sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />
                  )}
                </button>
                <button
                    onClick={() => handleSortChange("name")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        sortBy === "name"
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                    }`}
                >
                  Name
                  {sortBy === "name" && (
                      sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-400">
              {pagination.totalItems} project{pagination.totalItems !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Content */}
          {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
          ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📂</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">No projects found.</p>
              </div>
          ) : (
              <Projects items={projects} />
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
              <div className="mt-12">
                <div className="flex justify-center items-center gap-4">
                  <Button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage || loading}
                      className="flex items-center gap-2"
                      variant="outline"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                      if (pageNum > pagination.totalPages) return null;

                      return (
                          <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              disabled={loading}
                              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                                  pageNum === pagination.currentPage
                                      ? "bg-blue-600 text-white shadow-md"
                                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                              }`}
                          >
                            {pageNum}
                          </button>
                      );
                    })}
                  </div>

                  <Button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage || loading}
                      className="flex items-center gap-2"
                      variant="outline"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalItems} total projects
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
