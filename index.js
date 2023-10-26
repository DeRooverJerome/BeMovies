document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  console.log("Initializing Swiper");
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

  console.log("Initializing Swiper2");
  let swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-next-second",
      prevEl: ".swiper-prev-second",
    },
  });

  console.log("Initializing Swiper3");
  let swiper3 = new Swiper(".mySwiper3", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-next-third",
      prevEl: ".swiper-prev-third",
    },
  });

  // MODAL
  console.log("Setting up modal functionality");
  const openModalButtonReg = document.querySelector(".registerLi");
  const openModalButtonSign = document.querySelector(".signinLi");
  const modal = document.querySelector(".modal");
  const closeModalButton = document.querySelector(".quitModal");

  function openModal() {
    console.log("Opening modal");
    modal.style.display = "block";
  }

  function closeModal() {
    console.log("Closing modal");
    modal.style.display = "none";
  }

  openModalButtonReg.addEventListener("click", openModal);
  openModalButtonSign.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);

  // MODAL TOGGLE
  console.log("Setting up modal toggle functionality");
  const signupDiv = document.querySelector('.selectLog .signup');
  const loginDiv = document.querySelector('.selectLog .login');

  signupDiv.addEventListener('click', () => {
    console.log("Switching to Signup");
    signupDiv.classList.add('redBg');
    loginDiv.classList.remove('redBg');
  });

  loginDiv.addEventListener('click', () => {
    console.log("Switching to Login");
    loginDiv.classList.add('redBg');
    signupDiv.classList.remove('redBg');
  });

  // SEARCH BAR
  console.log("Setting up search bar functionality");
  let searchInput = document.getElementById("inputSearch");
  let searchResult = "";

  // Listen for "keydown" event
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // Only fetch when the Enter key is pressed
      searchResult = e.target.value;
      console.log("Search input submitted:", searchResult);
      fetchMovies();
    }
  });

  // Listen for click event on the search button
  document.querySelector(".validateSearch").addEventListener("click", () => {
    searchResult = searchInput.value;
    console.log("Search button clicked:", searchResult);
    fetchMovies();
  });

  async function fetchMovies() {
    const apiKey = 'c84fa46197059b44b8001782df185e79';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchResult}&language=en-EN`;
    console.log("Fetching movies with URL:", url);

    try {
      const response = await fetch(url);
      console.log("API Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("API Data:", data);
        displayResults(data.results);
      } else {
        console.log("API request failed");
        displayNoResults();
      }
    } catch (error) {
      console.error("Error:", error);
      displayNoResults();
    }
  }

  function displayResults(results) {
    console.log("Displaying results");
    const message = document.querySelector('.message');
    const moviePostersContainer = document.getElementById('moviePosters');

    // Verify the existence of moviePostersContainer before modifying it
    if (moviePostersContainer) {
      moviePostersContainer.innerHTML = ''; // Clear previous posters

      if (results.length > 0) {
        message.textContent = `Results for '${searchResult}'`;
        message.style.opacity = 1;

        // Iterate through the search results and add poster images to the swiper
        results.forEach((movie) => {
          if (movie.poster_path) {
            const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            const posterImage = document.createElement('img');
            posterImage.src = posterURL;
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.appendChild(posterImage);
            moviePostersContainer.appendChild(swiperSlide);
          }
        });

        // After modifying the content, update the swiper to reflect the changes
      } else {
        message.textContent = `No results for '${searchResult}'`;
        message.style.opacity = 1;
      }
    }
  }

  function displayNoResults() {
    console.log("Displaying no results");
    const message = document.querySelector('.message');
    message.textContent = `No results for '${searchResult}'`;
    message.style.opacity = 1;
  }

  // Fetch latest movies for mySwiper2
  async function fetchLatestMovies() {
    const apiKey = 'c84fa46197059b44b8001782df185e79';
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedOneMonthAgo = oneMonthAgo.toISOString().split('T')[0];

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${formattedOneMonthAgo}&primary_release_date.lte=${formattedToday}&language=en-EN`;
    console.log("Fetching latest movies with URL:", url);

    try {
      const response = await fetch(url);
      console.log("API Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("API Data:", data);
        displayLatestMovies(data.results);
      } else {
        console.log("API request failed");
        displayNoLatestMovies();
      }
    } catch (error) {
      console.error("Error:", error);
      displayNoLatestMovies();
    }
  }

  // Display latest movies in mySwiper2
  function displayLatestMovies(results) {
    console.log("Displaying latest movies");
    const message = document.querySelector('.message');
    const latestMoviesContainer = document.querySelector('.swiper.mySwiper2 .swiper-wrapper');

    // Verify the existence of latestMoviesContainer before modifying it
    if (latestMoviesContainer) {
      latestMoviesContainer.innerHTML = ''; // Clear previous posters

      if (results.length > 0) {
        message.textContent = "Latest Releases";
        message.style.opacity = 1;

        // Iterate through the latest movie results and add poster images to mySwiper2
        results.forEach((movie) => {
          if (movie.poster_path) {
            const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            const posterImage = document.createElement('img');
            posterImage.src = posterURL;
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.appendChild(posterImage);
            latestMoviesContainer.appendChild(swiperSlide);
          }
        });
      } else {
        message.textContent = "No latest releases found";
        message.style.opacity = 1;
      }
    }
  }

  function displayNoLatestMovies() {
    console.log("Displaying no latest releases");
    const message = document.querySelector('.message');
    message.textContent = "No latest releases found";
    message.style.opacity = 1;
  }

  // Add an event listener to fetch latest movies when the DOM content is loaded
  fetchLatestMovies();


  // MOVIE GENRES

  // Add an event listener to the .sortMovies section to handle list item clicks
  const sortList = document.querySelector('.sortMovies .list ul');
  const messageGenres = document.querySelector('.messageGenres p');

  sortList.addEventListener('click', (e) => {
    const clickedItem = e.target;
    if (clickedItem.tagName === 'LI') {
      // Remove the .redBgMovies class from all list items
      const listItems = sortList.querySelectorAll('li');
      listItems.forEach((item) => {
        item.classList.remove('redBgMovies');
      });

      // Add the .redBgMovies class to the clicked list item
      clickedItem.classList.add('redBgMovies');

      // Set the messageGenres content based on the selected genre
      messageGenres.textContent = clickedItem.textContent;
    }
    
  });

  // Function to populate the Swiper container with movie results
