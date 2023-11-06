document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

  let swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-next-second",
      prevEl: ".swiper-prev-second",
    },
  });

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
  const openModalButtonReg = document.querySelector(".registerLi");
  const openModalButtonSign = document.querySelector(".signinLi");
  const modal = document.querySelector(".modal");
  const closeModalButton = document.querySelector(".quitModal");

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  openModalButtonReg.addEventListener("click", openModal);
  openModalButtonSign.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);

  // MODAL TOGGLE
  const signupDiv = document.querySelector(".selectLog .signup");
  const loginDiv = document.querySelector(".selectLog .login");

  signupDiv.addEventListener("click", () => {
    signupDiv.classList.add("redBg");
    loginDiv.classList.remove("redBg");
  });

  loginDiv.addEventListener("click", () => {
    loginDiv.classList.add("redBg");
    signupDiv.classList.remove("redBg");
  });

  // SEARCH BAR
  let searchInput = document.getElementById("inputSearch");
  let searchResult = "";

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchResult = e.target.value;
      fetchMovies();
    }
  });

  document.querySelector(".validateSearch").addEventListener("click", () => {
    searchResult = searchInput.value;
    fetchMovies();
  });

  // Fetch movie depending on the search

  async function fetchMovies() {
    const apiKey = "c84fa46197059b44b8001782df185e79";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchResult}&language=en-EN&sort_by=vote_average.desc&sort_by=vote_count.desc`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        displayResults(data.results);
      } else {
        displayNoResults();
      }
    } catch (error) {
      displayNoResults();
    }
  }

  function displayResults(results) {
    const message = document.querySelector(".message");
    const moviePostersContainer = document.getElementById("moviePosters");

    if (moviePostersContainer) {
      moviePostersContainer.innerHTML = "";

      if (results.length > 0) {
        message.textContent = `Results for '${searchResult}'`;
        message.style.opacity = 1;

        results.forEach((movie) => {
          if (movie.poster_path) {
            const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            const posterImage = document.createElement("img");
            posterImage.src = posterURL;
            posterImage.classList.add("movie-poster");

            const openPopupForMovie = (movie) => {
              const popup = document.querySelector(".popup");
              const popupTitle = popup.querySelector("h2");
              const popupImage = popup.querySelector(".posterImg");
              const popupGenres = popup.querySelector(".textPop .genres");
              const popupReleaseYear = popup.querySelector(".textPop p");
              const popupRating = popup.querySelector(".textPop h5");
              const popupDescription = popup.querySelector(".textPop .resume");

              popupTitle.textContent = movie.title;
              popupReleaseYear.textContent = movie.release_date.substring(0, 4);

              popupTitle.textContent = movie.title;
              popupImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              popupReleaseYear.textContent = movie.release_date.substring(0, 4);
              popupRating.textContent = movie.vote_average.toFixed(1);
              popupDescription.textContent = movie.overview;
              popupRating.innerHTML = `<p>
              <span>
              <i class="fa-solid fa-star" style="color: #c00"></i>
              </span>${movie.vote_average.toFixed(1)}
              </p>`;

              let genres = {
                id28: "Action",
                id12: "Adventure",
                id16: "Animation",
                id35: "Comedy",
                id80: "Crime",
                id99: "Documentary",
                id18: "Drama",
                id10751: "Family",
                id14: "Fantasy",
                id36: "History",
                id27: "Horror",
                id10402: "Music",
                id9648: "Mystery",
                id10749: "Romance",
                id878: "Science Fiction",
                id10770: "TV Movie",
                id53: "Thriller",
                id10572: "War",
                id37: "Western",
              };

              let genreFunc = (element) => {
                let arrayOfGenre = element.genre_ids;
                let movieGenre = [];
                arrayOfGenre.forEach((cat) => {
                  movieGenre.push(genres[`id${cat}`]);
                });
                movieGenre = movieGenre.toString();
                movieGenre = movieGenre.replaceAll(",", " / ");
                return movieGenre;
              };
              popupGenres.textContent = genreFunc(movie);

              popup.style.display = "block";

              const quitPopUp = popup.querySelector(".quitPopUp");
              quitPopUp.addEventListener("click", () => {
                popup.style.display = "none";
              });
            };

            posterImage.classList.add("movie-poster");

            posterImage.addEventListener("click", () => {
              openPopupForMovie(movie);
            });

            const swiperSlide = document.createElement("div");
            swiperSlide.classList.add("swiper-slide");
            swiperSlide.appendChild(posterImage);
            moviePostersContainer.appendChild(swiperSlide);
            const cardHover = document.createElement("div");
            cardHover.classList.add("cardHover");
            swiperSlide.appendChild(cardHover);
            const titleHover = document.createElement("h2");
            titleHover.classList.add("titleHover");
            titleHover.textContent = movie.title;
            cardHover.appendChild(titleHover);
            const dateHover = document.createElement("p");
            dateHover.classList.add("dateHover");
            dateHover.textContent = movie.release_date.substring(0, 4);
            cardHover.appendChild(dateHover);
            const genreHover = document.createElement("p");
            genreHover.classList.add("genreHover");
            cardHover.appendChild(genreHover);
            const spanHover = document.createElement("span");
            spanHover.classList.add("spanHover");
            spanHover.innerHTML = `
          <i class="fa-solid fa-star" style="color: #c00"></i>
        `;
            cardHover.appendChild(spanHover);
            const averageHover = document.createElement("p");
            averageHover.classList.add("averageHover");
            averageHover.textContent = movie.vote_average.toFixed(1);
            cardHover.appendChild(averageHover);

            swiperSlide.addEventListener("click", () => {
              openPopupForMovie(movie);
            });
          }
        });
      } else {
        message.textContent = `No results for '${searchResult}'`;
        message.style.opacity = 1;
      }
    }
  }

  function displayNoResults() {
    const message = document.querySelector(".message");
    message.textContent = `No results for '${searchResult}'`;
    message.style.opacity = 1;
  }

  // Fetch latest releases

  async function fetchLatestMovies() {
    const apiKey = "c84fa46197059b44b8001782df185e79";
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const formattedToday = today.toISOString().split("T")[0];
    const formattedOneMonthAgo = oneMonthAgo.toISOString().split("T")[0];

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${formattedOneMonthAgo}&primary_release_date.lte=${formattedToday}&language=en-EN`;

    try {
      const response = await fetch(url);
      console.log("API Response:", response);

      if (response.ok) {
        const data = await response.json();
        displayLatestMovies(data.results);
      } else {
        displayNoLatestMovies();
      }
    } catch (error) {
      displayNoLatestMovies();
    }
  }

  function displayLatestMovies(results) {
    const message = document.querySelector(".message");
    const latestMoviesContainer = document.querySelector(
      ".swiper.mySwiper2 .swiper-wrapper"
    );

    if (latestMoviesContainer) {
      latestMoviesContainer.innerHTML = "";

      if (results.length > 0) {
        message.textContent = "No result yet, type a movies.";
        message.style.opacity = 1;

        results.forEach((movie) => {
          if (movie.poster_path) {
            const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            const posterImage = document.createElement("img");
            posterImage.src = posterURL;
            const swiperSlide = document.createElement("div");
            swiperSlide.classList.add("swiper-slide");
            swiperSlide.appendChild(posterImage);
            latestMoviesContainer.appendChild(swiperSlide);
            const cardHover = document.createElement("div");
            cardHover.classList.add("cardHover");
            swiperSlide.appendChild(cardHover);
            const titleHover = document.createElement("h2");
            titleHover.classList.add("titleHover");
            titleHover.textContent = movie.title;
            cardHover.appendChild(titleHover);
            const dateHover = document.createElement("p");
            dateHover.classList.add("dateHover");
            dateHover.textContent = movie.release_date.substring(0, 4);
            cardHover.appendChild(dateHover);
            const genreHover = document.createElement("p");
            genreHover.classList.add("genreHover");
            cardHover.appendChild(genreHover);
            const spanHover = document.createElement("span");
            spanHover.classList.add("spanHover");
            spanHover.innerHTML = `
            <i class="fa-solid fa-star" style="color: #c00"></i>
            `;
            cardHover.appendChild(spanHover);
            const averageHover = document.createElement("p");
            averageHover.classList.add("averageHover");
            averageHover.textContent = movie.vote_average.toFixed(1);
            cardHover.appendChild(averageHover);

            swiperSlide.addEventListener("click", () => {
              openPopupForMovie(movie);
            });

            const openPopupForMovie = () => {
              const popup = document.querySelector(".popup");
              const popupTitle = popup.querySelector("h2");
              const popupImage = popup.querySelector(".posterImg");
              const popupGenres = popup.querySelector(".textPop .genres");
              const popupReleaseYear = popup.querySelector(".textPop p");
              const popupRating = popup.querySelector(".textPop h5");
              const popupDescription = popup.querySelector(".textPop .resume");

              popupTitle.textContent = movie.title;
              popupImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              popupReleaseYear.textContent = movie.release_date.substring(0, 4);
              popupDescription.textContent = movie.overview;
              popupRating.innerHTML = `<p>
              <span>
              <i class="fa-solid fa-star" style="color: #c00"></i>
              </span>${movie.vote_average.toFixed(1)}
              </p>`;

              let genres = {
                id28: "Action",
                id12: "Adventure",
                id16: "Animation",
                id35: "Comedy",
                id80: "Crime",
                id99: "Documentary",
                id18: "Drama",
                id10751: "Family",
                id14: "Fantasy",
                id36: "History",
                id27: "Horror",
                id10402: "Music",
                id9648: "Mystery",
                id10749: "Romance",
                id878: "Science Fiction",
                id10770: "TV Movie",
                id53: "Thriller",
                id10572: "War",
                id37: "Western",
              };

              let genreFunc = (element) => {
                let arrayOfGenre = element.genre_ids;
                let movieGenre = [];
                arrayOfGenre.forEach((cat) => {
                  movieGenre.push(genres[`id${cat}`]);
                });
                movieGenre = movieGenre.toString();
                movieGenre = movieGenre.replaceAll(",", " / ");
                return movieGenre;
              };

              popupGenres.textContent = genreFunc(movie);
              popup.style.display = "block";

              const quitPopUp = popup.querySelector(".quitPopUp");
              quitPopUp.addEventListener("click", () => {
                popup.style.display = "none";
              });
            };
            posterImage.addEventListener("click", () => {
              openPopupForMovie(movie);
            });
          }
        });
      } else {
        message.textContent = "No latest releases found";
        message.style.opacity = 1;
      }
    }
  }

  function displayNoLatestMovies() {
    const message = document.querySelector(".message");
    message.textContent = "No latest releases found";
    message.style.opacity = 1;
  }

  fetchLatestMovies();

  // Fetch Movies Genres

  const sortList = document.querySelector(".sortMovies .list ul");
  const messageGenres = document.querySelector(".messageGenres p");

  sortList.addEventListener("click", (e) => {
    const clickedItem = e.target;
    if (clickedItem.tagName === "LI") {
      const listItems = sortList.querySelectorAll("li");
      listItems.forEach((item) => {
        item.classList.remove("redBgMovies");
      });

      clickedItem.classList.add("redBgMovies");

      messageGenres.textContent = clickedItem.textContent;
      genreHover.textContent = "test";
    }
  });

  function populateSwiperWithMovies(results, swiperContainer) {
    const moviePostersContainer = document.querySelector(
      `.${swiperContainer} .swiper-wrapper`
    );

    if (moviePostersContainer) {
      moviePostersContainer.innerHTML = "";

      results.forEach((movie) => {
        if (movie.poster_path) {
          const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          const posterImage = document.createElement("img");
          posterImage.src = posterURL;
          const swiperSlide = document.createElement("div");
          swiperSlide.classList.add("swiper-slide");
          swiperSlide.appendChild(posterImage);
          moviePostersContainer.appendChild(swiperSlide);
          const cardHover = document.createElement("div");
          cardHover.classList.add("cardHover");
          swiperSlide.appendChild(cardHover);
          const titleHover = document.createElement("h2");
          titleHover.classList.add("titleHover");
          titleHover.textContent = movie.title;
          cardHover.appendChild(titleHover);
          const dateHover = document.createElement("p");
          dateHover.classList.add("dateHover");
          dateHover.textContent = movie.release_date.substring(0, 4);
          cardHover.appendChild(dateHover);
          const genreHover = document.createElement("p");
          genreHover.classList.add("genreHover");
          cardHover.appendChild(genreHover);
          const spanHover = document.createElement("span");
          spanHover.classList.add("spanHover");
          spanHover.innerHTML = `
          <i class="fa-solid fa-star" style="color: #c00"></i>
        `;
          cardHover.appendChild(spanHover);
          const averageHover = document.createElement("p");
          averageHover.classList.add("averageHover");
          averageHover.textContent = movie.vote_average.toFixed(1);
          cardHover.appendChild(averageHover);
          swiperSlide.addEventListener("click", () => {
            openPopupForMovie(movie);
          });

          const openPopupForMovie = () => {
            const popup = document.querySelector(".popup");
            const popupTitle = popup.querySelector("h2");
            const popupImage = popup.querySelector(".posterImg");
            const popupGenres = popup.querySelector(".textPop .genres");
            const popupReleaseYear = popup.querySelector(".textPop p");
            const popupRating = popup.querySelector(".textPop h5");
            const popupDescription = popup.querySelector(".textPop .resume");

            popupTitle.textContent = movie.title;
            popupImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            popupReleaseYear.textContent = movie.release_date.substring(0, 4);
            popupRating.textContent = movie.vote_average.toFixed(1);
            popupDescription.textContent = movie.overview;
            popupRating.innerHTML = `<p>
              <span>
              <i class="fa-solid fa-star" style="color: #c00"></i>
              </span>${movie.vote_average.toFixed(1)}
              </p>`;

            let genres = {
              id28: "Action",
              id12: "Adventure",
              id16: "Animation",
              id35: "Comedy",
              id80: "Crime",
              id99: "Documentary",
              id18: "Drama",
              id10751: "Family",
              id14: "Fantasy",
              id36: "History",
              id27: "Horror",
              id10402: "Music",
              id9648: "Mystery",
              id10749: "Romance",
              id878: "Science Fiction",
              id10770: "TV Movie",
              id53: "Thriller",
              id10572: "War",
              id37: "Western",
            };

            let genreFunc = (element) => {
              let arrayOfGenre = element.genre_ids;
              let movieGenre = [];
              arrayOfGenre.forEach((cat) => {
                movieGenre.push(genres[`id${cat}`]);
              });
              movieGenre = movieGenre.toString();
              movieGenre = movieGenre.replaceAll(",", " / ");
              return movieGenre;
            };

            popupGenres.textContent = genreFunc(movie);
            popup.style.display = "block";

            const quitPopUp = popup.querySelector(".quitPopUp");
            quitPopUp.addEventListener("click", () => {
              popup.style.display = "none";
            });
          };
          posterImage.addEventListener("click", () => {
            openPopupForMovie(movie);
          });
        }
      });
    }
  }

  async function fetchMoviesByGenre(genreId, swiperContainer) {
    try {
      const apiKey = "c84fa46197059b44b8001782df185e79";
      const apiUrlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-EN&with_genres=${genreId}`;

      const response = await fetch(apiUrlGenre);
      if (!response.ok) {
        throw new Error("Réponse du réseau non valide");
      }

      const data = await response.json();
      populateSwiperWithMovies(data.results, swiperContainer);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des films par genre :",
        error
      );
    }
  }

  // Event on click for fetch the right genre depending on the id

  document
    .getElementById("comedy")
    .addEventListener("click", () => fetchMoviesByGenre(35, "mySwiper3"));
  document
    .getElementById("drama")
    .addEventListener("click", () => fetchMoviesByGenre(18, "mySwiper3"));
  document
    .getElementById("action")
    .addEventListener("click", () => fetchMoviesByGenre(28, "mySwiper3"));
  document
    .getElementById("romance")
    .addEventListener("click", () => fetchMoviesByGenre(10749, "mySwiper3"));
  document
    .getElementById("fantasy")
    .addEventListener("click", () => fetchMoviesByGenre(14, "mySwiper3"));
  document
    .getElementById("animation")
    .addEventListener("click", () => fetchMoviesByGenre(16, "mySwiper3"));

  fetchMoviesByGenre(35, "mySwiper3");
});

const burgerIcon = document.querySelector(".fa-bars");
const navBar = document.querySelector(".navbar-list");
burgerIcon.addEventListener("click", () => {
  navBar.classList.toggle("showNavBar");
});
