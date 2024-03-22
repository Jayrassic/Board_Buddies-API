# Board Buddies Backend

## Technical Overview

The backend of Board Buddies is written in Node.js using the Express framework. CRUD data is managed via MongoDB via mongoose.js. Login credentials are handled via JWT.

## Goals

The goal of this project was to be able to add CRUD capabilities to the Board Buddies app as well as authorize users access and to manage their games list.

## Notes

Although the BoardGameGeek [API](https://boardgamegeek.com/wiki/page/BGG_XML_API2) used in the frontend gives a lot of information, most of it is irrelevant for what this project needed. What is stored is a curated amount of data needed to show what games are available to play for the eventual sorting of information that takes place on the frontend.

Authorization is handled with JWT stored in localstorage. When a route is authorization limited, it will be processed by the backend before allowing access to said page.
