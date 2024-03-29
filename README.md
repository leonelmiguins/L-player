# L-PLAYER

![alt text](img/print2.png?raw=true)

# Link

Visualize aqui: https://leonelmiguins.github.io/L-player/

# Sobre

**L-player** é um player de áudio criado com JavaScript puro, sem a necessidade de nenhuma biblioteca externa.<br>
Ele foi desenvolvido com o objetivo de oferecer uma experiência de áudio agradável e moderna.

# Adicionando suas músicas

```json
"id": {
    "band": "Nome do artista", "album": "Nome do album / playlist", "genero": "Genero",
    "desc": "Descrição do album ou playlist",
    "musica": {
      "1": "https://example/audio.mp3"
    },
  
    "musica_titulo": {
      "1": "Titulo da música"
    }
  },
```

Este é  um exemplo de um objeto dentro do arquivo **music.json** que contém informações relacionadas a<br>
um artista musical, um álbum ou uma playlist, bem como suas respectivas músicas.<br>
Aqui está uma explicação das diferentes chaves e valores:

"**id**": é a chave principal do objeto, que é usada para identificar a playlist ou album.<br>
"**band**": é uma chave que armazena o nome do artista musical.<br>
"**album**": é uma chave que armazena o nome do álbum ou playlist.<br>
"**genero**": é uma chave que armazena o gênero musical do álbum ou playlist.<br>
"**desc**": é uma chave que armazena uma descrição do álbum ou playlist.<br>
"**musica**": é uma chave que armazena um objeto com links para os arquivos de áudio das músicas do álbum ou playlist.<br>
No exemplo, há apenas uma música representada pela chave "1", mas poderia haver mais músicas, representadas pelas chaves "2", "3", etc.<br>
"**musica_titulo**": é uma chave que armazena um objeto com os títulos das músicas do álbum ou playlist.<br>
Assim como em "musica", há apenas um título de música representado pela chave "1", mas poderia haver mais títulos de música.<br>




