// Wrap your code in a DOMContentLoaded event listener
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

  searchInput.addEventListener("input", (e) => {
    searchResult = e.target.value;
    console.log("Search input changed:", searchResult);
    fetchMovies(); // Call fetchMovies whenever the input changes
  });

  async function fetchMovies() {
    const apiKey = 'c84fa46197059b44b8001782df185e79';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchResult}&language=fr-FR`;
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
        swiper.update();
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
});