"use client";

import Projects from "@/components/projects/project";
import { Button } from "@/components/ui/button";
import { IProject } from "@/lib/projectService";
import { getData, urls } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import {ChevronLeft, ChevronRight, SortAsc, SortDesc, Filter, ChevronDown} from "lucide-react";

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
  const [showMobileSortMenu, setShowMobileSortMenu] = useState(false);

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
    setShowMobileSortMenu(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProjects(newPage);
    }
  };

  const getSortLabel = () => {
    const direction = sortOrder === "desc" ? "↓" : "↑";
    return `${sortBy === "date" ? "Date" : "Name"} ${direction}`;
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* Header - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent">
              Projects Portfolio
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 px-4">
              Discover my latest work and technical achievements
            </p>
          </div>

          {/* Controls - Responsive */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">

            {/* Mobile Sort Menu */}
            <div className="sm:hidden w-full relative">
              <button
                  onClick={() => setShowMobileSortMenu(!showMobileSortMenu)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Sort: {getSortLabel()}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${showMobileSortMenu ? 'rotate-180' : ''}`} />
              </button>

              {showMobileSortMenu && (
                  <>
                    <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={() => setShowMobileSortMenu(false)}
                    />
                    <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
                      <div className="p-2">
                        <button
                            onClick={() => handleSortChange("date")}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                sortBy === "date"
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                        >
                          <span>Sort by Date</span>
                          {sortBy === "date" && (
                              sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />
                          )}
                        </button>
                        <button
                            onClick={() => handleSortChange("name")}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                sortBy === "name"
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                        >
                          <span>Sort by Name</span>
                          {sortBy === "name" && (
                              sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
              )}
            </div>

            {/* Desktop Sort Buttons */}
            <div className="hidden sm:flex items-center gap-3">
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

            {/* Results Count */}
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 order-first sm:order-last">
              {pagination.totalItems} project{pagination.totalItems !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Content */}
          {loading ? (
              <div className="flex justify-center items-center py-16 sm:py-20">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
              </div>
          ) : projects.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📂</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">No projects found.</p>
              </div>
          ) : (
              <Projects items={projects} />
          )}

          {/* Pagination - Mobile Optimized */}
          {pagination.totalPages > 1 && (
              <div className="mt-8 sm:mt-12">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

                  {/* Mobile Pagination */}
                  <div className="sm:hidden flex items-center gap-2 w-full">
                    <Button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrevPage || loading}
                        className="flex items-center gap-2 flex-1"
                        variant="outline"
                        size="sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {pagination.currentPage} / {pagination.totalPages}
                      </span>
                    </div>

                    <Button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage || loading}
                        className="flex items-center gap-2 flex-1"
                        variant="outline"
                        size="sm"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Desktop Pagination */}
                  <div className="hidden sm:flex items-center gap-4">
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
                </div>

                <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalItems} total projects
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
