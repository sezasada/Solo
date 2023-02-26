import React, { useEffect } from 'react';
import './TickerBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function TickerBar() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'FOREXCOM:SPXUSD',
          title: 'S&P 500',
        },
        {
          proName: 'BITSTAMP:BTCUSD',
          title: 'Bitcoin',
        },
        {
          proName: 'BITSTAMP:ETHUSD',
          title: 'Ethereum',
        },
        {
          description: 'Apple',
          proName: 'NASDAQ:AAPL',
        },
        {
          description: 'Meta Platforms, Inc',
          proName: 'NASDAQ:META',
        },
        {
          description: 'Google',
          proName: 'NASDAQ:GOOGL',
        },
        {
          description: 'Tesla',
          proName: 'NASDAQ:TSLA',
        },
        {
          description: 'Amazon',
          proName: 'NASDAQ:AMZN',
        },
        {
          description: 'Microsoft',
          proName: 'NASDAQ:MSFT',
        },
        {
          description: ' NVIDIA Corporation ',
          proName: 'NASDAQ:NVDA',
        },
        {
          description: 'Netflix',
          proName: 'NASDAQ:NFLX',
        },
      ],
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: false,
      displayMode: 'regular',
      locale: 'en',
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ticker-bar-container fixed-top">
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget tradingview-widget-container__widget--ticker-tape"></div>
      </div>
    </div>
  );
}

export default TickerBar;