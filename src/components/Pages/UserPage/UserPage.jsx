import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import News from "../../Shared/News/News";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import axios from "axios";
import "./UserPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TickerBar from "../../Shared/TickerBar/TickerBar";

function UserPage() {
  const user = useSelector((store) => store.user);
  const earnings = useSelector((store) => store.earningsReducer.earnings);
  const selectedSymbol =
    useSelector((store) => store.earningsReducer.selectedSymbol) || "";
  const selectedPrice = useSelector(
    (store) => store.earningsReducer.selectedPrice
  );
  const selectedStocksNews = useSelector(
    (store) => store.earningsReducer.selectedStocksNews
  );
  const selectedStockData = useSelector(
    (store) => store.earningsReducer.selectedStockData
  );
  const watchlistsTickers = useSelector(
    (store) => store.earningsReducer.watchlistsTickers
  );
  const dispatch = useDispatch();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [symbolInput, setSymbolInput] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [numNewsArticles, setNumNewsArticles] = useState(2);
  const originalNewsLength = selectedStocksNews?.length;

  const favorites = watchlistsTickers.map((stock) => stock.ticker);

  useEffect(() => {
    if (selectedSymbol !== "") {
      setIsLoading(true);
      dispatch({ type: "FETCH_STOCK_NEWS", payload: selectedSymbol });
      setIsLoading(false);
    }
  }, [selectedSymbol]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = event.target.symbolInput.value;
    setIsLoading(true);
    try {
      await Promise.all([dispatch({ type: "SUBMIT_SYMBOL", payload: input })]);
      setSubmitClicked(true);
    } finally {
      setIsLoading(false);
      setSymbolInput("");
    }
  };

  const handleDeleteFavorite = () => {
    dispatch({
      type: "DELETE_FAVORITE",
      payload: { userId: user.id, ticker: selectedSymbol },
    });
  };
  const handleAddFavorite = () => {
    dispatch({ type: "ADD_FAVORITE", payload: selectedSymbol });
  };

  useEffect(() => {
    if (selectedSymbol !== "") {
      setIsLoading(true);
      dispatch({ type: "FETCH_STOCK_NEWS", payload: selectedSymbol });
      setIsLoading(false);
    }
  }, [selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol) {
      setIsLoading(true);
      dispatch({ type: "FETCH_STOCK_DATA", payload: selectedSymbol });
      setIsLoading(false);
    }
  }, [selectedSymbol]);

  const selectedEarnings = earnings.filter(
    (earning) =>
      earning.symbol === selectedSymbol && earning.date.includes(selectedYear)
  );

  const handleChangeYear = (event) => {
    event.preventDefault();
    setSelectedYear(event.target.value);
    dispatch({ type: "FILTER_EARNINGS", payload: event.target.value });
  };

  const handleLoadMoreNews = async () => {
    setIsLoading(true);
    try {
      await dispatch({
        type: "FETCH_MORE_STOCK_NEWS",
        payload: { symbol: selectedSymbol, numArticles: numNewsArticles + 2 },
      });
      const displayedArticles = selectedStocksNews.slice(0, numNewsArticles);
      const newArticles = selectedStocksNews
        .slice(numNewsArticles)
        .filter(
          (article) =>
            !displayedArticles.some(
              (displayedArticle) => displayedArticle.title === article.title
            )
        );
      setNumNewsArticles(numNewsArticles + newArticles.length);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("this is watchticks", watchlistsTickers);
  return (
    <div className="bod">
      <TickerBar favorites={favorites} />
      <div className=".container-fluid">
        <div className="row ">
          <div className="paretn">
            <h3 className="market-watcher">Market Watcher</h3>
          </div>
          <hr />

          <div
            className="row input-row"
            style={{ width: "53%", margin: "0 auto" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="symbol"
                  aria-label="Text input with dropdown button"
                  name="symbolInput"
                  value={symbolInput}
                  onChange={(event) => setSymbolInput(event.target.value)}
                />
                <select
                  className="btn btn-dark mx-2"
                  name="year"
                  id="year"
                  value={selectedYear}
                  onChange={handleChangeYear}
                >
                  <option value="">All</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-12">
            <br />
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "inline-block",
                  minWidth: "10%",
                  display: "flex",
                  flexGrow: "1",
                  marginLeft: "20px",
                  marginBottom: "20px",
                }}
              >
                <FavoritesPage />
              </div>
              {selectedStockData &&
                selectedStockData.length > 0 &&
                selectedSymbol && (
                  <div style={{ display: "inline-block", width: "90%" }}>
                    <div>
                      <div>
                        {selectedStockData.map((info, index) => {
                          return (
                            <div className="stock-data-div">
                              <div key={index} style={{ padding: "10px" }}>
                                <div
                                  style={{
                                    marginRight: "auto",
                                    paddingLeft: "30px",
                                  }}
                                >
                                  <div className="row">
                                    <div className="col-md-6">
                                      <h4>
                                        {info.name} ({selectedSymbol})
                                      </h4>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                      {watchlistsTickers.find(
                                        (ticker) =>
                                          ticker.ticker === selectedSymbol
                                      ) && (
                                        <button
                                          className="btn btn-dark"
                                          onClick={handleDeleteFavorite}
                                        >
                                          Delete from Watchlist
                                        </button>
                                      )}
                                      {!watchlistsTickers.find(
                                        (ticker) =>
                                          ticker.ticker === selectedSymbol
                                      ) && (
                                        <button
                                          className="btn btn-dark"
                                          onClick={handleAddFavorite}
                                        >
                                          Add to Watchlist
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="price-container">
                                      <h3 className="price">{info.price}</h3>
                                      <h4
                                        style={{
                                          color: info.changesPercentage
                                            ? info.changesPercentage > 0
                                              ? "green"
                                              : "red"
                                            : "black",
                                        }}
                                      >
                                        ({info.changesPercentage?.toFixed(2)}%)
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    borderTop: "1px solid grey",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginRight: "auto",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    Year High:
                                  </p>
                                  <p
                                    style={{
                                      marginLeft: "auto",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    {info.yearHigh}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    borderTop: "1px solid grey",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginRight: "auto",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    Year Low:
                                  </p>
                                  <p
                                    style={{
                                      marginLeft: "auto",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    {info.yearLow}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    borderTop: "1px solid grey",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginRight: "auto",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    Market Capitalization:
                                  </p>
                                  <p
                                    style={{
                                      marginLeft: "auto",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    ${info.marketCap.toLocaleString()}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    borderTop: "1px solid grey",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginRight: "auto",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    Earnings Announcement:
                                  </p>
                                  <p
                                    style={{
                                      marginLeft: "auto",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    {info.earningsAnnouncement?.substring(
                                      0,
                                      10
                                    )}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    borderTop: "1px solid grey",
                                    borderBottom: "1px solid grey",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginRight: "auto",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    Today's Volume:
                                  </p>
                                  <p
                                    style={{
                                      marginLeft: "auto",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    {info.volume.toLocaleString()}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    borderTop: "1px solid grey",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginRight: "auto",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    Exchange:
                                  </p>
                                  <p
                                    style={{
                                      marginLeft: "auto",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    {info.exchange?.substring(0, 10)}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    borderTop: "1px solid grey",
                                    borderBottom: "1px solid grey",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginRight: "auto",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    Shares Outstanding:
                                  </p>
                                  <p
                                    style={{
                                      marginLeft: "auto",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    {info.sharesOutstanding.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
            </div>
            {selectedStockData &&
              selectedStockData.length > 0 &&
              selectedSymbol && (
                <>
                  {selectedStockData.map((info, index) => {
                    return (
                      <div key={index}>
                        <div
                          style={{
                            marginLeft: "20px",
                            width: "100%",
                            paddingTop: "20px",
                          }}
                        >
                          <h2
                            style={{ width: "100%" }}
                            className="d-inline-block bg-dark text-white p-2 text-center"
                          >
                            Earnings Reports For: {info.name}
                          </h2>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

            {submitClicked && selectedEarnings.length === 0 ? (
              <div>
                <div class="container">
                  <div class="text-container">
                    <span class="text-animation">
                    Submission confirmed
                    </span>
                    <span class="text-animation">Calculating results, standby</span>
                  </div>
                  <div class="loader-container">
                    <div class="dots-bars-2"></div>
                  </div>
                </div>
              </div>
            ) : (
              <table style={{ border: "1px solid grey", marginLeft: "20px" }}>
                {submitClicked ? (
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid grey",
                          padding: "5px",
                          textAlign: "left",
                        }}
                      >
                        Symbol
                      </th>
                      <th
                        style={{
                          border: "1px solid grey",
                          padding: "5px",
                          textAlign: "left",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          border: "1px solid grey",
                          padding: "5px",
                          textAlign: "left",
                        }}
                      >
                        EPS
                      </th>
                      <th
                        style={{
                          border: "1px solid grey",
                          padding: "5px",
                          textAlign: "left",
                        }}
                      >
                        EPS Estimated
                      </th>
                      <th
                        style={{
                          border: "1px solid grey",
                          padding: "5px",
                          textAlign: "left",
                        }}
                        className="revenue-cell"
                      >
                        Revenue
                      </th>
                      <th
                        style={{
                          border: "1px solid grey",
                          padding: "5px",
                          textAlign: "left",
                        }}
                        className="revenue-cell"
                      >
                        Revenue Estimated
                      </th>
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {selectedEarnings.map((report, index) => {
                    return (
                      <tr key={index}>
                        <td
                          style={{
                            border: "1px solid grey",
                            padding: "5px",
                            textAlign: "left",
                            height: "50px",
                          }}
                        >
                          {report.symbol}
                        </td>
                        <td
                          style={{
                            border: "1px solid grey",
                            padding: "5px",
                            textAlign: "left",
                            height: "50px",
                          }}
                        >
                          {report.date}
                        </td>
                        <td
                          style={{
                            border: "1px solid grey",
                            padding: "5px",
                            textAlign: "left",
                            height: "50px",
                          }}
                        >
                          {report.eps.toFixed(2)}
                        </td>
                        <td
                          style={{
                            border: "1px solid grey",
                            padding: "5px",
                            textAlign: "left",
                            height: "50px",
                          }}
                        >
                          {report.epsEstimated.toFixed(2)}
                        </td>
                        <td
                          style={{
                            border: "1px solid grey",
                            padding: "5px",
                            textAlign: "left",
                            height: "50px",
                          }}
                          className="revenue-cell"
                        >
                          ${report.revenue.toLocaleString()}
                        </td>
                        <td
                          style={{
                            border: "1px solid grey",
                            padding: "5px",
                            textAlign: "left",
                            height: "50px",
                          }}
                          className="revenue-cell"
                        >
                          ${report.revenueEstimated?.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-md-6">
            <div
              style={{
                textAlign: "left",
                paddingLeft: "20px",
                paddingTop: "20px",
                paddingRight: "20px",
              }}
            >
              {selectedStocksNews && selectedStocksNews.length > 0 ? (
                <div
                  style={{ borderLeft: "1px solid grey", paddingLeft: "60px" }}
                >
                  <div>
                    {selectedStocksNews
                      .slice(0, numNewsArticles)
                      .map((article, index) => (
                        <div key={index}>
                          <h3
                            style={{ width: "100%" }}
                            className="d-inline-block bg-dark text-white p-2 text-center"
                          >
                            {article.title}
                          </h3>
                          <img
                            style={{
                              border: "1px solid grey",
                              margin: "0 auto",
                              width: "100%",
                            }}
                            src={article.image}
                            alt={article.title}
                          />
                          <div
                            style={{
                              backgroundColor: "#343434",
                              marginBottom: "20px",
                              padding: "10px",
                            }}
                          >
                            <p
                              style={{
                                fontStyle: "italic",
                                paddingLeft: "5px",
                              }}
                            >
                              Source: {article.site}
                            </p>
                            <h5 style={{ paddingLeft: "5px" }}>
                              {article.text}
                            </h5>
                            <a
                              className="link-danger"
                              style={{ paddingLeft: "5px" }}
                              href={article.url}
                              rel="noreferrer"
                            >
                              find out more
                            </a>
                          </div>
                        </div>
                      ))}
                    {selectedStocksNews?.length > numNewsArticles && (
                      <div>
                        <button onClick={handleLoadMoreNews}>
                          Load More News
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="news text-center">
        <News />
      </div>
    </div>
  );
}

export default UserPage;
