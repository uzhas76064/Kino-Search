let movies = document.querySelector(".movies");
let posterSize = "w500";
let poster = `https://image.tmdb.org/t/p/${posterSize}/`;

window.addEventListener("DOMContentLoaded", () => {
  let searchForm = document.querySelector("#search-form");

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const searchText = document.querySelector("#form-control").value,
      apiKey = "08e954c9c496514c2ec00002ea60edfc",
      language = "en-US",
      server = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=${language}&page=1&include_adult=false&query=${searchText}`;

    fetch(server)
      .then(value => {
        if (value.status !== 200) {
          return Promise.reject(value);
        }

        return value.json();
      })
      .then(output => {
        let inner = "";

        if (output.results.length === 0) {
          inner = `<h3>${searchText} is not found</h3>`;
        }

        output.results.forEach(item => {
          let nameItem = item.name || item.title,
            firstSeries = item.first_air_date || item.release_date,
            dataInfo = "";

          if (item.media_type !== "person") dataInfo = `data-id="${item.id}"`;

          inner += `<div class="movie-item">
                            <img src="${poster +
                              item.poster_path}" class="poster" alt="${nameItem}" ${dataInfo}>
                            <div class="info">
                                <h3>${nameItem}</h3>
                                <p>Release date: ${firstSeries}</p>
                            </div>
                         </div>`;
        });

        movies.innerHTML = inner;
        mufflePoster();
        addEventMedia();
      })
      .catch(err => {
        movies.textContent += "Oops.. Something went wrong";
        console.log(err.status);
      });
  });

  fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=08e954c9c496514c2ec00002ea60edfc`
  )
    .then(value => {
      if (value.status !== 200) {
        return Promise.reject(value);
      }

      return value.json();
    })
    .then(output => {
      let inner = "";
      let poster = `https://image.tmdb.org/t/p/w500/`;

      if (output.results.length === 0) {
        inner = `<h3>${searchText} is not found</h3>`;
      }

      output.results.forEach(item => {
        let nameItem = item.name || item.title,
          firstSeries = item.first_air_date || item.release_date,
          mediaType = item.title ? "movie" : "tv",
          dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;

        inner += `<div class="movie-item">
                            <img src="${poster +
                              item.poster_path}" class="poster" alt="${nameItem}" ${dataInfo}>
                            <div class="info">
                                <h3>${nameItem}</h3>
                                <p>Release date: ${firstSeries}</p>
                            </div>
                         </div>`;
      });

      movies.innerHTML = inner;
      mufflePoster();
      addEventMedia();
    });
  /* .catch(err => {
                movies.textContent += 'Oops.. Something went wrong';
                console.log(err.status); */
});

function addEventMedia() {
  const media = movies.querySelectorAll("img[data-id]");
  media.forEach(item => {
    item.style.cssText = "cursor: pointer;";
    item.addEventListener("click", showFullInfo);
  });
}

function showFullInfo() {
  let url = "";
  if (this.dataset.type === "movie") {
    url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=08e954c9c496514c2ec00002ea60edfc&language=en-US`;
  } else if (this.dataset.type === "tv") {
    url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=08e954c9c496514c2ec00002ea60edfc&language=en-US`;
  }

  fetch(url)
    .then(value => {
      if (value.status !== 200) {
        return Promise.reject(value);
      }

      return value.json();
    })
    .then(output => {
      console.log(output);
      movies.innerHTML = `
                    <div class="info-container">
                    <h4 class="col-12 text-center text-info">${output.name ||
                      output.title}</h4>
                        <div>
                            <img src="${poster +
                              output.poster_path}" class="poster" alt="${output.name ||
        output.title}">
                            ${
                              output.homepage
                                ? `<p class="text-center"><a href="${output.homepage}">Official page</a></p>`
                                : ""
                            }
                            ${
                              output.imdb_id
                                ? `<p class="text-center"><a href="${output.imdb_id}">IMDB page</a></p>`
                                : ""
                            }
                        </div>
                    <div class="discription col-6 text-left">
                        <p><b>Original title:</b> ${output.original_title}</p>
                        <p><b>Original language:</b> ${
                          output.original_language
                        }</p>
                        <p><b>Budgete:</b> ${output.budget}</p>
                        <p><b>Overview:</b> ${output.overview}</p>
                    </div>
                    </div>
                `;
    });
  /* .catch(err => {
                movies.textContent += 'Oops.. Something went wrong';
                console.log(err.status);
            }); */
}

function mufflePoster() {
  let posters = document.querySelectorAll(".poster");
  for (let i = 0; i < posters.length; i++) {
    posters[i].addEventListener("error", () => {
      posters[i].setAttribute(
        "src",
        "https://dummyimage.com/361x415/cccccc/00000b.png&text=Ooops..+It+seems+image+not+found"
      );
      posters[i].style.cssText = "height: 415px;";
    });
  }
}
