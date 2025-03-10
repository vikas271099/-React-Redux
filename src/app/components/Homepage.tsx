"use client";
import * as React from "react";
import { useState } from "react";
import AddProduct from "./AddProduct";
import {Pencil,Trash2,ShoppingCart } from "lucide-react";
import { queryfields } from "../../../constants";
import SellItems from "./Sellitems";
import { SweetAlerts } from "./common/sweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import { RootState, AppDispatch } from "../store/store";

let filteredStock:any = []
const stockData: any = [];
const Homepage = (props:any) => {

  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading, error } = useSelector((state: any) => state.products);
  const [showPanel, setShowPanel] = useState(false);
  const [showSellPanel, setshowSellPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [method, setmethod] = useState("Save");
  const [objectId, setObjectId] = useState("");
  const [Data, setData] = React.useState(queryfields);
  const [isLoadingdots, setisLoading] = useState(false);
  const [allData, setAllData] = useState(stockData);
  const { SweetAlert: SweetAlert } = SweetAlerts(
    "#homepage"
  );

  React.useEffect(() => {
    {props.Items == "sold" ?
      getSoldData() : dispatch(fetchProducts())}

       filteredStock = products?.products?.filter((item: any) =>
        item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  }, [showPanel,dispatch,products]);

  
  async function getSoldData() {
    try {
      const response = await fetch("/api/solditems");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      setAllData(data.products);
      console.log(data.products);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }




  function openAddPanel(method:string, id:any, data:any){
    setShowPanel(true);
    setmethod(method);
    setObjectId(id);
    setData(data);
  }

  function SellProduct(id:any, data:any){
    if(parseInt(data.quantity)>0){
      setshowSellPanel(true);
      setmethod("sold");
      setObjectId(id);
      setData(data);
    }else{
      SweetAlert("info", "Item Out of stock!");
    }
  }

  return (
    <div>
      <main id="homepage">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between headerSearch">
            <div className="mb-4 text-lg font-semibold">{props.Items == "sold" ? "Sold Items" : "Current Stock"}</div>

            <div className="flex items-center w-[40%] gap-[10px] width100p" >
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={() => openAddPanel("Save", "", "")}
                className="width60p cursor-pointer mb-4 w-1/2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                Add a Product
              </button>
            </div>
          </div>

          {/* Stock Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Product Name
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Color
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Storage
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    With Box
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStock?.map((item: any, index: any) => (
                  <tr className="border-b" key={index}>
                    <td className="px-6 py-4">{item.productName}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.color}</td>
                    <td className="px-6 py-4">{item.storage}</td>
                    <td className="px-6 py-4">{item.withBox}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-5 justify-left w-fit">
                         <Pencil className="cursor-pointer text-gray-800" size={20}  onClick={()=>{openAddPanel("update", item._id, item)}}/>
                          {/* <Trash2 className="cursor-pointer text-red-700" size={20} /> */}
                         <ShoppingCart className="cursor-pointer text-green-700" size={20} onClick={()=>{SellProduct( item._id, item)}}/>
                      </div>
                    </td>
                  </tr>
                ))}
                {!isLoadingdots ? (
                  <>
                    {filteredStock?.length === 0 && (
                      <tr>
                        <td className="px-4 py-4 text-center" colSpan={7}>
                          No matching products found
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="px-4 py-4 text-center" colSpan={7}>
                        Loading...
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      
      <AddProduct showPanel={showPanel} setShowPanel={setShowPanel} method={method} objectId={objectId} setData={setData} Data={Data}/>
     
      <SellItems showPanel={showSellPanel} setShowPanel={setshowSellPanel} method={method} objectId={objectId} setData={setData} Data={Data} getData={fetchProducts}/>
    </div>
  );
};
export default Homepage;
