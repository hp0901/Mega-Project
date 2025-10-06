import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Footer from "../components/common/Footer";
import CourseCard from "../components/core/Catalog/Course_Card";
import { apiConnector } from "../services/apiconnector";
import {  courseEndpoints  } from "../services/apis";
import { getCatalogPageData } from "../services/Operations/pageAndComponntDatas";
import Error from "./Error";

function Catalog() {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();

  const [active, setActive] = useState(1); // 1 = Most Popular, 2 = New
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedFilterId, setSelectedFilterId] = useState("all");

  // Fetch all categories dynamically
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
        setAllCategories(res?.data?.data || []);
      } catch (error) {
        console.log("Could not fetch all categories.", error);
      }
    })();
  }, []);

  // Fetch all courses
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API);
        setAllCourses(res?.data?.data || []);
        setFilteredCourses(res?.data?.data || []);
      } catch (error) {
        console.log("Could not fetch all courses.", error);
      }
    })();
  }, []);

  // Fetch Category ID for specific catalogName
  useEffect(() => {
    if (!catalogName) return;
    const category = allCategories.find(
      (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
    );
    if (category) setCategoryId(category._id);
  }, [catalogName, allCategories]);

  // Fetch catalog page data for specific category
  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [categoryId]);

  // Unified filtering function
  const handleFilter = (filterId) => {
    setSelectedFilterId(filterId);

    let filtered = allCourses;

    // If we're on a specific category page, first filter by categoryId
    if (catalogName && categoryId) {
      filtered = allCourses.filter((course) => course.category === categoryId);
    }

    // If filterId is not "all", further filter by selected category
    if (filterId !== "all") {
      filtered = filtered.filter((course) => course.category === filterId);
    }

    // Sorting
    if (active === 1) {
      filtered = filtered.sort((a, b) => b.enrolledCount - a.enrolledCount);
    } else {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredCourses(filtered);
  };

  // Handle Most Popular / New toggle
  const handleActiveChange = (val) => {
    setActive(val);
    handleFilter(selectedFilterId);
  };

  // Spinner while loading
  if (
    loading ||
    (!catalogName && (allCategories.length === 0 || allCourses.length === 0))
  ) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error page for invalid category
  if (catalogName && catalogPageData && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Hero Section for specific category */}
      {catalogName && catalogPageData && (
        <div className="box-content bg-richblack-800 px-4">
          <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
            <p className="text-sm text-richblack-300">
              {`Home / Catalog / `}
              <span className="text-yellow-25">
                {catalogPageData?.data?.selectedCategory?.name}
              </span>
            </p>
            <p className="text-3xl text-richblack-5">
              {catalogPageData?.data?.selectedCategory?.name}
            </p>
            <p className="max-w-[870px] text-richblack-200">
              {catalogPageData?.data?.selectedCategory?.description}
            </p>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="mx-auto max-w-maxContent py-6 px-4 flex gap-4 flex-wrap">
        {/* Always show "All" button */}
        <button
          onClick={() => handleFilter("all")}
          className={`px-4 py-2 rounded ${
            selectedFilterId === "all" ? "bg-yellow-25 text-black" : "bg-richblack-700 text-richblack-5"
          }`}
        >
          All
        </button>

        {/* Dynamically render filters from allCategories */}
        {allCategories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleFilter(cat._id)}
            className={`px-4 py-2 rounded ${
              selectedFilterId === cat._id ? "bg-yellow-25 text-black" : "bg-richblack-700 text-richblack-5"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Most Popular / New Toggle */}
      <div className="mx-auto max-w-maxContent py-4 px-4 flex gap-4 flex-wrap">
        <p
          className={`px-4 py-2 cursor-pointer rounded ${
            active === 1 ? "bg-yellow-25 text-black" : "bg-richblack-700 text-richblack-5"
          }`}
          onClick={() => handleActiveChange(1)}
        >
          Most Popular
        </p>
        <p
          className={`px-4 py-2 cursor-pointer rounded ${
            active === 2 ? "bg-yellow-25 text-black" : "bg-richblack-700 text-richblack-5"
          }`}
          onClick={() => handleActiveChange(2)}
        >
          New
        </p>
      </div>

      {/* Courses Grid */}
      <div className="mx-auto max-w-maxContent py-6 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, i) => (
            <CourseCard key={i} course={course} Height={"h-[400px]"} />
          ))
        ) : (
          <p className="text-richblack-200 col-span-full">
            No courses found in this category.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Catalog;
