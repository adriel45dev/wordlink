"use client";
import InfoIcon from "@/public/icons/InfoIcon";
import React, { useEffect, useState } from "react";
import AlertType from "../shared/enums/alert-type.enums";
import CloseIcon2 from "@/public/icons/CloseIcon2";
import Link from "next/link";

enum AlertStyleType {
  Success = "text-green-400",
  Info = "text-blue-400",
  Danger = "text-red-400",
  Warning = "text-yellow-300",
  Dark = "text-gray-300",
}

type AlertDataType = {
  type: AlertType;
  message: string;
  display: boolean;
  link?: {
    label: string;
    href: string;
  };
};

type AlertProps = {
  data: {
    AlertData: AlertDataType;
    setAlertData: React.Dispatch<React.SetStateAction<AlertDataType>>;
  };
};
export default function Alert({ data }: AlertProps) {
  const { type, message, display, link } = data.AlertData;
  const setAlertData = data.setAlertData;

  return (
    display && (
      <div
        id="alert"
        className={`mb-4 flex w-full items-center rounded-lg bg-gray-800 p-4 ${AlertStyleType[type]}`}
        role="alert"
      >
        <InfoIcon />
        <span className="sr-only">{type}</span>
        <div className="ml-3 text-sm font-medium">
          {message}{" "}
          {link && (
            <Link
              href={link.href}
              className="font-semibold underline hover:no-underline"
            >
              {link.label}
            </Link>
          )}
        </div>
        <button
          type="button"
          className={`-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8  items-center justify-center rounded-lg bg-gray-800 p-1.5 focus:ring-2 ${AlertStyleType[type]} hover:bg-gray-700`}
          data-dismiss-target="#alert"
          aria-label="Close"
          onClick={() =>
            setAlertData((prevAlert) => ({ ...prevAlert, display: false }))
          }
        >
          <span className="sr-only">Close</span>
          <CloseIcon2 className="h-3 w-3" />
        </button>
      </div>
    )
  );
}
