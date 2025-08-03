import React, { useEffect } from "react";
import { useAppContext } from "../context/contextAPI";
import { API } from "../api/axios";
import { SummaryAPI } from "../api/SummaryAPI";

const InfoPage = () => {
  const { loginDetails, setLoginDetails, token } = useAppContext();

  const handleLoginDetails = async () => {
    try {
      const response = await API({
        ...SummaryAPI.getLoginDetails,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Page", response);
      const { data: responseData } = response;
      if (responseData.success) {
        setLoginDetails(responseData.user);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (token) {
      handleLoginDetails();
    }
  }, [token]);

  console.log(loginDetails);
  return (
    <div className="space-y-4">
      <h1 className="text-center text-xl sm:text-3xl md:text-4xl font-semibold text-violet-800">
        {" "}
        Personal Details
      </h1>
      {loginDetails.map((item, index) => (
        <div key={index}>
          <h1 className="text-xl p-3 text-gray-700">Name: {item.name}</h1>
          <h1 className="text-xl p-3 text-gray-700">Email : {item.email}</h1>
        </div>
      ))}
    </div>
  );
};

export default InfoPage;
