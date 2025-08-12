import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../styles/BuyTickets.css";

function BuyTickets({
  lotteryContract,
  coinContract,
  lotteryData,
  refreshData,
  parseCoin,
}) {
  const [numTickets, setNumTickets] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isApproved, setIsApproved] = useState(false);

  const maxTicketsAvailable = 10 - lotteryData.userTickets;
  const totalCost = numTickets;
  const hasSufficientCoin = parseFloat(lotteryData.coinBalance) >= totalCost;

  // Check if COIN is already approved
  useEffect(() => {
    const checkAllowance = async () => {
      if (coinContract && lotteryContract) {
        try {
          const address = await coinContract.signer.getAddress();
          const allowance = await coinContract.allowance(
            address,
            lotteryContract.address
          );
          const amountNeeded = parseCoin(totalCost);
          setIsApproved(allowance.gte(amountNeeded));
        } catch (error) {
          console.error("Error checking allowance:", error);
        }
      }
    };

    checkAllowance();
  }, [coinContract, lotteryContract, totalCost, parseCoin]);

  const handleNumTicketsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= maxTicketsAvailable) {
      setNumTickets(value);
    }
  };

  const handleApprove = async () => {
    if (!coinContract) return;

    setLoading(true);
    setMessage({ text: "Approving COIN...", type: "info" });

    try {
      // Use parseCoin for handling 18 decimals
      const amountToApprove = parseCoin(totalCost);

      const tx = await coinContract.approve(
        lotteryContract.address,
        amountToApprove
      );
      await tx.wait();

      setIsApproved(true);
      setMessage({ text: "COIN approved successfully!", type: "success" });
    } catch (error) {
      console.error("Error approving COIN:", error);
      setMessage({
        text: "Failed to approve COIN. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTickets = async () => {
    if (!lotteryContract) return;

    setLoading(true);
    setMessage({ text: "Buying tickets...", type: "info" });

    try {
      const tx = await lotteryContract.buyTickets(numTickets);
      await tx.wait();

      setMessage({
        text: `Successfully purchased ${numTickets} ticket(s)!`,
        type: "success",
      });
      refreshData();
    } catch (error) {
      console.error("Error buying tickets:", error);

      // Check if it might be an approval issue
      if (error.message.includes("allowance")) {
        setMessage({
          text: "Please approve COIN spending first.",
          type: "error",
        });
        setIsApproved(false);
      } else {
        setMessage({
          text: "Failed to buy tickets. Please try again.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Get test COIN function
  const mintTestCoin = async () => {
    if (!coinContract) return;

    setLoading(true);
    setMessage({ text: "Getting test COIN...", type: "info" });

    try {
      // Call the getTokens function on the coin contract
      const tx = await coinContract.getTokens();
      await tx.wait();

      setMessage({
        text: "Successfully received 100 test COIN!",
        type: "success",
      });
      refreshData();
    } catch (error) {
      console.error("Error getting test COIN:", error);
      setMessage({
        text: "Failed to get test COIN. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show COIN Faucet Info if user has no COIN
  if (parseFloat(lotteryData.coinBalance) === 0) {
    return (
      <div className="coin-faucet-popup">
        <div className="coin-faucet-card">
          <h2>You need COIN to participate</h2>
          <p>
            You currently have 0 COIN in your wallet. This is a test
            application, so you can mint some test COIN to get started.
          </p>

          <button
            onClick={mintTestCoin}
            disabled={loading}
            className="mint-coin-button"
          >
            {loading ? "Getting..." : "Get 100 Test COIN"}
          </button>

          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="buy-tickets-container">
      <h1>Buy Lottery Tickets</h1>

      {lotteryData.drawCompleted ? (
        <div className="draw-completed-message">
          <h2>Draw Completed</h2>
          <p>
            This lottery round has already completed. Please wait for the next
            round.
          </p>
        </div>
      ) : lotteryData.userTickets >= 10 ? (
        <div className="max-tickets-message">
          <h2>Maximum Tickets Reached</h2>
          <p>
            You have already purchased the maximum allowed tickets (10) for this
            lottery round.
          </p>
        </div>
      ) : (
        <div className="ticket-purchase-form">
          <div className="ticket-purchase-summary">
            <div className="summary-item">
              <h3>COIN Balance</h3>
              <p>{parseFloat(lotteryData.coinBalance).toFixed(2)}</p>
            </div>

            <div className="summary-item">
              <h3>Tickets Owned</h3>
              <p>{lotteryData.userTickets}/10</p>
            </div>

            <div className="summary-item">
              <h3>Tickets Available</h3>
              <p>{maxTicketsAvailable}</p>
            </div>
          </div>

          <div className="ticket-selection " style={{ textAlign: "center" }}>
            <h3>Select Number of Tickets</h3>
            <div className="ticket-input-wrapper">
              <button
                className="ticket-adjust-btn"
                onClick={() => numTickets > 1 && setNumTickets(numTickets - 1)}
                disabled={numTickets <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={numTickets}
                onChange={handleNumTicketsChange}
                min="1"
                max={maxTicketsAvailable}
                className="ticket-input"
              />
              <button
                className="ticket-adjust-btn"
                onClick={() =>
                  numTickets < maxTicketsAvailable &&
                  setNumTickets(numTickets + 1)
                }
                disabled={numTickets >= maxTicketsAvailable}
              >
                +
              </button>
            </div>
          </div>

          <div className="ticket-cost">
            <h3>Total Cost</h3>
            <p className="cost-value">{totalCost} COIN</p>
            {!hasSufficientCoin && (
              <p className="insufficient-funds">
                Insufficient COIN balance. Visit the COIN faucet to get more
                tokens.
              </p>
            )}
          </div>

          {message.text && (
            <div className={`purchase-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="ticket-actions">
            {!isApproved ? (
              <button
                className="approve-button"
                onClick={handleApprove}
                disabled={loading || !hasSufficientCoin}
              >
                {loading ? "Processing..." : "Approve COIN"}
              </button>
            ) : (
              <button
                className="buy-button"
                onClick={handleBuyTickets}
                disabled={loading || !hasSufficientCoin || !isApproved}
              >
                {loading ? "Processing..." : "Buy Tickets"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyTickets;
