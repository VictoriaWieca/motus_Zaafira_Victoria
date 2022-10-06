# MOTUS

### Victoria Wiecaszek
### Zaafira Abou Soufienne


Fonctonnalités implémentées :

- Si c'est un nouveau joueur, il doit entrer un pseudo (login) pour jouer. Pour retourner à la page principale, il faut cliquer sur le lien *Back to Motus*. Le pseudo y sera affiché.
- Le joueur doit deviner le mot du jour en dans la barre de réponse. Le nombre d'essai n'est pas limité.
- Si le mot n'est pas bon, une pop-up apparaît avec le message 'Le mot n'est pas bon'.
- Si le mot est bon, une pop-up affiche que le mot est correct.
- En cliquant sur le lien *Score*, une page s'ouvre avec le score total du joueur ainsi que le nombre d'essai moyen pour chaque mot

```mermaid
sequenceDiagram
    Client->>+Server: /
    Server->>Client: index.html
    note right of Client : if local storage is empty (no username)
    Client->>Server: /login.html
    Server->>Client: login.html
    note right of Client : set login in local storage
    Client->>Server: /index.html
    Server->>Client: index.html
    Client->>Server: /word
    Server->>Client: word_of_today
    note left of Client: Guessing
    Client->>Client:Guessing and storing information to local storage
    Client->>Server: score.html
    Server->>Client: score.html
    Client->>Client: display score from local storage
```

