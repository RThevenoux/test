# Démarrage (mode production)

Pour lancer le projet avec Docker Compose
- Nota: les ports utilisés par défaut sont 4300 et 8080, ils peuvent être modifier dans le fichier docker-compose.yml

```bash
docker-compose build
docker-compose up
```

Lorsque les service `back` et `front` sont up :
- accéder à l'interface : http://localhost:4300
- accéder au Swagger du back-end  : http://localhost:8080/api

# Architecture

## Back-end
- Le back-end utilise Typescript et le framework NestJS
- Au démarrage de l'application le fichier .json contenant les mutations est lu, analysé et stocké en mémoire
- Une API "REST" permet de récupérer les mutations et de modifier l'état de validation.
- L'API est documenté automatiquement avec Swagger (OpenAPI)
- Deux variable d'environnement sont disponibles :
  - `PORT` : port écouté par le serveur
  - `DATA_SOURCE` : chemin d'accès au fichier .json
- Le fichier .json n'est pas inclu dans l'image Docker et doit être monter comme un volume

## Front-end
- Le front-end utilise Typescript et le framework React
- Le projet a été créé avec `create-react-app` qui met automatiquement en place les outils de build
- La bibliothèque Bootstrap est utilisé pour les composants de base et la mise en forme
- Afin de gérer les requêtes 'CORS', un mécanisme de reverse-proxy est utilisé :
  - les requêtes envoyées sur `/api` sont redirigées vers le back-end
  - les autres requêtes sont prise en charge par le front-end
  - en développement, l'attribut `proxy` dans `package.json` permet de configurer le serveur lancer par `react-script`
  - en production, le serveur utilisé est `nginx`, il est configuré par le fichier `nginx.conf`
    - Nota : l'url du back-end est codé en dur et utilise le nom défini dans le docker-compose ('back')

