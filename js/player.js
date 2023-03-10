// Espera o carregamento completo da página
window.addEventListener('load', function() {

  writeMusicList();
  document.querySelector('#btn-pause').style.display = 'none';

  const playlist = JSON.parse(localStorage.getItem('playlist'));
  const playlistMusicaAtual = localStorage.getItem('playlistMusicaAtual');
  const musicTitle = JSON.parse(localStorage.getItem('playlistTitle'));
  const albumImg = localStorage.getItem('album_img');

  document.querySelector('#player-title').innerHTML = musicTitle[playlistMusicaAtual];
  document.querySelector('audio').src = playlist[playlistMusicaAtual];
  document.querySelector('#menu-player-img').src = albumImg;

});

function acessMusicDB(key) {
  // Requisição http para o arquivo json no github que contém o dado das músicas
  fetch('https://raw.githubusercontent.com/leonelmiguins/l-player/main/music/music.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição!');
    }
    return response.json();
  })
  .then(data => {
      const audio = document.querySelector('audio');
      const musicaLink = Object.values(data[key]['musica']);
      const musicaTitle = Object.values(data[key]['musica_titulo']);
      const musicaDesc = Object.values(data[key]['desc']);

      localStorage.setItem('playlist', JSON.stringify(musicaLink));
      localStorage.setItem('playlistTitle', JSON.stringify(musicaTitle));
      localStorage.setItem('playlistMusicaAtual', 0);

      document.querySelector('#player-title').innerHTML = musicaTitle[0];

      const playerDesc = document.querySelector('#player-fullscreen-desc')
      const elementDesc = document.createElement("p");
      const desc = document.createTextNode(musicaDesc.join(''));
      elementDesc.appendChild(desc);
      //limpa a div para re-escrever
      playerDesc.innerHTML = "";
      playerDesc.appendChild(elementDesc);

      audio.src = musicaLink[0];
      // Espera o audio estar carregado 100% para dar o play e evitar erros
      audio.addEventListener('canplaythrough', function() {
        audio.play();
      });

      writeMusicList();

  })
  .catch(error => {
      console.error(error);
  });
}

// Escreve lista de músicas do album no player
function writeMusicList() {
  const musicaTitle = JSON.parse(localStorage.getItem('playlistTitle'));
  const musicaLink = JSON.parse(localStorage.getItem('playlist'));
  const playerListMusic = document.getElementById("list-music");

  // limpa a div para re-escrever
  playerListMusic.innerHTML = "";

  for (let i = 0; i < musicaLink.length; i++) {
    // Cria um novo elemento de texto com o conteúdo do loop
    const element = document.createElement('p');
    const novoTexto = document.createTextNode(musicaTitle[i]);
    element.appendChild(novoTexto);
    playerListMusic.appendChild(element);
  }

}

// Pular para a próxima música
function nextMusic() {
  let playlist, playlistMusicaAtual, musicTitle  = getStorage();

  playlistMusicaAtual++;
  if (playlistMusicaAtual >= playlist.length) {
      playlistMusicaAtual = 0;
  }
  document.getElementById("audio").src = playlist[playlistMusicaAtual];
  document.querySelector('#player-title').innerHTML = musicTitle[playlistMusicaAtual];
  document.getElementById("audio").load();
  document.getElementById("audio").play();
  localStorage.setItem('playlistMusicaAtual', playlistMusicaAtual);
}

// Voltar para a música anterior
function prevMusic() {
  let playlist, playlistMusicaAtual, musicTitle  = getStorage();
  
  playlistMusicaAtual = playlistMusicaAtual-1;
  if (playlistMusicaAtual <= playlist.length) {
  playlistMusicaAtual = 0;
  }
  document.getElementById("audio").src = playlist[playlistMusicaAtual];
  document.querySelector('#player-title').innerHTML = musicTitle[playlistMusicaAtual];
  document.getElementById("audio").load();
  document.getElementById("audio").play();
  localStorage.setItem('playlistMusicaAtual', playlistMusicaAtual);

}

// Inicia a reprodução da música
function playMusic() {
  const audio = document.querySelector('audio');
  audio.play();
  document.querySelector('#btn-play').style.display = 'none';
  document.querySelector('#btn-pause').style.display = 'inline';

}

// Pausa a reprodução da música
function pauseMusic() {
  const audio = document.querySelector('audio');
  audio.pause();
  document.querySelector('#btn-play').style.display = 'inline';
  document.querySelector('#btn-pause').style.display = 'none';

}

