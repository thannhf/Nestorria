import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { dummyProperties } from "../../assets/data";

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const { user, currency } = useAppContext();

  // get properties of the agency owner
  const getProperties = async () => {
    setProperties(dummyProperties);
  };

  useEffect(() => {
    if (user) {
      getProperties();
    }
  }, [user]);

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl">
      {/* Latest Booking/Sales */}
      <div>
        <div className="flex justify-between flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-secondary border-b-1 border-slate-900/15 rounded-t-xl">
          <h5 className="h5 hidden lg:block">Index</h5>
          <h5 className="h5">Name</h5>
          <h5 className="h5">Address</h5>
          <h5 className="h5">Price</h5>
          <h5 className="h5">Available</h5>
        </div>
        <div>
          {properties.map((property, index) => (
            <div
              key={index}
              className="flex justify-between items-center flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-secondary/5 text-gray-50 medium-14 font-semibold border-b-1 border-slate-900/15"
            >
              <div className="hidden lg:block">{index + 1}</div>
              <div className="flexStart gap-x-2 max-w-64">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-16 rounded-lg"
                  />
                </div>
                <div className="line-clamp-2">{property.title}</div>
              </div>
              <div className="line-clamp-2">{property.address}</div>
              <div>
                {currency}
                {property.price.sale}
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={property.isAvailable}
                  />
                  <div className="w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-secondary transition-colors duration-200" />
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
