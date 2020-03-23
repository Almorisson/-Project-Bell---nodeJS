# :notebook_with_decorative_cover: Project Bell - nodeJS
# Project-Bell-nodeJS

@authors : Mor NDIAYE - Ludovic JAFFREZOU


1) Pour tester l'API, il faut tout d'abord faire un clone du repo en local avec la commande suivante:
   
```sh

git clone https://github.com/Almorisson/Project-Bell-nodeJS.git

```

1) Renommer le fichier dev.example.js qui se trouve dans le dossier config en dev.js et y mettre les bonnes valeurs dans les variables respectives.
   
2) Puis installer les dépendances du projet en tapant la commande suivante:
   
```sh

docker-compose up

``` 

pour build and lancer les container qui héberge les microservices qui composent l'API, à savoir `Node.js` et `MongoDB`.

A noter que cette commande est à faire à la racine du projet.

Par défaut, le projet est en mode `dev` mais vous le mettre en mode `prod` en changant juste dans le fichier `docker-compose.yml` la commande suivante: 

```sh

npm run dev

```
en 

```sh

npm start

```
## [Implémentation de l'API Break-Bell](#bb)

1. Les Principales fonctionnalités de l'API **Break-Bell**

 - Les Utilisateurs

A ce stade du projet, l'API **Break-Bell** permet à tout client (Web ou mobile) de permettre à utilisateur de se créer un compte, de se connecter/déconnecter, de supprimer son compte si besoin, de voir la liste de tous les autres utilisateurs(étudiants de l'IPSSI) ayant créer un compte sur notre le site web ou application et de modifier aussi les informations de son compte (profil basique pour le moment mais des améliorations très prochainement permettrons d'avoir un profil avec des médias riches: photo, avatar, et plus). 

 - Les Sounds

En plus de cette authentification que propose l'API **Break-Bell**,  tout utilisateur à la possibilité de soumettre un son favori pour le placer comme choix ultime de son pour la pâuse des `IPSSIENS`. Pour un soucis de fluidité et de staockage dans le future, un utilsateur ne peut pas soumettre un son qui a dèjà été soumis(e) par un(e) autre étudiant(e).

Cela permettra de favoriser de la creativite au passage puisque chaque étudiant va devoir toujours trouver de nouveaux sons s'il veut continuer à prposer de nouveaux sons. Ceci permettra facilement de voir les sons les plus soumis et ainsi sur les améliorations à venir, nous pourrions mettre en place un système de **Data visualisation sur le rating des songs**.


2. Les améliorations et les fonctionnalités **à venir** 

Améliorer le système d'authentication comme [mentionner plus haut](#1) pour le mettre au même pied d'estale que les les systèmes d'authentification moderne. On accentuera sur la sécurité de cette dernière afin de rtendre notre API la plus fiable possible.

Un système de rôles était également prévu et fera donc partie des fonctionnalités à venir.

Ce système de rôles permettra en toute évidence de mettre en place un système de modération.

Il est également prévu comme fonctionnalité majeure, **un système de scrapping** qui permettra à nos utilisateurs de remplir de façon automatiquement le formulaire de soumission des sons en indiquant uniquement le lien du son qui souhaite soumette. Nous profiterons de la mise en place de cette fonctionnalité pour permette à nos utilisateurs de soumettre des compositions personnelles avec une sauvegarde du media dans une base de donnés dediée à ce cas de figure.
