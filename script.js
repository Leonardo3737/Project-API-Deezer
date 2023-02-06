let musics = []
let id
//let selectd

document.querySelector('#search').addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    Search()
  }
}, false)

$('#buttonSearch').click(Search)

function Search() {
  $('#results>div').remove()
  const music = $('#search').val()
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: { q: music },
    headers: {
      'X-RapidAPI-Key': '3d18fadb96mshfdcba924e6d39f5p136872jsn47e833abda1a',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  }
  axios.request(options).then(function (response) {
    const results = response.data.data

    if (results == undefined) {
      $(`<div class="noResults">Nenhum resultado encontrado</div>`).appendTo('#results')
    } else {
      if (results.length == 0) {
        $(`<div class="noResults">Nenhum resultado encontrado</div>`).appendTo('#results')
      } else {
        const setResult = new Set();
        const filterResults = results.filter((result) => {
          const duplicatedResult = setResult.has(result.title);
          setResult.add(result.title);
          return !duplicatedResult;
        });

        for (indice in filterResults) {
          musics[indice] = filterResults[indice]
          $(`<div id="${musics[indice].id}" class="result">
              <h3 id="title${indice}" class="title"><div>${musics[indice].title}</div></h3>
              <div class="autor">${musics[indice].artist.name}</div>
              <div id="content${musics[indice].id}" class="content"></div>
              </div>`).appendTo('#results')

          $(`#${musics[indice].id}`).click(function (e) {
            $(`#selected`).attr('id', id)
            id = $(this).attr('id')
            for (let i = 0; i < musics.length; i++) {
              $(`#content${musics[i].id}`).html('')
            }
            $(this).attr('id', 'selected')
            $(`<img src="${musics.find(a => a.id === parseInt(id)).artist.picture}" alt="">
            <audio src="${musics.find(a => a.id === parseInt(id)).preview}" controls><p>seu navegador não suporta o elemento</p></audio>
            <a href=${musics.find(a => a.id === parseInt(id)).link} target="_blank">clique aqui para escutar completo no deezer</a>`)
              .appendTo(`#content${id}`)
          })
        }
      }
    }
  }).catch(function (error) {
    console.error(error);
  });
}




