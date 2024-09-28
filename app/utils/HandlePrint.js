"use client";
import { useReactToPrint } from "react-to-print";

export const handlePrint = () => {
  useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
                @page {
                  size: A4 portrait;
                  margin: 20mm;
                }
                body {
                  font-family: Arial, sans-serif;
                }
              `,
  });
};
