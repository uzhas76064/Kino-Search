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

                let posters = document.querySelectorAll('.poster');
                for(let i = 0; i < posters.length; i++) {
                    posters[i].addEventListener('error', () => {
                        posters[i].setAttribute('src', 'https://dummyimage.com/361x415/cccccc/00000b.png&text=Ooops..+It+seems+image+not+found');
                        posters[i].style.cssText = 'height: 415px;';
                    });
                }
            })
             .catch(err => {
                movies.textContent += 'Oops.. Something went wrong';
                console.log(err.status);
            });
    });
});
<<<<<<< HEAD
=======

>>>>>>> ab37855c5f22a97807dfe5b1306cdb76c03c44f5
