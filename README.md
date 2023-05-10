# MarketWatcher

## Problem

Viewing earnings reports can be quite a challenge. I often found myself navigating through numerous websites in search of the relevant data I needed. Unfortunately, many of these sites are cluttered with adds and extraneous information, causing distractions and hindering my ability to focus on the task at hand.

## Description

This intuitive application streamlines access to earnings reports, financial data, and news while integrating OpenAI's ChatGPT API for enhanced user experience. Upon account creation, users are welcomed with an engaging screen that guides them to their personalized home screen. Here, they can curate a watchlist of stocks they wish to monitor and analyze.

A central input bar allows users to effortlessly search for companies by name or ticker symbol, selecting the desired option from a convenient dropdown menu. Once submitted, users are presented with comprehensive stock information, including earnings reports and two recent news articles pertaining to the company. A ticker bar at the top of the screen showcases the user's stocks in their watchlist alongside the S&P 500 for easy reference.

Continuously updated news articles at the bottom of the page deliver valuable insights on inflation, CPI, and interest rates. The navigation bar houses a button that directs users to the ChatGPT page, where they can pose questions about company information or any other financial inquiries they might have, fostering a seamless and informative experience.

### Prerequisites

- Node.js
- Express
- Redux
- PostgreSQL (version 14 used in this project)
- App to run your database (Postico was used for this project locally)

### Installation

#### Install Node Packages

- Run npm install
- Run the command npm server and the server will start
- Run the command npm run client and the client will boot up and bring you to the page

#### Create Database

- Create database in management software named solo-project
- Run SQL commands in the database.sql file

### Usage

#### Login/Register

- Users can register on the landing page with their username and password
- Existing users can log in by using their username and password


### Built With

- Javascript
- React
- Node
- Express
- Redux
- HTML/XML
- CSS (Material UI)
- SQL for database
- Financial Modeling Prep Api, NewsApi, and Open AI Api

