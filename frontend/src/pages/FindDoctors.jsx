import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, Star, Award, X } from "lucide-react";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";
import DoctorCard from "../components/DoctorCard"; // Import the DoctorCard component

const FindDoctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    searchParams.get("specialization") || ""
  );
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    experience: "",
    rating: "",
    availability: "",
    gender: "",
    location: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const specializations = [
    "General Physician",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
  ];

  const experienceOptions = ["0-5 years", "5-10 years", "10+ years"];
  const ratingOptions = ["4+ stars", "3+ stars", "All ratings"];
  const availabilityOptions = ["Available today", "Available this week", "All"];
  const genderOptions = ["Male", "Female", "Any"];
  const locationOptions = [
    "Within 5 km",
    "Within 10 km",
    "Within 20 km",
    "Any",
  ];

  useEffect(() => {
    fetchDoctors();
  }, [searchTerm, selectedSpecialization, sortBy, sortOrder, filters]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/doctors", {
        params: {
          search: searchTerm,
          specialization: selectedSpecialization,
          sortBy,
          sortOrder,
          ...filters,
        },
      });

      if (response.data && response.data.status === "OK") {
        setDoctors(response.data.data);
      } else {
        setError("No doctors found");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(error.response?.data?.message || "Failed to fetch doctors");
      toast.error(error.response?.data?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      experience: "",
      rating: "",
      availability: "",
      gender: "",
      location: "",
    });
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Find Your Perfect Doctor
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Connect with top healthcare professionals and receive the care you
            deserve
          </p>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, specialization, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-100 text-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            {/* Specialization Filter */}
            <div className="md:w-64">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Controls */}
            <div className="flex space-x-2">
              <button
                onClick={() => toggleSort("rating")}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  sortBy === "rating"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <Star className="w-4 h-4 mr-1" />
                Rating
              </button>
              <button
                onClick={() => toggleSort("experience")}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  sortBy === "experience"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <Award className="w-4 h-4 mr-1" />
                Experience
              </button>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors text-indigo-700"
            >
              <Filter className="w-5 h-5 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-red-500 mb-4">
              <X className="w-14 h-14 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">{error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No doctors found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;