// const UserName = "vikas271099";
// const passowrd = "IIvOhDX3ILpKMr6Y";
// export const URL = "mongodb+srv://vikas271099:IIvOhDX3ILpKMr6Y@cluster0.nhm2a.mongodb.net/";

export const queryfields = {
  productName: "",
  category: "Mobiles",
  model: "",
  imei: "",
  quantity: "",
  price: "",
  withBox: "Yes",
  color: "",
  storage: "NA",
  owner: "",
  customerName: "",
  customerMobile: "",
  purchasedFrom: "",
  pendingAmount: "",
  receivedPayment: "",
  paymentMode: "NA",
  remarks: "",
};


export const  pipeline = [
    {
      $match: {
        $and: Object.entries(queryfields)
          .filter(([key, value]) => value !== "") // Ignore empty values
          .map(([key, value]) => ({
            [key]: { $regex: value, $options: "i" }, // Partial match (case-insensitive)
          })),
      },
    },
  ];


export const AddFields =[

{
    name:"productName",
    type:"text",
    isRequired: true,
    tooltip: "",
    displayName:"Product Name",
    placeholder:"Enter Product Name"
},
{
    name:"model",
    type:"text",
    isRequired: true,
    tooltip: "",
    displayName:"Model Number",
    placeholder:"Enter Model Number"
},
{
    name:"category",
    type:"select",
    isRequired: true,
    tooltip: "",
    displayName:"Category",
    placeholder:"Select Category",
    options:[
        {name:'Mobiles', value:'Mobiles'},
        {name:'Electronics', value:'Electronics'},
        {name:'Accessories', value:'Accessories'}
    ]
},
{
    name:"imei",
    type:"text",
    isRequired: false,
    tooltip: "",
    displayName:"IMEI No",
    placeholder:"Enter IMEI No"
},
{
    name:"quantity",
    type:"text",
    isRequired: true,
    tooltip: "",
    displayName:"Quantity",
    placeholder:"Enter Quantity"
},
{
    name:"price",
    type:"text",
    isRequired: true,
    tooltip: "",
    displayName:"Price (₹)",
    placeholder:"Enter Price"
},
{
    name:"withBox",
    type:"select",
    isRequired: false,
    tooltip: "",
    displayName:"With Box",
    placeholder:"Select With Box",
    options:[
        {name:'Yes', value:'Yes'},
        {name:'No', value:'No'}
    ]
},
{
    name:"color",
    type:"text",
    isRequired: false,
    tooltip: "",
    displayName:"Color",
    placeholder:"Enter Color"
},
{
    name:"storage",
    type:"select",
    isRequired: false,
    tooltip: "",
    displayName:"Storage",
    placeholder:"Select Storage",
    options:[
        {name:'Select Storage', value:'NA'},
        {name:'64 GB', value:'64GB'},
        {name:'128 GB', value:'128GB'},
        {name:'256 GB', value:'256GB'},
        {name:'512 GB', value:'512GB'}
    ]
},
{
    name:"paymentMode",
    type:"select",
    isRequired: false,
    tooltip: "",
    displayName:"Payment Mode",
    placeholder:"Select Payment Mode",
    options:[
        {name:'Select Payment Method', value:'NA'},
        {name:'Online', value:'Online'},
        {name:'Cash', value:'Cash'}
    ]
},
{
    name:"remarks",
    type:"note",
    isRequired: false,
    tooltip: "",
    displayName:"Remarks",
    placeholder:"Enter Remarks"
}
]


export const SellFields =[

    {
        name:"productName",
        type:"text",
        isRequired: true,
        tooltip: "",
        displayName:"Product Name",
        placeholder:"Enter Product Name"
    },
    {
        name:"quantity",
        type:"text",
        isRequired: true,
        tooltip: "",
        displayName:"Quantity",
        placeholder:"Enter Quantity"
    },
    {
        name:"price",
        type:"text",
        isRequired: true,
        tooltip: "",
        displayName:"Price (₹)",
        placeholder:"Enter Price"
    },
    {
        name:"paymentMode",
        type:"select",
        isRequired: false,
        tooltip: "",
        displayName:"Payment Mode",
        placeholder:"Select Payment Mode",
        options:[
            {name:'Select Payment Method', value:'NA'},
            {name:'Online', value:'Online'},
            {name:'Cash', value:'Cash'}
        ]
    },
    {
        name:"customerName",
        type:"text",
        isRequired: true,
        tooltip: "",
        displayName:"Customer Name",
        placeholder:"Enter Customer Name"
    },
    {
        name:"customerMobile",
        type:"text",
        isRequired: false,
        tooltip: "",
        displayName:"Customer Contact",
        placeholder:"Enter Customer Contact No."
    },
    {
        name:"paidAmount",
        type:"text",
        isRequired: true,
        tooltip: "",
        displayName:"Paid Amount",
        placeholder:"Enter Paid Amount"
    },
    {
        name:"pendingAmount",
        type:"text",
        isRequired: false,
        tooltip: "",
        displayName:"Pending Amount",
        placeholder:"Enter Pending Amount"
    },
    
    {
        name:"remarks",
        type:"note",
        isRequired: false,
        tooltip: "",
        displayName:"Remarks",
        placeholder:"Enter Remarks"
    },
    
    ]