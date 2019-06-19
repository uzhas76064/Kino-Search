'use strict';
window.addEventListener('DOMContentLoaded', ()=> {
    let searchForm = document.querySelector('#search-form'),
        movies = document.querySelector('.movies');

    searchForm.addEventListener('submit', (e)=> {
        e.preventDefault();
        const searchText = document.querySelector('#form-control').value;
        const apiKey = '08e954c9c496514c2ec00002ea60edfc';
        const language = 'en-US';
        const server = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=${language}&page=1&include_adult=false&query=${searchText}`;
        requestApi('GET', server);
    });

    function requestApi(method, url) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send(null);

        xhr.addEventListener('readystatechange', ()=> {
            if(xhr.readyState !== 4) return;

            if(xhr.status !== 200) {
                movies.textContent += xhr.status;
                return;
            }

            const output = JSON.parse(xhr.responseText);
            console.log(output);
            let inner = '';
            output.results.forEach((item)=> {
                let nameItem = item.name || item.title,
                    firstSeries = item.first_air_date || item.release_date;
                inner += `<p>${nameItem}(First release: ${firstSeries})</p>`;
            });

            movies.innerHTML = inner;
        });
    }
});