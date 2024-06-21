import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "./Table";
import AppQueryProvider from "../providers/queryProvider";

const mockData = [
  {
    id: 2,
    startDate: "2020-12-31T03:08:19.146Z",
    days: 18,
    absenceType: "ANNUAL_LEAVE",
    employee: {
      firstName: "Amiah",
      lastName: "Fenton",
      id: "6ebff517-f398-4d23-9ed3-a0f14bfa3858",
    },
    approved: true,
  },
  {
    id: 3,
    startDate: "2022-01-01T13:12:13.562Z",
    days: 14,
    absenceType: "ANNUAL_LEAVE",
    employee: {
      firstName: "Jabez",
      lastName: "Nasser",
      id: "24a9352b-cf35-4e00-b4c9-403546d7bea8",
    },
    approved: true,
  },
  {
    id: 4,
    startDate: "2023-05-08T07:46:20.745Z",
    days: 1,
    absenceType: "ANNUAL_LEAVE",
    employee: {
      firstName: "Jabez",
      lastName: "Nasser",
      id: "24a9352b-cf35-4e00-b4c9-403546d7bea8",
    },
    approved: true,
  },
];

describe("Table Component", () => {
  test("should filter view on name click", () => {
    render(<Table data={mockData} />, { wrapper: AppQueryProvider });

    expect(screen.getAllByText("Jabez Nasser").length).toBe(2);
    expect(screen.getByText("Amiah Fenton")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("Jabez Nasser")[0]);

    expect(screen.getAllByText("Jabez Nasser").length).toBe(2);
    expect(screen.queryByText("Amiah Fenton")).not.toBeInTheDocument();
  });
  test("should return to default view on click of Go Back button", () => {
    render(<Table data={mockData} />, { wrapper: AppQueryProvider });

    fireEvent.click(screen.getAllByText("Jabez Nasser")[0]);

    expect(screen.getAllByText("Jabez Nasser").length).toBe(2);
    expect(screen.queryByText("Amiah Fenton")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Go Back"));

    expect(screen.getAllByText("Jabez Nasser").length).toBe(2);
    expect(screen.getByText("Amiah Fenton")).toBeInTheDocument();
  });
});
