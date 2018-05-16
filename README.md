# Crime-Mystery
SIT305 Assingment 02 - Text based RPG game 2018

Felipe(Phil) Menezes Silva - SID 215242834

#Platform
- Android
- IOS
- Windows mobile

https://github.com/felm84/Crime-Mystery

#OVERVIEW
This app is a project developed for SIT305 - Android and Ios Mobile Programming.
It is basically a text-based RPG game, where the player investigates a crime in
a medium size but very developed city.
The game consists in selecting diferent locations, talk to other characteres,
collect the items found in each location, analyse them and then make an arrest.
Each item has a diferent analyse time which can take up to 2 days to be analysed.
Arrest can only be done once, so if the player arrests the wrong character it's
a game over. Every time a new game is started, another character is assigned as
the criminal.

#Major Pages
- ContactListPage - src/pages/contact-list
- CurrentLocationPage - src/pages/current-location
- PlusMenu - src/pages/current-location
- FinalPage - src/pages/final
- HomePage - src/pages/home
- ItemListPage - src/pages/item-list
- LocationListPage - src/pages/location-list
- MenuPage - src/pages/menu
- ModalContentPage - src/pages/modal-content
- PresentationPage - src/pages/presentation
- TabsPage - src/pages/tabs

#Major Classes
- AlertProvider - src/providers/alert
    - presentAlert()

- DataProvider - src/providers/data
    - loadContent()
    - loadForNative()
    - loadForBrowser()
    - getCharacters()
    - getSpeeches()
    - getLocations()
    - getItems()

- GameProvider - src/providers/game
    - setMurderer()
- ItemProvider - src/providers/item
    - addItem()
    - converDate()
    - analyseItem()
    - findItem()
    - removeItem()

- LocationProvider - src/providers/location
    - findItem()
    - feedItemsList()
    - releaseItem()

- NpcProvider - src/providers/npc
    - findSpeech()
    - feedSpeechesList()
    - findNpc()
    - greetPlayer()
    - answer()
    - performFirstApproach()
    - performSecondApproach()
    - performWatsonApproach()

- PlayerProvider - src/providers/player
    - makeArrest()
    - answerNpc()
    - performFirstApproach()
    - performSecondApproach()
    - answerWatson()
    - removeItem()
    - addLocation()
    - removeLocation()
    - addContact()
    - removeContact()

- SaveProvider - src/providers/save
    - startNewGame()
    - saveGame()
    - loadGame()
    - clearGame()

# Henry comments 13/April: 
- JSON data is looking interesting. I'm curious how you'll make conversations work from here (note that if you find one format doesn't work or isn't convenient enough going forward, refactor as necessary).
- Your sherlock images isn't listed in license.txt

# Felipe comments 13/April:
- More JSON data mock for speeches will be added this week. Conversation mechanism is fixed, tested and working now, it will receive more options, both player and npc.
- Images will also be added in license.txt

# Henry's Comments 27/April
- do keep my comments in here from previous iterations, so I can see what I've said before
- compile instructions + directory explanation still missing
- most other things are looking good!


