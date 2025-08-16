# Movie Finder

Movie Finder is a web application that allows users to discover and search for movies. It fetches data from The Movie Database (TMDB) API and includes a trending movies feature powered by Appwrite.

## Features

* **Search for movies:** Users can search for movies by title.
* **Trending movies:** The application displays a list of trending movies.
* **Movie details:** Users can view movie details such as ratings, release year, and original language.
* **Debounced search:** Search queries are debounced to prevent excessive API calls.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool and development server for modern web projects.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Appwrite:** A backend platform for building web and mobile applications.
* **The Movie Database (TMDB) API:** Provides movie data.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* npm

    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo

    ```sh
    git clone https://github.com/sriram-dev-9/Movie-Finder-Web-App.git
    ```

2.  Install NPM packages

    ```sh
    npm install
    ```

3.  Create a `.env` file in the root of the project and add the following environment variables:

    ```sh
    VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"
    VITE_APPWRITE_PROJECT_ID="YOUR_APPWRITE_PROJECT_ID"
    VITE_APPWRITE_DATABASE_ID="YOUR_APPWRITE_DATABASE_ID"
    VITE_APPWRITE_COLLECTION_ID="YOUR_APPWRITE_COLLECTION_ID"
    ```

4.  Start the development server

    ```sh
    npm run dev
    ```

## Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the application for production.
* `npm run lint`: Lints the code.
* `npm run preview`: Previews the production build.

## Authors

* **Sriram Nagandla**
