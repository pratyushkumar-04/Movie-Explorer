# 🎬 Movie Explorer

A feature-rich **Angular** web app that lets users **search**, **explore**, and **discover** movies, TV shows, and people using **The Movie Database (TMDB) API**.

🌐 **Live Demo:** [https://bingehere.netlify.app](https://bingehere.netlify.app)

---

## 📌 Features

- **Home / Landing Page**  
  - Switch between **Worldwide** and **India-only** content.
  - See **Trending Movies**, **Top-Rated Movies**, and **Trending TV Shows**.

- **Search with Live Suggestions**  
  - Instant suggestions appear as you type (debounced for performance).
  - Includes a loading spinner during fetch and a “No results” message if nothing matches.

- **Movie & TV Details Pages**  
  - Auto-routed using Angular Router (`/movie/:id`, `/tv/:id`).
  - Display cover poster, title, overview, genres, language, runtime, release date, ratings.
  - Embedded **YouTube Trailer** player.
  - Show **Where to Watch** (OTT providers).
  - See top cast, each linked to a **Person Detail Page**.

- **Person Detail Page**  
  - Shows bio, birth details, department.
  - Displays "Known For" items and full filmography with routing to individual titles.

- **Loading Spinners & Error Handling**  
  - Spinners show during API calls.
  - "Loading" state consolidated using `pendingRequests`.
  - Graceful API error handling.

- **Responsive UI + Dark/Light Modes**  
  - Movie-detail card layout for desktop.
  - Fully responsive CSS for mobile (stacked layout).
  - Dark-themed components with hover effects, glows, and optimized legibility.

---

## 🛠 Tech Stack

- **Frontend:** Angular 17 (TypeScript + Angular CLI)  
- **API:** TMDB v3 with public API key  
- **Packages:** RxJS, Angular Router, HttpClient  
- **Styling:** SCSS/CSS with custom responsive design

---

## 🔌 TMDB API Endpoints Used

| Feature                | API Endpoint |
|------------------------|--------------|
| Search (multi)         | `/search/multi` |
| Trending (week/day)    | `/trending/movie/week`, `/trending/tv/week`, with `region=IN` for India |
| Top Rated (global/India) | `/movie/top_rated`, `/tv/top_rated` with `region=IN` |
| Discover movies/TV     | `/discover/movie`, `/discover/tv` with filters (language, popularity, vote count) |
| Movie Details          | `/movie/{movie_id}` |
| Movie Videos           | `/movie/{movie_id}/videos` |
| Movie Credits (cast)   | `/movie/{movie_id}/credits` |
| Watch Providers        | `/movie/{movie_id}/watch/providers` |
| Person Details         | `/person/{person_id}` |
| Person Filmography     | `/person/{person_id}/combined_credits` |

---

## 🚀 Getting Started

### Prerequisites  
- Node.js & npm  
- TMDB API Key (get one for free [here](https://www.themoviedb.org/documentation/api))

### Setup Steps


# Clone & install dependencies
git clone https://github.com/pratyushkumar-04/Movie-Explorer.git
cd Movie-Explorer
npm install

# Add your TMDB key to environment
echo "export TMDB_API_KEY=YOUR_KEY" >> ~/.bashrc
# or directly add to src/environments/environment.ts

# Serve locally
ng serve
