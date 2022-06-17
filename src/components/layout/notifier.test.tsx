import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData } from "test";

import "@testing-library/jest-dom/extend-expect";

import { DEFAULT_NOTIFIER_MESSAGE, Notifier } from "./notifier";

describe("Notifier tests", () => {
  let mockType: string;
  let mockMessage: string;

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <Notifier
          message={mockMessage}
          type={mockType}
        />
      </AppDataContext.Provider>
    );
  };

  describe("Message", () => {
    it("displays expected text if prop is defined", () => {
      mockMessage = "This is a mock message..";

      render(createComponent());

      expect(screen.getByTestId("notifier")).toHaveTextContent(mockMessage);
    });

    it("displays default text if prop is not defined", () => {
      mockMessage = "";

      render(createComponent());

      expect(screen.getByTestId("notifier")).toHaveTextContent(DEFAULT_NOTIFIER_MESSAGE);
    });
  });

  describe("Type", () => {
    it("error", () => {
      mockType = "error";

      render(createComponent());

      expect(screen.getByTestId("error-icon")).toBeInTheDocument();
    });

    it("warning", () => {
      mockType = "warning";

      render(createComponent());

      expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
    });

    it("loading", () => {
      mockType = "loading";

      render(createComponent());

      expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    });

    it("default", () => {
      mockType = "some unknown type";

      render(createComponent());

      expect(screen.getByTestId("default-icon")).toBeInTheDocument();
    });
  });
});