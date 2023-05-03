import React, { useState } from "react";

import InvoiceModal from "./InvoiceModal";
import Chatbot from "./chatbot/Chatbot.tsx";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [party1Address, setParty1Address] = useState("");
  const [party2Address, setParty2Address] = useState("");
  const [party1Authority, setParty1Authority] = useState("");
  const [party2Authority, setParty2Authority] = useState("");
  const [party1Designation, setParty1Designation] = useState("");
  const [party2Designation, setParty2Designation] = useState("");

  // const [cashierName, setCashierName] = useState("BML Munjal University");
  // const [customerName, setCustomerName] = useState("Unlu");
  // const [party1Address, setParty1Address] = useState("67th Milestone, NH-48, Gurgaon, Haryana 122413");
  // const [party2Address, setParty2Address] = useState("DLF Golf Course Rd, Sector 53, Gurgaon, Haryana, 122001");
  // const [party1Authority, setParty1Authority] = useState("Col. Mohit Bawa");
  // const [party2Authority, setParty2Authority] = useState("John Doe");
  // const [party1Designation, setParty1Designation] = useState("Dean Student Welfare");
  // const [party2Designation, setParty2Designation] = useState("Head External Relations");

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              MoU Number
            </label>
            <input
              required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">
          Memorandum of Understanding
        </h1>
        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <div>
            <label
              htmlFor="cashierName"
              className="text-sm font-bold sm:text-base"
            >
              Party 1:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 1 Name"
              type="text"
              name="cashierName"
              id="cashierName"
              value={cashierName}
              onChange={(event) => setCashierName(event.target.value)}
            />
            <label
              htmlFor="party1Address"
              className="text-sm font-bold sm:text-base"
            >
              Address:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 1 Address"
              type="text"
              name="party1Address"
              id="party1Address"
              value={party1Address}
              onChange={(event) => setParty1Address(event.target.value)}
            />
            <label
              htmlFor="party1Authority"
              className="text-sm font-bold sm:text-base"
            >
              Authority:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 1 Authority"
              type="text"
              name="party1Authority"
              id="party1Authority"
              value={party1Authority}
              onChange={(event) => setParty1Authority(event.target.value)}
            />
            <label
              htmlFor="party1Designation"
              className="text-sm font-bold sm:text-base"
            >
              Designation:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 1 Designation"
              type="text"
              name="party1Designation"
              id="party1Designation"
              value={party1Designation}
              onChange={(event) => setParty1Designation(event.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="customerName"
              className="col-start-2 row-start-1 text-sm font-bold md:text-base"
            >
              Party 2:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 2 Name"
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
            <label
              htmlFor="party2Address"
              className="text-sm font-bold sm:text-base"
            >
              Address:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 2 Address"
              type="text"
              name="party2Address"
              id="party2Address"
              value={party2Address}
              onChange={(event) => setParty2Address(event.target.value)}
            />
            <label
              htmlFor="party2Authority"
              className="text-sm font-bold sm:text-base"
            >
              Authority:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 2 Authority"
              type="text"
              name="party2Authority"
              id="party2Authority"
              value={party2Authority}
              onChange={(event) => setParty2Authority(event.target.value)}
            />
            <label
              htmlFor="party2Designation"
              className="text-sm font-bold sm:text-base"
            >
              Designation:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Party 2 Designation"
              type="text"
              name="party2Designation"
              id="party2Designation"
              value={party2Designation}
              onChange={(event) => setParty2Designation(event.target.value)}
            />
          </div>
        </div>
        <Chatbot />
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review MoU
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              today,
              invoiceNumber,
              cashierName,
              customerName,
              party1Address,
              party2Address,
              party1Authority,
              party2Authority,
              party1Designation,
              party2Designation,
            }}
          />
        </div>
        
      </div>
    </form>
  );
};

export default InvoiceForm;
