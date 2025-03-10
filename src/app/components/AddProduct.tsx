"use client";
import React from "react";
import { X } from "lucide-react";
import { AddFields, queryfields } from "../../../constants";
import { SweetAlerts } from "./common/sweetAlert";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { addProduct, updateProductAPI } from "../store/slices/productsSlice";

let allErrors: any = {};
function AddProduct(props: any) {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    setErrors({});
    allErrors = {};
  }, [props.showPanel]);
  const [ButtonText, setButtonText] = React.useState(
    props.method == "update" ? "Update" : "Save"
  );
  const { SweetAlert: SweetAlert } = SweetAlerts("#Additems");
  const [loading, setLoader] = React.useState(false);
  const [errors, setErrors] = React.useState<any>();
  function handleOnchange(e: any) {
    props?.setData({ ...props?.Data, [e.target.name]: e.target.value });
    // Clear error message when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  }

  const validateFields = () => {
    let newErrors: any = {};
    if (!props?.Data?.productName)
      newErrors.productName = "Product Name is required";
    if (!props?.Data?.category) newErrors.category = "Category is required";
    if (!props?.Data?.model) newErrors.model = "Model Number is required";
    // if (!props?.Data?.imei) newErrors.imei = "IMEI No. is required";
    if (!props?.Data?.quantity) newErrors.quantity = "Quantity is required";
    if (!props?.Data?.price) newErrors.price = "Price is required";
    // if (!props?.Data?.withBox) newErrors.withBox = "Please select With Box option";

    setErrors(newErrors);
    allErrors = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const SaveProduct = async (e: any) => {
    setLoader(true);
    setButtonText("");
    e.preventDefault();
    if (!validateFields()) {
      setLoader(false);
      setButtonText("Save");
      return;
    }

    const newProduct = { ...props?.Data, GUID: generateGUID() };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      SweetAlert("success", "Item Saved Successfully!");
      dispatch(addProduct(newProduct));
      setLoader(false);
      setButtonText("Save");
      setErrors({});
      allErrors = {};
      setTimeout(() => {
        props.setShowPanel(false);
      }, 2500);
    } catch {
      (error: any) => {
        console.log(error);
      };
    }
  };

  const UpdateProduct = async (e: any) => {
    setLoader(true);
    setButtonText("");
    e.preventDefault();
    if (!validateFields()) {
      setLoader(false);
      setButtonText("Updated");
      return;
    }

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...props?.Data, _id: props.objectId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const updatedProduct = await response.json();

      dispatch(updateProductAPI(updatedProduct));
      SweetAlert("success", "Item Updated Successfully!");
      setLoader(false);
      setButtonText("Update");
      setErrors({});
      allErrors = {};
      // props?.setData(queryfields);
      setTimeout(() => {
        props.setShowPanel(false);
      }, 2500);
    } catch {
      (error: any) => {
        console.log(error);
      };
    }
  };

  return (
    <div>
      {/* Panel code */}
      {props.showPanel && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#242c374f] bg-opacity-50 transition-opacity"
            onClick={() => props.setShowPanel(false)}
          ></div>

          <div className="fixed z-9 top-0 right-0 h-full w-96 bg-[#f5f5f5] transition-transform transform translate-x-0 overflow-y-auto border-l">
            <div className="bg-[#f5f5f5] rounded" id="Additems">
              <div className="flex PanelHeading justify-between items-center p-4 bg-gray-800">
                <h2 className="text-lg font-semibold text-white">
                  {props.method == "update" ? "Update Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => props.setShowPanel(false)}
                  className="cursor-pointer text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {AddFields && (
                <div className="p-4 PanelFields">
                  {AddFields.map((item, index) => (
                    <div key={`field-${index}`} className="mb-2">
                      {item.type === "text" && (
                        <div key={`text-${index}`} className="mb-2">
                          <label
                            className={`${
                              item.isRequired ? "required-label" : ""
                            } fieldLabel text-md`}
                          >
                            {item.displayName}
                          </label>
                          <input
                            value={props.Data?.[item.name]}
                            type={item.type}
                            name={item.name}
                            placeholder={item.placeholder}
                            className="w-full p-2 border rounded mb-1"
                            onChange={handleOnchange}
                          />
                          {allErrors?.[item.name] && (
                            <p className="text-red-500 text-sm">
                              {allErrors[item.name]}
                            </p>
                          )}
                        </div>
                      )}

                      {item.type === "select" && (
                        <div key={`select-${index}`} className="mb-2">
                          <label
                            className={`${
                              item.isRequired ? "required-label" : ""
                            } fieldLabel text-md`}
                          >
                            {item.displayName}
                          </label>
                          <select
                            name={item.name}
                            className="w-full p-2 border rounded mb-1"
                            onChange={handleOnchange}
                            value={props.Data?.[item.name]}
                          >
                            {item.options?.map((option, optionIndex) => (
                              <option
                                key={`option-${index}-${optionIndex}`}
                                value={option.value}
                              >
                                {option.name}
                              </option>
                            ))}
                          </select>
                          {allErrors?.[item.name] && (
                            <p className="text-red-500 text-sm">
                              {allErrors[item.name]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div
                className="flex items-center mb-4 p-4"
                style={{ paddingTop: 0 }}
              >
                <button
                  onClick={
                    props.method == "update" ? UpdateProduct : SaveProduct
                  }
                  className="px-4 py-1.5 w-25 bg-gray-800 mr-2 text-white rounded hover:bg-gray-900 cursor-pointer"
                >
                  {ButtonText}
                  {loading && (
                    <div className={"elementToFadeInAndOut"}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                </button>
                <button
                  onClick={() => props.setShowPanel(false)}
                  className="px-4 py-1.5 bg-[#ffffff] border border-color-gray text-gray-800 rounded hover:bg-[#fefefe] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default AddProduct;
