import React from "react";
import "../styles/CoinFaucetInfo.css";

function CoinFaucetInfo() {
  return (
    <div className="coin-faucet-info">
      <h2>Get COIN on Sepolia Testnet</h2>

      <div className="info-card">
        <div className="info-section">
          <h3>What is COIN?</h3>
          <p>
            Coin (COIN) is a fully-backed stablecoin pegged to the US
            dollar. For this testnet version, you'll need to get test COIN to
            interact with the lottery.
          </p>
        </div>

        <div className="info-section">
          <h3>Steps to Get Test COIN</h3>
          <ol className="steps-list">
            <li>
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>Get Sepolia Testnet ETH</h4>
                <p>
                  First, you need Sepolia ETH to pay for transaction fees. Get
                  it from:
                </p>
                <ul>
                  <li>
                    <a
                      href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Cloud Sepolia Faucet
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sepoliafaucet.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sepolia Faucet
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>Get Test COIN</h4>
                <p>Use the official Paxos COIN faucet to get test tokens:</p>
                <a
                  href="https://faucet.paxos.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faucet-button"
                >
                  Visit COIN Faucet
                </a>
                <p className="note">
                  Note: You may need to connect your wallet on the Paxos faucet
                  website to receive test COIN tokens.
                </p>
              </div>
            </li>

            <li>
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>Add COIN to MetaMask</h4>
                <p>Add the COIN token to your wallet:</p>
                <div className="token-details">
                  <div className="detail-item">
                    <span className="detail-label">Token Address:</span>
                    <span className="detail-value">
                      0x2597aC5685d4887858a2D2ED629b78ce70f2D590
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Token Symbol:</span>
                    <span className="detail-value">COIN</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Decimals:</span>
                    <span className="detail-value">6</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Network:</span>
                    <span className="detail-value">Sepolia</span>
                  </div>
                </div>
                <button
                  className="add-token-button"
                  onClick={() => {
                    window.ethereum.request({
                      method: "wallet_watchAsset",
                      params: {
                        type: "ERC20",
                        options: {
                          address: "0x2597aC5685d4887858a2D2ED629b78ce70f2D590",
                          symbol: "COIN",
                          decimals: 18,
                          image:
                            "https://etherscan.io/token/images/paypalusd_32.png",
                        },
                      },
                    });
                  }}
                >
                  Add to MetaMask
                </button>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="disclaimer">
        <h3>Important Note</h3>
        <p>
          This is for testnet purposes only. These are not real COIN tokens and
          have no monetary value.
        </p>
      </div>
    </div>
  );
}

export default CoinFaucetInfo;
