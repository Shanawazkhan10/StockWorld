import React, { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const cryptoCoin = [
    "bitcoin",
    "dogecoin",
    "ripple",
    "ethereum",
    "cardano",
    "tether",
    "solana",
    "polkadot",
    // "xrp",
    "pologon",
    "algorand",
    "vechain",
    "polymath",
    "digibyte",
    "monero",
    "dash",
    "status",
    "fantom",
    // "ethereum push notification service",
    // "matic network",
    "1inch",
  ];

  return (
    <WatchListContext.Provider value={{ cryptoCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