// Carrega uma sequencia de músicas para ser reproduzida
function playAlbum(key, band, img) {
  acessMusicDB(key);

  localStorage.setItem('album_img', img)
     
  document.querySelector('#btn-play').style.display = 'none';
  document.querySelector('#btn-pause').style.display = 'inline';
  document.querySelector('#player-band').innerHTML = band;
  document.querySelector('#menu-player-img').src = img;
  document.querySelector('.conteiner').style.display = 'none';
  document.querySelector('.player-fullscreen').style.display = 'flex';

  progressUpdate();

  // Pula para a próxima música
  audio.addEventListener('ended', function() {
    nextMusic();

  });
}

// Atualiza a barra de progresso enquanto o áudio é tocado
function progressUpdate() {
  const audio = document.querySelector('audio');

  audio.addEventListener('timeupdate', function() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressPercent = (currentTime / duration) * 100;
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = progressPercent + '%';
  
  document.querySelector('#player-duration').innerHTML = parseInt(duration / 60)+":"+parseInt(duration % 60);
  document.querySelector("#player-current-duration").innerHTML = +parseInt(currentTime / 60)+":"+parseInt(currentTime % 60);
  
  });

}

// Pega os dados das músicas salvas no localStorage
function getStorage() {
  let playlist = JSON.parse(localStorage.getItem('playlist'));
  let playlistMusicaAtual = localStorage.getItem('playlistMusicaAtual');
  let musicTitle= JSON.parse(localStorage.getItem('playlistTitle'));
  
  return playlist, playlistMusicaAtual, musicTitle;
}

// Fecha o mini player
function closePlayer() {
  document.querySelector('.conteiner').style.display = 'grid';
  document.querySelector('.player-fullscreen').style.display = 'none';

}

// Abre o mini Player
function openPlayer() {
  document.querySelector('.conteiner').style.display = 'none';
  document.querySelector('.player-fullscreen').style.display = 'flex';

}

// Faz o download da faixa atual
function musicDownload() {
  let playlist = JSON.parse(localStorage.getItem('playlist'));
  let playlistMusicaAtual = localStorage.getItem('playlistMusicaAtual');
  window.location.href = playlist[playlistMusicaAtual];

}

// Controla o volume da música atual
function controlVolume() {
  const audio = document.getElementById('audio');
  const controleVolume = document.getElementById('controleVolume');
  controleVolume.addEventListener('input', function() {
  audio.volume = controleVolume.value; 

  }); 
}

function acessMusicDB(key) {
  // Requisição http para o arquivo json no github que contém o dado das músicas
  fetch('https://raw.githubusercontent.com/leonelmiguins/l-player/main/music/music.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição!');
    }
    return response.json();
  })
  .then(data => {
      const audio = document.querySelector('audio');
      const musicaLink = Object.values(data[key]['musica']);
      const musicaTitle = Object.values(data[key]['musica_titulo']);
      const musicaDesc = Object.values(data[key]['desc']);

      localStorage.setItem('playlist', JSON.stringify(musicaLink));
      localStorage.setItem('playlistTitle', JSON.stringify(musicaTitle));
      localStorage.setItem('playlistMusicaAtual', 0);
      document.querySelector('#player-title').innerHTML = musicaTitle[0];

      const playerDesc = document.querySelector('#player-fullscreen-desc')
      const elementDesc = document.createElement("p");
      const desc = document.createTextNode(musicaDesc.join(''));
      elementDesc.appendChild(desc);

      //limpa a div para re-escrever
      playerDesc.innerHTML = "";
      playerDesc.appendChild(elementDesc);

      audio.src = musicaLink[0];
      // Espera o audio estar carregado 100% para dar o play e evitar erros
      audio.addEventListener('canplaythrough', function() {
        audio.play();
      });

      // Obtém a div onde a lista será adicionado
      const playerListMusic = document.getElementById("list-music");
      //limpa a div para re-escrever
      playerListMusic.innerHTML = "";

      // criar lista de músicas
      for (let i = 0; i < musicaLink.length; i++) {
        // Cria um novo elemento de texto com o conteúdo do loop
        const element = document.createElement('p');
        const novoTexto = document.createTextNode(musicaTitle[i]);
        element.appendChild(novoTexto);

        // Adiciona o novo elemento de texto à div
        playerListMusic.appendChild(element);
      }
  })
  .catch(error => {
      console.error(error);
  });
}

