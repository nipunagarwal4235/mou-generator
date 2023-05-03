import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import BmlLogo from "../assets/bml-color-logo.svg";

const InvoiceModal = ({ isOpen, setIsOpen, invoiceInfo }) => {
  function closeModal() {
    setIsOpen(false);
  }

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`MoU-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-4xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-4" id="print">
                <img
                  src={BmlLogo}
                  alt="BML Logo"
                  className="mx-auto h-40 w-40"
                />
                <h1 className="p-8 text-center text-lg font-bold text-gray-900">
                  Memorandum of Understanding between {invoiceInfo.cashierName}{" "}
                  and {invoiceInfo.customerName}
                </h1>
                <p className="text-md text-center text-gray-800">
                  This Agreement has been entered into on {invoiceInfo.today}{" "}
                  between {invoiceInfo.cashierName} situated in{" "}
                  {invoiceInfo.party1Address} and {invoiceInfo.customerName}{" "}
                  situated in {invoiceInfo.party2Address}
                </p>
                <div className="mt-6">
                  <div className="mb-4 grid grid-cols-2">
                    <span className="font-bold">MoU Number:</span>
                    <span>{invoiceInfo.invoiceNumber}</span>
                    <span className="font-bold">Party 1:</span>
                    <span>{invoiceInfo.cashierName}</span>
                    <span className="font-bold">Party 2:</span>
                    <span>{invoiceInfo.customerName}</span>
                  </div>
                  <div className="p-10">
                    <h1 className="text-md text-left font-bold text-gray-700">
                      TERMINATION{" "}
                    </h1>
                    <p>
                      This MOU, unless extended by mutual written agreement of
                      the parties, shall expire 6 months after the effective
                      date specified in the opening paragraph. This MOU may be
                      amended or terminated earlier by mutual written agreement
                      of the parties at any time. Either party shall have the
                      right to unilaterally terminate this MOU upon 7 days prior
                      written notice to the other party. In the event of a
                      dispute arising that the parties themselves cannot
                      resolve, the parties agree to refer the matter to an
                      independent arbitrator appointed by mutual agreement. If
                      the parties cannot agree on an arbitrator, or both parties
                      do not agree with the decision of the arbitrator
                      appointed, the agreement may be terminated in the
                      following manner.
                      <ol className="list-none p-6">
                        <li>
                          A. During the event, the vendor is responsible for
                          failure of any equipment and is liable to replace the
                          equipment during the timeline of the event itself.
                        </li>
                        <li>
                          B. If the breach is one that can be rectified, then
                          the non-breaching party can request in writing that
                          the breach be rectified in 14 days. If the breach is
                          not rectified within that time, the non-breaching
                          party may terminate the Agreement immediately.
                        </li>
                        <li>
                          C. If the breach is one that cannot be rectified, the
                          non-breaching party may terminate the Agreement by
                          giving 7 days written notice of their intention to
                          terminate.
                        </li>
                        <li>
                          D. If either party goes into liquidation, is wound up,
                          dissolved (except for the c. purpose of reconstruction
                          or amalgamation), the other party may terminate the
                          Agreement by giving 7 days written notice of their
                          intention to terminate.
                        </li>
                        <li>
                          E. Where one party is unable to carry out its
                          obligations under this agreement due to circumstances
                          beyond its control or which it could not have
                          prevented, those TV-5 obligations are suspended whilst
                          those circumstances continue, provided the other party
                          is notified and the first party uses its best
                          endeavors to overcome the circumstances preventing its
                          obligations from being carried out.
                        </li>
                      </ol>
                    </p>
                    <h1 className="text-md text-left font-bold text-gray-700">
                      RELATIONSHIP{" "}
                    </h1>
                    Nothing in this MOU shall be construed to make either party
                    a partner, an agent or legal representative of the other for
                    any purpose.
                    <h1 className="text-md text-left font-bold text-gray-700">
                      ASSIGNMENT{" "}
                    </h1>
                    It is understood by the Parties herein, this MOU is based on
                    the professional competence and expertise of each party and
                    hence neither Party shall transfer or assign this agreement,
                    or rights or obligations arising hereunder, either wholly or
                    in part, to any third party.
                    <h1 className="text-md text-left font-bold text-gray-700">
                      SIGNED IN{" "}
                    </h1>
                    DUPLICATE This MOU is executed in duplicate with each copy
                    being an official version of the Agreement and having equal
                    legal validity. BY SIGNING BELOW, the parties, acting by
                    their duly authorized officers, have caused this Memorandum
                    of Understanding to be executed, effective as of the day and
                    year first above written.
                    <div className="grid grid-cols-2 gap-8 pt-8">
                      <div>
                        <h1 className="text-md text-left font-bold text-gray-700">
                          On behalf of {invoiceInfo.cashierName}
                        </h1>
                        <div className="grid-rows grid">
                          <div>
                            <span className="font-bold">Name:</span>
                            <span>{invoiceInfo.party1Authority}</span>
                          </div>
                          <div>
                            <span className="font-bold">Designation:</span>
                            <span>{invoiceInfo.party1Designation}</span>
                          </div>
                          <div>
                            <span className="font-bold">Signature:</span>
                            <span>{invoiceInfo.party1Signature}</span>
                          </div>
                          <div>
                            <span className="font-bold">Date:</span>
                            <span>{invoiceInfo.today}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-md text-left font-bold text-gray-700">
                          On behalf of {invoiceInfo.customerName}
                        </h1>
                        <div className="grid-rows grid">
                          <div>
                            <span className="font-bold">Name:</span>
                            <span>{invoiceInfo.party2Authority}</span>
                          </div>
                          <div>
                            <span className="font-bold">Designation:</span>
                            <span>{invoiceInfo.party2Designation}</span>
                          </div>
                          <div>
                            <span className="font-bold">Signature:</span>
                            <span>{invoiceInfo.party2Signature}</span>
                          </div>
                          <div>
                            <span className="font-bold">Date:</span>
                            <span>{invoiceInfo.today}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
