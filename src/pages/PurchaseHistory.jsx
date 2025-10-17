import React, { useEffect, useState } from "react";
import { VscHistory } from "react-icons/vsc";
import { apiConnector } from '../services/apiconnector'
import { toast } from "react-hot-toast";

const PurchaseHistory = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);

  // Fetch purchase history data from backend
  const fetchPurchaseHistory = async () => {
    try {
      setLoading(true);
      // Example endpoint — update according to your backend
      const response = await apiConnector("GET", "/user/purchase-history");
      if (response?.data?.success) {
        setPurchases(response.data.purchases);
      } else {
        toast.error(response.data?.message || "Failed to load purchase history");
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      toast.error("Something went wrong while fetching history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  return (
    <div className="p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <VscHistory className="text-3xl text-yellow-400" />
        <h1 className="text-2xl font-semibold">Purchase History</h1>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : purchases.length === 0 ? (
        <div className="text-gray-400 text-center mt-10">
          You haven't purchased anything yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-gray-800">
              <tr className="text-left text-gray-300">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Course Name</th>
                <th className="py-3 px-4">Purchase Date</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr
                  key={purchase._id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{purchase.courseName}</td>
                  <td className="py-3 px-4">
                    {new Date(purchase.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">${purchase.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        purchase.status === "Completed"
                          ? "bg-green-700 text-green-200"
                          : "bg-yellow-700 text-yellow-200"
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
