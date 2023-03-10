# L-PLAYER


![alt text](img/print.png?raw=true)


# Sobre

L-player é um player de áudio criado com JavaScript puro, sem a necessidade de nenhuma biblioteca externa. Ele foi desenvolvido com o objetivo de oferecer uma experiência de áudio agradável e moderna.

# Arquivo music.json

O arquivo music.json contem os objetos com o link das músicas e seus respectivos títulos como no exemplo abaixo:

```json
"chave": {
    "album": "Nome do album ou playlist",
    "desc": "Descrição do album ou playlist",
    "musica": {
      "1": "https://example/audio.mp3"
    },
  
    "musica_titulo": {
      "1": "Titulo da música - Artista"
    }
  },
```


```html
<div class="conteiner-cards">

    <div class="card" onclick="playAlbum('eminem', 'Eminem', 'https://e.snmc.io/i/1200/s/c30ed237123d36e9ca1f64f75c9ddfd6/4280175')">
        <img  class="card-img" src="https://e.snmc.io/i/1200/s/c30ed237123d36e9ca1f64f75c9ddfd6/4280175"> 
        <span style="color: rgb(160, 236, 231); margin-left: 5px;">This is Eminem</span>
        <span style="margin-left: 5px;">Eminem</span>
    </div>
```