// Espera o carregamento completo da página
window.addEventListener('load', function() {
  document.querySelector('#btn-pause').style.display = 'none';

  const playlist = JSON.parse(localStorage.getItem('playlist'));
  const playlistMusicaAtual = localStorage.getItem('playlistMusicaAtual');
  const musicTitle = JSON.parse(localStorage.getItem('playlistTitle'));
  const albumImg = localStorage.getItem('album_img');

  document.querySelector('#player-title').innerHTML = musicTitle[playlistMusicaAtual];
  document.querySelector('audio').src = playlist[playlistMusicaAtual];
  document.querySelector('#menu-player-img').src = albumImg;
});

// Toca a próxima música
function nextMusic() {
  let playlist = JSON.parse(localStorage.getItem('playlist'));
  let playlistMusicaAtual = localStorage.getItem('playlistMusicaAtual');
  let musicTitle = JSON.parse(localStorage.getItem('playlistTitle'));

  playlistMusicaAtual++;
  if (playlistMusicaAtual >= playlist.length) {
      playlistMusicaAtual = 0; // volta para a primeira música
  }
  document.getElementById("audio").src = playlist[playlistMusicaAtual];
  document.querySelector('#player-title').innerHTML = musicTitle[playlistMusicaAtual];
  document.getElementById("audio").load();
  document.getElementById("audio").play();
  localStorage.setItem('playlistMusicaAtual', playlistMusicaAtual);
}

// Toca a música anterior
function prevMusic() {
  let playlist = JSON.parse(localStorage.getItem('playlist'));
  let playlistMusicaAtual = localStorage.getItem('playlistMusicaAtual');
  let musicTitle= JSON.parse(localStorage.getItem('playlistTitle'));
  
  playlistMusicaAtual = playlistMusicaAtual-1;
  if (playlistMusicaAtual >= playlist.length) {
  playlistMusicaAtual = 0; // volta para a última música
  }
  document.getElementById("audio").src = playlist[playlistMusicaAtual];
  document.querySelector('#player-title').innerHTML = musicTitle[playlistMusicaAtual];
  document.getElementById("audio").load();
  document.getElementById("audio").play();
  localStorage.setItem('playlistMusicaAtual', playlistMusicaAtual);

  }

// Inicia a reprodução da música
function playMusic() {
  const audio = document.querySelector('audio');
  audio.play();

  document.querySelector('#btn-play').style.display = 'none';
  document.querySelector('#btn-pause').style.display = 'inline';

}

// Pausa a reprodução da música
function pauseMusic() {
  const audio = document.querySelector('audio');
  audio.pause();

  document.querySelector('#btn-play').style.display = 'inline';
  document.querySelector('#btn-pause').style.display = 'none';

}

// Toca uma lista de músicas
function playAlbum(key, band, img) {
  acessMusicDB(key);

  localStorage.setItem('album_img', img)
     
  document.querySelector('#btn-play').style.display = 'none';
  document.querySelector('#btn-pause').style.display = 'inline';
  document.querySelector('#player-band').innerHTML = band;
  document.querySelector('#menu-player-img').src = img;
  document.querySelector('.conteiner').style.display = 'none';
  document.querySelector('.player-fullscreen').style.display = 'flex';

  progressUpdate();

  // Pula para a próxima música
  audio.addEventListener('ended', function() {
    nextMusic();

  });
}

// Atualiza a barra de progresso enquanto o áudio é tocado
function progressUpdate() {
  const audio = document.querySelector('audio');

  audio.addEventListener('timeupdate', function() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressPercent = (currentTime / duration) * 100;// Converte o tempo atual em porcentagem
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = progressPercent + '%';
  
  document.querySelector('#player-duration').innerHTML = parseInt(duration / 60)+":"+parseInt(duration % 60);
  document.querySelector("#player-current-duration").innerHTML = +parseInt(currentTime / 60)+":"+parseInt(currentTime % 60);
  
  });

}

// Fecha o player
function closePlayer() {
  document.querySelector('.conteiner').style.display = 'grid';
  document.querySelector('.player-fullscreen').style.display = 'none';

}

// Abre o player
function openPlayer() {
  document.querySelector('.conteiner').style.display = 'none';
  document.querySelector('.player-fullscreen').style.display = 'flex';

}

// faz o dawload da música atual
function musicDownload() {
  let playlist = JSON.parse(localStorage.getItem('playlist'));
  let playlistMusicaAtual = localStorage.getItem('playlistMusicaAtual');
  window.location.href = playlist[playlistMusicaAtual];

}

// Controla o volume da música atual
function controlVolume() {
  const audio = document.getElementById('audio');
  const controleVolume = document.getElementById('controleVolume');
  controleVolume.addEventListener('input', function() {
  audio.volume = controleVolume.value; 

  }); 
}

