# MOTUS

### Victoria Wiecaszek
### Zaafira Abou Soufienne

## Comment exécuter :
```
npm install
node script.js
```
Puis aller sur http://localhost:3000


## Fonctonnalités implémentées :

- Si c'est un nouveau joueur, il doit entrer un pseudo (login) pour jouer. Pour retourner à la page principale, il faut cliquer sur le lien *Back to Motus*. Le pseudo y sera affiché.
- Le joueur doit deviner le mot du jour en dans la barre de réponse. Le nombre d'essai n'est pas limité.
- Si le mot n'est pas bon, une pop-up apparaît avec le message 'Le mot n'est pas bon'.
- Si le mot est bon, une pop-up affiche que le mot est correct.
- En cliquant sur le lien *Score*, une page s'ouvre avec le score total du joueur ainsi que le nombre d'essai moyen pour chaque mot

## Diagramme de séquence :

```mermaid
sequenceDiagram
    sequenceDiagram
    Client->>+Server_auth: /
    Server_auth->>Client: login.html
    note right of Client : if user is not connected
    Client->>Server_auth: login & password
    Server_auth->>Client: token
    note right of Client : if login & password correct
    Client->>Server_motus: /callback?token=XXXX
    Server_motus->>Client: redirect_uri
    Client->>Server_auth: /authorize?redirect_uri=localhost:3000/index.html
    Server_auth->>Client: localhost:3000/index.html
    Server_motus->>Server_motus: /session
    note right of Server_motus: store login in session
    Client->>Server_motus: /word
    Server_motus->>Client: word of today
    Client->>Client: Guessing 
    Client->>Server_score: boolean guess (if the player failed or succeeded to find the word)
    Server_score->>Server_score: Calculation
    Server_score->>Client: score.html
    Client->>Server_motus: /logout
    Server_motus->>Client: destroy session & redirect to localhost:5000/login.html



            
```

## API Score
- we use a second node server which uses the port 3001 
- we call the API /score which takes as parameter the result of the submit of the player (true or false)
- we do not have a database yet, so we cannot handle more than one user (we use local storage)
- we want to store : login, password, the scores and average number of tries of each player

