'use strict';
window.addEventListener('DOMContentLoaded', ()=> {
    let searchForm = document.querySelector('#search-form'),
        movies = document.querySelector('.movies');

    searchForm.addEventListener('submit', (e)=> {
        e.preventDefault();
        const searchText = document.querySelector('#form-control').value,
            apiKey = '08e954c9c496514c2ec00002ea60edfc',
            language = 'en-US',
            server = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=${language}&page=1&include_adult=false&query=${searchText}`;

        requestApi('GET', server)
            .then(result => {
                const output = JSON.parse(result);
                let inner = '';

                console.log(output);

                output.results.forEach((item)=> {
                let nameItem = item.name || item.title,
                    firstSeries = item.first_air_date || item.release_date;

                inner += `<div class="movie-item">
                            <h3>${nameItem}</h3>
                            <p>Release date: ${firstSeries}</p>
                         </div>`;
            });

            movies.innerHTML = inner;
            })
            .catch(err => {
                movies.textContent += 'Oops.. Something went wrong';
                console.log(err.status);
            });
    });

    function requestApi(method, url) {
        return new Promise((resolve, reject)=> {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.addEventListener('load', ()=> {
                if(xhr.status !== 200) {
                    reject({status: xhr.status});
                    return;
                }

                resolve(xhr.response);
            });

            xhr.addEventListener('error', ()=> {
                reject({status: xhr.status});
            });
            xhr.send(null);
        });
    }
});