function populateSwiperWithMovies(results, swiperContainer) {
  const moviePostersContainer = document.querySelector(`.${swiperContainer} .swiper-wrapper`);

  if (moviePostersContainer) {
    moviePostersContainer.innerHTML = '';

    results.forEach((movie) => {
      if (movie.poster_path) {
        const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const posterImage = document.createElement('img');
        posterImage.src = posterURL;
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.appendChild(posterImage);
        moviePostersContainer.appendChild(swiperSlide);
      }
    });
  }
}

async function fetchMoviesByGenre(genreId, swiperContainer) {
  try {
    const apiKey = 'c84fa46197059b44b8001782df185e79'; // Replace with your API key
    const apiUrlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&with_genres=${genreId}`;

    const response = await fetch(apiUrlGenre);
    if (!response.ok) {
      throw new Error("Réponse du réseau non valide");
    }

    const data = await response.json();

    populateSwiperWithMovies(data.results, swiperContainer);
  } catch (error) {
    console.error("Erreur lors de la récupération des films par genre :", error);
  }
}

// Add event listeners to fetch movies by genre and populate mySwiper3
document.getElementById("comedy").addEventListener("click", () => fetchMoviesByGenre(35, "mySwiper3"));
document.getElementById("drama").addEventListener("click", () => fetchMoviesByGenre(18, "mySwiper3"));
document.getElementById("action").addEventListener("click", () => fetchMoviesByGenre(28, "mySwiper3"));
document.getElementById("romance").addEventListener("click", () => fetchMoviesByGenre(10749, "mySwiper3"));
document.getElementById("fantasy").addEventListener("click", () => fetchMoviesByGenre(14, "mySwiper3"));
document.getElementById("animation").addEventListener("click", () => fetchMoviesByGenre(16, "mySwiper3"));

// Fetch comedy movies by default when the page loads
fetchMoviesByGenre(35, "mySwiper3");




});