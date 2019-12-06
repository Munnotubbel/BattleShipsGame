package dromedario.bships;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class BshipsApplicationController {

    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private GamePlayerRepository gamePlayerRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private AttackRepository attackRepository;
    //--------------------------------------------------------------players route
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/players")
    public Map<String,Object> getPlayers() {
        Map<String,Object> playerMap = new HashMap<>();
        playerMap.put("players",playerRepository.findAll());
        return playerMap;
    };
    //--------------------------------------------------------------games route
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/games")
    public Map<String, Object> getGames() {
        List<Object> gamesList = new ArrayList<>();
        gameRepository.findAll().stream().forEach(game -> {
            Map<String, Object> gameMap = new HashMap<>();
            gameMap.put("gamename", game.getGameName());
        gameMap.put("gmId", game.getGameId());
        gameMap.put("created", game.date.toString());
        gameMap.put("gamePlayers", GamePlayersOfGame(game));
        gamesList.add(gameMap);
    });
    Map<String, Object> map = new HashMap<>();
        map.put("games",gamesList);
        return map;
    }

//--------------------------------------------------------------#games route GET GAMEPLAYERS
    public List<Object> GamePlayersOfGame(Game game){
        List<Object> gamePlys = new ArrayList<>();
        game.getGamePlayers().stream().forEach(gamePlayerOfGame -> {
            Map<String, Object> gmPlyMap = new HashMap<>();
            gmPlyMap.put("gmPlyId", gamePlayerOfGame.getId());
            gmPlyMap.put("player", PlayerOfGamePlayer(gamePlayerOfGame) );
            gmPlyMap.put("ships", ShipsOfGamePlayer(gamePlayerOfGame));
            gmPlyMap.put("attacks", AttacksOfGamePlayer(gamePlayerOfGame));
            gamePlys.add(gmPlyMap);
        });
        return gamePlys;
    }
//--------------------------------------------------------------#games route GET PLAYERS
    public Object PlayerOfGamePlayer(GamePlayer gamePlayer){
        Player player = gamePlayer.getPlayer();
        Map<String, Object> plyMap = new HashMap<>();
        plyMap.put("plyId", player.getId());
        plyMap.put("name",player.getUserName());
        return plyMap;
    }
//--------------------------------------------------------------#games route GET SHIPS
    public List<Object> ShipsOfGamePlayer(GamePlayer gamePlayer){
        List<Object> shipsList = new ArrayList<>();
        gamePlayer.getShips().stream().forEach(ship -> {
            Map<String, Object> shipsMap = new HashMap<>();
            shipsMap.put("ShipType", ship.getShipType());
            shipsMap.put("location",ship.getLocations());
            shipsList.add(shipsMap);
        });
        return shipsList;
    }
//--------------------------------------------------------------#games route GET ATTACKS
public List<Object> AttacksOfGamePlayer(GamePlayer gamePlayer){
    List<Object> listOfAttacks = new ArrayList<>();
    gamePlayer.getAttacks().stream().forEach(attack -> {
        Map<String, Object> attacksInfo = new HashMap<>();
        attacksInfo.put("turn", attack.getTurn());
        attacksInfo.put("attackLocations",attack.getAttackLocations());
        listOfAttacks.add(attacksInfo);
    });
    return listOfAttacks;
}

//--------------------------------------------------------------#games route for Game ID
    @RequestMapping("/game/{gameId}")
    public Object findGame(@PathVariable Long gameId) {
        Game game = gameRepository.findGameByGameId(gameId);
        return showGame(game);
    }
    public Map<String, Object> showGame(Game game) {
        Map<String, Object> gameMap = new HashMap<>();
        gameMap.put("gamename", game.getGameName());
        gameMap.put("id", game.getGameId());
        gameMap.put("created", game.date.toString());
        gameMap.put("gamePlayers", GamePlayersOfGame(game));
        return gameMap;
    }


//--------------------------------------------------------------#games_view route for gamePlayer ID
    @RequestMapping("/game_view/{gamePlayerId}")
    public Object gameView(@PathVariable Long gamePlayerId) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
                        return showGamePlayerGame(gamePlayer);
        }
//--------------------------------------------------------------#games_view route for gamePlayer ID GET SINGLE GAME
    public Map<String, Object> showGamePlayerGame(GamePlayer gamePlayer) {

        Map<String, Object> gameMap = new HashMap<>();
        gameMap.put("gmId", gamePlayer.getGame().getGameId());
        gameMap.put("gmName", gamePlayer.getGame().getGameName());
        gameMap.put("gmPlyId", gamePlayer.getId());
        gameMap.put("created", gamePlayer.getGame().getDate().toString());
        gameMap.put("gamePlayers", PlayerOfGamePlayer(gamePlayer));
        gameMap.put("ships", ShipsOfGamePlayer(gamePlayer));
        gameMap.put("attacks", AttacksOfGamePlayer(gamePlayer));
//        gameMap.put("enemy", getEnemyInfo(gamePlayer));

            Long gameId = gamePlayer.getGame().getGameId();
            Game game = gameRepository.findGameByGameId(gameId);
            game.getGamePlayers().forEach(gamePlayerOfGame -> {
                if (gamePlayerOfGame.getId()!= gamePlayer.getId()){
                    gameMap.put("EnGmPlyId", gamePlayerOfGame.getId());
                    gameMap.put("EnPlayer", PlayerOfGamePlayer(gamePlayerOfGame) );
                    gameMap.put("EnAttacks", AttacksOfGamePlayer(gamePlayerOfGame));
                    }});

            return gameMap;
                         }
//--------------------------------------------------------------get Enemy GamePlayer
//public List<Object> getEnemyInfo(GamePlayer gamePlayer){
//    Long gameId = gamePlayer.getGame().getGameId();
//    Game game = gameRepository.findGameByGameId(gameId);
//    List<Object> enemyPlayer = new ArrayList<>();
//    game.getGamePlayers().forEach(gamePlayerOfGame -> {
//        Map<String, Object> gmPlyMap = new HashMap<>();
//        if (gamePlayerOfGame.getId()!= gamePlayer.getId())
//        {
//            gmPlyMap.put("gmPlyId", gamePlayerOfGame.getId());
//            gmPlyMap.put("player", PlayerOfGamePlayer(gamePlayerOfGame) );
//            gmPlyMap.put("attacks", AttacksOfGamePlayer(gamePlayerOfGame));
//            enemyPlayer.add(gmPlyMap);}
//    });
//        return enemyPlayer;
//}



}