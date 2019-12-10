package dromedario.bships;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.WebAttributes;
import org.springframework.web.bind.annotation.*;




import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

import static java.util.stream.Collectors.toList;
@CrossOrigin(origins = "http://localhost:3000")
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
    @Autowired
    private ScoreRepository scoreRepository;

    @Bean
    public PasswordEncoder passwordEncoderCont() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }



    private HashMap<String, Object> doMap(String key, Object value) {
        HashMap<String, Object> map = new LinkedHashMap<>();
        map.put(key, value);
        return map;
    }
//--------------------------------------------------------------players route
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(path = "/players", method = RequestMethod.GET)
    public Map<String, Object> getPlayers() {
        List<Object> playerList = new ArrayList<>();
        playerRepository.findAll().forEach(player -> {
            Map<String, Object> playerMap = new HashMap<>();
            playerMap.put("LOGGED",loggedPlayer());
            playerMap.put("username", player.getUserName());
            playerMap.put("id", player.getId());
            playerList.add(playerMap);
        });

        return doMap("players",playerList);
    }

    //--------------------------------------------------------------games route
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/games")
    public Map<String, Object> getGames() {
        List<Object> gamesList = new ArrayList<>();
        gameRepository.findAll().forEach(game -> {
            Map<String, Object> gameMap = new HashMap<>();
            gameMap.put("gamename", game.getGameName());
            gameMap.put("gmId", game.getGameId());
        gameMap.put("created", game.date.toString());
        gameMap.put("gamePlayers", GamePlayersOfGame(game));
        gamesList.add(gameMap);
    });
        return doMap("games",gamesList);

    }

//--------------------------------------------------------------#games route GET GAMEPLAYERS
    public List<Object> GamePlayersOfGame(Game game){
        List<Object> gamePlys = new ArrayList<>();
        game.getGamePlayers().stream().forEach(gamePlayerOfGame -> {
            Map<String, Object> gmPlyMap = new HashMap<>();
            gmPlyMap.put("gmPlyId", gamePlayerOfGame.getId());
            gmPlyMap.put("player", PlayerOfGamePlayer(gamePlayerOfGame) );
//            gmPlyMap.put("ships", ShipsOfGamePlayer(gamePlayerOfGame));
//            gmPlyMap.put("attacks", AttacksOfGamePlayer(gamePlayerOfGame));
            gmPlyMap.put("score", gamePlayerOfGame.getGmPlyScore(game));
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
        plyMap.put("password",player.getPassword());

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
        Authentication authentication;
        Map<String, Object> gameMap = new HashMap<>();

        gameMap.put("LOGGED",loggedPlayer());
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
        gameMap.put("enemy", getEnemyInfo(gamePlayer));

//            Long gameId = gamePlayer.getGame().getGameId();
//        Game game = gameRepository.findGameByGameId(gameId);
//        game.getGamePlayers().forEach(gamePlayerOfGame -> {
//            if (gamePlayerOfGame.getId()!= gamePlayer.getId()){
//                gameMap.put("EnGmPlyId", gamePlayerOfGame.getId());
//                gameMap.put("EnPlayer", PlayerOfGamePlayer(gamePlayerOfGame) );
//                gameMap.put("EnAttacks", AttacksOfGamePlayer(gamePlayerOfGame));
//            }});

            return gameMap;
                         }
//--------------------------------------------------------------get Enemy GamePlayer
public Map<String, Object> getEnemyInfo(GamePlayer gamePlayer){
    Long gameId = gamePlayer.getGame().getGameId();
    Game game = gameRepository.findGameByGameId(gameId);
    List<Object> enemyPlayer = new ArrayList<>();
    game.getGamePlayers().forEach(gamePlayerOfGame -> {
        Map<String, Object> gmPlyMap = new HashMap<>();
        if (gamePlayerOfGame.getId()!= gamePlayer.getId())
        {
            gmPlyMap.put("EnGmPlyId", gamePlayerOfGame.getId());
            gmPlyMap.put("EnPlayer", PlayerOfGamePlayer(gamePlayerOfGame) );
            gmPlyMap.put("EnAttacks", AttacksOfGamePlayer(gamePlayerOfGame));
            enemyPlayer.add(gmPlyMap);}
    });

    return doMap("enemyGmPly",enemyPlayer);
}
//--------------------------------------------------------------#ranking route
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/ranking")
    public List<HashMap<String, Object>> ScoreOfGamePlayer() {
        return playerRepository.findAll()
                .stream().map(player -> new HashMap<String, Object>() {{
                    put("UserName", player.getUserName());
                    put("scores", player.getScores()
                            .stream()
                            .map(score -> score.getScore()).collect(toList()));
                }}).collect(toList());
    }

//--------------------------------------------------------------#logged Player
    public String loggedPlayer (){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            return currentUserName;

        }
        else {return null;}
    }
//--------------------------------------------------------------POST player

    @RequestMapping(path = "/players", method = RequestMethod.POST)
    public ResponseEntity<Object> register(
            @RequestParam String userName, @RequestParam String password) {
        if ( userName.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>(doMap("error","something is missing"), HttpStatus.UNAUTHORIZED);
        }
        if (playerRepository.findByUserName(userName) !=  null) {
            return new ResponseEntity<>(doMap("error","user exists"), HttpStatus.UNAUTHORIZED);
        }
        Player newPlayer = playerRepository.save(new Player(userName, passwordEncoderCont().encode(password)));
        return new ResponseEntity<>(doMap("userName", newPlayer.getUserName()), HttpStatus.CREATED);
    }
}
