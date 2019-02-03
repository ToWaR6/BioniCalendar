# BioniCalendar

L’application BioniCalendar fait grâce à Ionic/Cordova permet de gérer les évènements à la manière de [Coolendar](https://github.com/ToWaR6/Coolendar).

## Les fonctionnalités proposées

BioniCalendar propose les fonctionnalités suivantes : 

### Les fonctionnalités simples

* Enregistrer (Ajouter) un évènement à une date et heure précise avec un titre, une note, une photo et un type d'évènement parmi Anniversaire, Rendez-vous, Sport, Santé, Autres et Aucun. Cet ajout se fait dans l'onglet "Ajouter" prévu à cet effet. 
* Sur la page d'accueil (Onglet "Rechercher"), il est possible de rechercher un évènement en fonction du type de l'évènement ou de sa date. La recherche sans condition affiche tous les évènements enregistrés. Après une recherche, les évènements sont affichés par ordre de leur date de rappel.
* Après une recherche, seuls les titres des évènements correspondants sont affichés. En cliquant sur un évènement, on peut voir cet évènement de manière plus détaillé sur une nouvelle page affichant tous les éléments enregistrés lors de l'ajout. 

### La base de données

* BioniCalendar sauvegarde les évènements dans une base de données SQLite.

### Prise de photo

* Lors de l'ajout d'un évènement, l'utilisateur peut ajouter une photo s'il le souhaite. Soit en prenant une nouvelle photo, soit en ajoutant une photo présente dans sa galerie.

### Notifications

* Sur l'onglet "Notifications", l'utilisateur pourra choisir les types évènements dont il veut être notifié. Ces choix sont gardés dans les préférences de l’application ce qui permet de les retrouver lors d’une future utilisation.
