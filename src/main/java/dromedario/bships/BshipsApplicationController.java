package dromedario.bships;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import static java.util.stream.Collectors.toList;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

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
        gameMap.put("gameId", game.getGameId());
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
        game.getGamePlayers().forEach(gamePlayerOfGame -> {
            Map<String, Object> gmPlyMap = new HashMap<>();
            gmPlyMap.put("id", gamePlayerOfGame.getId());
            gmPlyMap.put("player", PlayerOfGamePlayer(gamePlayerOfGame) );
            gmPlyMap.put("ships", ShipsOfGamePlayer(gamePlayerOfGame));
            gamePlys.add(gmPlyMap);
        });
        return gamePlys;
    }
//--------------------------------------------------------------#games route GET PLAYERS
    public Object PlayerOfGamePlayer(GamePlayer gamePlayer){
        Player player = gamePlayer.getPlayer();
        Map<String, Object> plyMap = new HashMap<>();
        plyMap.put("playerId", player.getId());
        plyMap.put("name",player.getUserName());
        return plyMap;
    }
//--------------------------------------------------------------#games route GET SHIPS
    public List<Object> ShipsOfGamePlayer(GamePlayer gamePlayer){
        List<Object> shipsList = new ArrayList<>();
        gamePlayer.getShips().forEach(ship -> {
            Map<String, Object> shipsMap = new HashMap<>();
            shipsMap.put("ShipType", ship.getShipType());
            shipsMap.put("location",ship.getLocations());
            shipsList.add(shipsMap);
        });
        return shipsList;
    }
//--------------------------------------------------------------#games route for Game ID
    @RequestMapping("/game/{gameId}")
    private Object findGame(@PathVariable Long gameId) {
        Game game = gameRepository.findGameByGameId(gameId);
        return showGame(game);
    }
    private Map<String, Object> showGame(Game game) {
        Map<String, Object> gameMap = new HashMap<>();
        gameMap.put("gamename", game.getGameName());
        gameMap.put("id", game.getGameId());
        gameMap.put("created", game.date.toString());
        gameMap.put("gamePlayers", GamePlayersOfGame(game));
        return gameMap;
    }


//--------------------------------------------------------------#games_view route for gamePlayer ID
    @RequestMapping("/game_view/{gamePlayerId}")
    private Object gameView(@PathVariable Long gamePlayerId) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
                   return showGamePlayerGame(gamePlayer);
        }

//--------------------------------------------------------------#games_view route for gamePlayer ID GET SINGLE GAME
    private Map<String, Object> showGamePlayerGame(GamePlayer gamePlayer) {
        Map<String, Object> gameMap = new HashMap<>();
        gameMap.put("id", gamePlayer.getGame().getGameId());
        gameMap.put("created", gamePlayer.getGame().getDate().toString());
        gameMap.put("gamePlayers", PlayerOfGamePlayer(gamePlayer));
        gameMap.put("ships", ShipsOfGamePlayer(gamePlayer));
        return gameMap;
    }


}