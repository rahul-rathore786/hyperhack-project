import React from "react";
import "../styles/Home.css";

function Home({ lotteryData, setPage, isOwner }) {
  // Helper function to truncate address
  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Calculate winner's prize (50% of interest pool)
  const calculateWinnerPrize = () => {
    return (parseFloat(lotteryData.interestPool) * 0.5).toFixed(2);
  };

  // Calculate second winner's prize (30% of interest pool)
  const calculateSecondWinnerPrize = () => {
    return (parseFloat(lotteryData.interestPool) * 0.3).toFixed(2);
  };
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">The First Zero-Loss Lottery</h1>
        <p className="hero-subtitle">
          Buy a lottery ticket with zero risk – if you don’t win, you get your
          money back, because your money is safely used to earn interest, and
          winners are paid from that!
        </p>
        {!lotteryData.drawCompleted ? (
          <button className="cta-button" onClick={() => setPage("buy")}>
            Buy Tickets Now
          </button>
        ) : (
          <button className="cta-button" onClick={() => setPage("claim")}>
            Claim Your Funds
          </button>
        )}
      </div>
      {lotteryData.drawCompleted && lotteryData.winner && (
        <div className="winner-section">
          <h2 className="winner-title">Lottery Winners!</h2>
          <div className="winner-info">
            <div className="winner-card first-place">
              <h3>🏆 First Place Winner</h3>
              <p className="winner-address">
                {truncateAddress(lotteryData.winner)}
              </p>
              <p className="prize-amount">
                Prize: <span>{calculateWinnerPrize()} COIN</span>
              </p>
            </div>
            {lotteryData.secondWinner && (
              <div className="winner-card second-place">
                <h3>🥈 Second Place Winner</h3>
                <p className="winner-address">
                  {truncateAddress(lotteryData.secondWinner)}
                </p>
                <p className="prize-amount">
                  Prize: <span>{calculateSecondWinnerPrize()} COIN</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="lottery-stats">
        <div className="stat-card">
          <h3>Lottery Status</h3>
          <div
            className={`status-badge ${
              lotteryData.drawCompleted ? "completed" : "active"
            }`}
          >
            {lotteryData.drawCompleted ? "Draw Completed" : "Draw Pending"}
          </div>
        </div>

        <div className="stat-card">
          <h3>Total Tickets Sold</h3>
          <div className="stat-value">{lotteryData.totalTickets}</div>
        </div>

        <div className="stat-card">
          <h3>Total Pool Size</h3>
          <div className="stat-value">{lotteryData.totalTickets} COIN</div>
        </div>

        <div className="stat-card">
          <h3>Interest Pool</h3>
          <div className="stat-value highlight">
            {parseFloat(lotteryData.interestPool).toFixed(2)} COIN
          </div>
        </div>
      </div>

      <div className="user-dashboard">
        <h2>Your Dashboard</h2>
        <div className="dashboard-stats">
          <div className="dashboard-card">
            <h3>Your Tickets</h3>
            <div className="dashboard-value">{lotteryData.userTickets}/10</div>
          </div>

          <div className="dashboard-card">
            <h3>Your COIN Balance</h3>
            <div className="dashboard-value">
              {parseFloat(lotteryData.coinBalance).toFixed(2)} COIN
            </div>
          </div>

          {lotteryData.isWinner > 0 && (
            <div className="dashboard-card winner">
              <h3>Winner Status</h3>
              <div className="dashboard-value">
                {lotteryData.isWinner === 1 ? "1st Place! 🏆" : "2nd Place! 🥈"}
              </div>
            </div>
          )}

          {lotteryData.userTickets > 0 &&
            !lotteryData.hasClaimed &&
            lotteryData.drawCompleted && (
              <div className="dashboard-card action">
                <h3>Claim Status</h3>
                <button
                  className="claim-button"
                  onClick={() => setPage("claim")}
                >
                  Claim Available
                </button>
              </div>
            )}

          {lotteryData.userTickets < 10 && !lotteryData.drawCompleted && (
            <div className="dashboard-card action">
              <h3>Tickets Available</h3>
              <button
                className="buy-more-button"
                onClick={() => setPage("buy")}
              >
                Buy More Tickets
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="how-it-works">
        <h2>How NoRiskPot Works</h2>
        <div className="steps-flow">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Buy Tickets</h3>
            <p>Purchase up to 10 tickets at 1 COIN each.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Wait for the Draw</h3>
            <p>The admin adds interest and selects winners.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Your Money Back</h3>
            <p>Everyone gets their initial investment back!</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Win Prizes</h3>
            <p>
              Winners will get the interest Share: 50% for 1st, 30% for 2nd
              place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
