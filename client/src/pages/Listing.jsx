import React, { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Item from "../components/Item";
import { useSearchParams } from "react-router-dom";

const Listing = () => {
  const { properties, searchQuery } = useAppContext();
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: [],
    priceRange: [],
  });

  const [searchParams] = useSearchParams();
  const heroDestination = (searchParams.get("destination") || "")
    .toLowerCase()
    .trim();

  const [selectedSort, setSelectedSort] = useState("");

  const sortOptions = ["Relevant", "Low to High", "High to Low"];

  const propertyTypes = [
    "House",
    "Apartment",
    "Villa",
    "Penthouse",
    "Townhouse",
    "Commercial",
    "Land Plot",
  ];

  const priceRange = [
    "0 to 10000",
    "10000 to 20000",
    "20000 to 40000",
    "40000 to 80000",
  ];

  // toggle filter checkboxes
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[type].push(value);
      } else {
        updated[type] = updated[type].filter((v) => v !== value);
      }
      return updated;
    });
  };

  // Sorting function
  const sortProperties = (a, b) => {
    if (selectedSort === "Low to High") return a.price.sale - b.price.sale;
    if (selectedSort === "High to Low") return b.price.sale - a.price.sale;
    return 0;
  };

  // Price Filter
  const matchesPrice = (property) => {
    if (selectedFilters.priceRange.length === 0) return true;
    return selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(" to ").map(Number);
      return property.price.sale >= min && property.price.sale <= max;
    });
  };

  // Type Filter
  const matchesType = (property) => {
    if (selectedFilters.propertyType.length === 0) return true;
    return selectedFilters.propertyType.includes(property.propertyType);
  };

  // Search filter using header's searchQuery
  const matchesSearch = (property) => {
    if (!searchQuery) return true;
    return (
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Hero destination filter (from hero form -> /listing?destination=...)
  const matchesHeroDestination = (property) => {
    if (!heroDestination) return true;
    return (property.city || "").toLowerCase().includes(heroDestination);
  };

  // Filtered & sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter(
        (p) =>
          matchesType(p) &&
          matchesPrice(p) &&
          matchesSearch(p) &&
          matchesHeroDestination(p)
      )
      .sort(sortProperties);
  }, [properties, selectedFilters, selectedSort, searchQuery, heroDestination]);

  return (
    <div className="bg-gradient-to-r from-[#fffbee] to-white py-16 pt-28">
      <div className="max-padd-container flex flex-col sm:flex-row gap-8 mb-16">
        {/* left side Filters */}
        <div className="bg-secondary/10 ring-1 ring-slate-900/5 p-4 sm:min-w-60 sm:h-[600px] rounded-xl">
          {/* Sort by price */}
          <div className="py-3 mt-4">
            <h5 className="h5 mb-3">Sort By</h5>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-secondary/10 border border-slate-900/10 outline-none text-gray-30 medium-14 h-8 w-full rounded px-2"
            >
              {sortOptions.map((sort, index) => (
                <option key={index} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
          </div>
          {/* Property Type */}
          <div className="py-3 mt-4">
            <h5 className="h5 mb-3">Property Type</h5>
            {propertyTypes.map((type) => (
              <label key={type} className="flex gap-2 medium-14">
                <input
                  type="checkbox"
                  checked={selectedFilters.propertyType.includes(type)}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, type, "propertyType")
                  }
                />
                {type}
              </label>
            ))}
          </div>
          {/* Price Range */}
          <div className="py-3 mt-2">
            <h5 className="h5 mb-3">Price Range</h5>
            {priceRange.map((price) => (
              <label key={price} className="flex gap-2 medium-14">
                <input
                  type="checkbox"
                  checked={selectedFilters.priceRange.includes(price)}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, price, "priceRange")
                  }
                />
                ${price}
              </label>
            ))}
          </div>
        </div>
        {/* right side */}
        <div className="min-h-[97vh] overflow-y-scroll rounded-xl">
          {filteredProperties.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <Item key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20">
              No matches found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
