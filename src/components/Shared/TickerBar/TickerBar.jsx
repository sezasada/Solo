import React, { useEffect } from 'react';
import './TickerBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function TickerBar({favorites}) {
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
                ...(favorites || []).map((ticker) => ({
                    proName: `NASDAQ:${ticker}`,
                    title: ticker,
                })),
            ],
            showSymbolLogo: true,
            colorTheme: 'dark',
            isTransparent: false,
            displayMode: 'regular',
            locale: 'en',
        });
        const widgetContainer = document.getElementById('ticker-bar-container');
        if (widgetContainer) {
            widgetContainer.appendChild(script);
        }

        return () => {
            const widgetContainer = document.getElementById('ticker-bar-container');
            if (widgetContainer) {
                widgetContainer.innerHTML = '';
            }
        };
    }, [favorites]);
    return (
        <div id="ticker-bar-container" className="ticker-bar-container">
            <div className="tradingview-widget-container__widget tradingview-widget-container__widget--ticker-tape"></div>
        </div>
    );
}

export default TickerBar;
