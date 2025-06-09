import React, { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { Document, Page, pdfjs } from "react-pdf";

// Set the workerSrc to the correct URL
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const EBooks = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const books = [
    {
      id: "b0c3b0c0-eb12-43e7-83cb-c9358dc5d4e9",
      title: "Rich dad Poor dad",
      author: "Robert T. Kiyosaki and Sharon Lechter",
      description:
        "Rich Dad Poor Dad is a 1997 book written by Robert T. Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence.",
      bgColor: null,
      flipDuration: null,
      containerHeight: null,
      autoplayDuration: null,
      forcePageFit: true,
      autoEnableOutline: false,
      autoEnableThumbnail: false,
      overwritePdfOutline: false,
      bookSourceTypeId: 1,
      displayMode: 1,
      hardPageId: 1,
      pdfPageRenderSize: 1,
      autoEnableSound: 1,
      enableDownload: 1,
      pageMode: 1,
      singlePageMode: 1,
      controlsPosition: 1,
      direction: 1,
      enableAutoplay: 1,
      enableAutoplayAutomatically: 1,
      pageSize: 1,
      lessonCategoryLevelId: 1,
      featuredimage: null,
      featuredimagename: null,
      featuredimagepath: null,
      featuredimageurl: null,
      featuredimagecontenttype: null,
      bgimage: null,
      bgimagename: null,
      bgimagepath: null,
      bgimageurl: null,
      bgimagecontenttype: null,
      pdffile: null,
      pdffilename: "rich_dad_poor_dad_g22g.pdf",
      pdffilepath: null,
      pdffileurl:
        "http://api.yasakashi.ir/NewBookfile/b0c3b0c0eb1243e783cbc9358dc5d4e9/rich_dad_poor_dad_g22g.pdf",
      pdffilecontenttype: "application/pdf",
      pdfthumbnailimage: null,
      pdfthumbnailimagename: "richdad_poordad.png",
      pdfthumbnailimagepath: null,
      pdfthumbnailimageurl:
        "http://api.yasakashi.ir/NewBookfile/b0c3b0c0eb1243e783cbc9358dc5d4e9/richdad_poordad.png",
      pdfthumbnailimagecontenttype: "image/png",
      categoryIds: null,
      categories: [
        {
          id: 771,
          parentId: 770,
          name: "A journey of a thousand miles",
          categorytypeid: 14,
          categorytypename: null,
        },
        {
          id: 773,
          parentId: 771,
          name: "Motivation",
          categorytypeid: 14,
          categorytypename: null,
        },
      ],
      pageimages: null,
      pageimagelist: [],
    },
  ];

  return (
    <div className="w-full wrapper">
      {books?.map((book) => (
        <div
          key={book?.id}
          className="border border-gold-light_400 bg-blue-light w-full mx-4 rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between px-4 py-3">
            <h4 className="text-xl font-semibold capitalize hover:underline hover:cursor-pointer">
              {book?.title}
            </h4>
            <span className="w-max bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
              <FaRegFilePdf size={18} className="text-blue-dark" />
            </span>
          </div>
          <div className="flex items-center text-nowrap bg-white min-w-[200px] w-max max-w-[300px] rounded-r-full mb-3 py-1">
            <span className="text-sm text-nowrap font-bold text-gold-light_400 pl-2">
              by :
            </span>
            <span className="text-sm font-normal text-blue-dark px-2 line-clamp-1 mr-2">
              {book?.author}
            </span>
          </div>
        </div>
      ))}
      <div>
        <Document
          file="http://api.yasakashi.ir/NewBookfile/b0c3b0c0eb1243e783cbc9358dc5d4e9/rich_dad_poor_dad_g22g.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ cMapUrl: "cmaps/", cMapPacked: true }}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EBooks;
