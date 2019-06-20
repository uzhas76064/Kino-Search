'use strict';
window.addEventListener('DOMContentLoaded', () => {
    let searchForm = document.querySelector('#search-form'),
        movies = document.querySelector('.movies');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchText = document.querySelector('#form-control').value,
            apiKey = '08e954c9c496514c2ec00002ea60edfc',
            language = 'en-US',
            posterSize = 'w500',
            server = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=${language}&page=1&include_adult=false&query=${searchText}`;

        fetch(server)
            .then(value => {
                if (value.status !== 200) {
                    return Promise.reject(value);
                }

                return value.json();
            })
            .then(output => {
                let inner = '';
                let poster = `https://image.tmdb.org/t/p/${posterSize}/`;

                //console.log(output);

                output.results.forEach((item) => {
                    let nameItem = item.name || item.title,
                        firstSeries = item.first_air_date || item.release_date;

                        inner +=
                        `<div class="movie-item">
                            <img src="${poster + item.poster_path}" class="poster" alt="${nameItem}">
                            <div class="info">
                                <h3>${nameItem}</h3>
                                <p>Release date: ${firstSeries}</p>
                            </div>
                         </div>`;
                });

                movies.innerHTML = inner;
            })
             .catch(err => {
                movies.textContent += 'Oops.. Something went wrong';
                console.log(err.status);
            });
    });

    //Почему-то этот код не работает и я не могу понять почему
    // поэтому стилизовал битое изображение в css
    //пробовал заносить в then() и catch(), но эффекта нет
    //Можно объяснить этот момент?

    /* let posterImg = movies.querySelector('.poster');
        posterImg.addEventListener('error', () => {
       posterImg.setAttribute('src', 'http://placehold.it/361.png/&text=Ooops..+It+seems+poster+not+found');
    }); */
});