"use client";
import React from "react";
import { X } from "lucide-react";
import { SellFields, queryfields } from "../../../constants";
import { SweetAlerts } from "./common/sweetAlert";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { updateProductAPI } from "../store/slices/productsSlice";

let allErrors: any = {};
function SellItems(props: any) {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    setErrors({});
    allErrors = {};
  }, [props.showSellPanel]);

  const { SweetAlert: SweetAlert } = SweetAlerts("#sellitems");
  const [ButtonText, setButtonText] = React.useState("Save");
  const [loading, setLoader] = React.useState(false);

  function handleOnchange(e: any) {
    props?.setData({ ...props?.Data, [e.target.name]: e.target.value });
    // Clear error message when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  }

  const validateFields = () => {
    let newErrors: any = {};
    if (!props?.Data?.productName)
      newErrors.productName = "Product Name is required";
    if (!props?.Data?.customerName)
      newErrors.customerName = "Customer Name is required";
    if (!props?.Data?.paidAmount)
      newErrors.paidAmount = "Paid Amount is required";

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

  const SellProduct = async (e: any) => {
    setLoader(true);
    setButtonText("");
    delete props?.Data._id;
    e.preventDefault();
    if (!validateFields()) {
      setLoader(false);
      setButtonText("Save");
      return;
    }

    try {
      const response = await fetch("/api/solditems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...props?.Data,
          quantity: "1",
          GUID: generateGUID(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      await UpdateProduct(e);
      SweetAlert("success", "Item Updated Successfully!");
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
    let finalQuantity = (parseInt(props?.Data?.quantity) - 1).toString();
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: props.objectId, quantity: finalQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const updatedProduct = await response.json();

      dispatch(updateProductAPI(updatedProduct));
      //   props.setShowPanel(false);
      //   props?.setData(queryfields);
      //   setErrors({});
      //   allErrors = {};
    } catch {
      (error: any) => {
        console.log(error);
      };
    }
  };

  const [errors, setErrors] = React.useState<any>();

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

          <div
            id="sellitems"
            className="fixed z-9 top-0 right-0 h-full w-96 bg-[#f5f5f5] transition-transform transform translate-x-0 overflow-y-auto border-l"
          >
            <div className="bg-[#f5f5f5] rounded">
              <div className="flex PanelHeading justify-between items-center p-4 bg-gray-800">
                <h2 className="text-lg font-semibold text-white">
                  {props?.Data?.productName}
                </h2>
                <button
                  onClick={() => props.setShowPanel(false)}
                  className="cursor-pointer text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {SellFields && (
                <div className="p-4 PanelFields">
                  {SellFields.map((item, index) => (
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
                            disabled={
                              item.name == "quantity" || item.name == "price"
                            }
                            value={
                              item.name == "quantity"
                                ? "1"
                                : props.Data?.[item.name]
                            }
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
                  onClick={SellProduct}
                  disabled={loading}
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
export default SellItems;
