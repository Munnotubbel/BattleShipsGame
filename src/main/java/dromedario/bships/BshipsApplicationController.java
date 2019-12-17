package dromedario.bships;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import java.lang.reflect.Array;
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
        HashMap<String, Object> map = new HashMap<>();
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
            playerMap.put("LOGGED", loggedPlayer());
            playerMap.put("username", player.getUserName());
            playerMap.put("id", player.getId());
            playerList.add(playerMap);
        });

        return doMap("players", playerList);
    }

    //--------------------------------------------------------------games route
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/games")
    public Map<String, Object> getGames() {
        System.out.println("------------IN GAMES ROUTE");
        List<Object> gamesList = new ArrayList<>();
        gameRepository.findAll().forEach(game -> {
            Map<String, Object> gameMap = new HashMap<>();
            gameMap.put("playerCount", game.getGamePlayers().stream().count());
            gameMap.put("gmId", game.getGameId());
            gameMap.put("created", game.date.toString());
           gameMap.put("gamePlayer", GamePlayersOfGame(game));
            gamesList.add(gameMap);
        });
        return doMap("games", gamesList);

    }

    //--------------------------------------------------------------#games route GET GAMEPLAYERS
    public List<Object> GamePlayersOfGame(Game game) {
        List<Object> gamePlys = new ArrayList<>();
        game.getGamePlayers().stream().forEach(gamePlayerOfGame -> {
            Map<String, Object> gmPlyMap = new HashMap<>();
            gmPlyMap.put("gmPlyId", gamePlayerOfGame.getId());
            gmPlyMap.put("player", PlayerOfGamePlayer(gamePlayerOfGame));
//            gmPlyMap.put("ships", ShipsOfGamePlayer(gamePlayerOfGame));
//            gmPlyMap.put("attacks", AttacksOfGamePlayer(gamePlayerOfGame));
            gmPlyMap.put("score", gamePlayerOfGame.getGmPlyScore(game));
            gamePlys.add(gmPlyMap);
        });
        return gamePlys;
    }

    //--------------------------------------------------------------#games route GET PLAYERS
    public Object PlayerOfGamePlayer(GamePlayer gamePlayer) {
        Player player = gamePlayer.getPlayer();
        Map<String, Object> plyMap = new HashMap<>();
        plyMap.put("plyId", player.getId());
        plyMap.put("name", player.getUserName());
        return plyMap;
    }

    //--------------------------------------------------------------#games route GET SHIPS
    public List<Object> ShipsOfGamePlayer(GamePlayer gamePlayer) {
        List<Object> shipsList = new ArrayList<>();
        gamePlayer.getShips().stream().forEach(ship -> {
            Map<String, Object> shipsMap = new HashMap<>();
            shipsMap.put("ShipType", ship.getShipType());
            shipsMap.put("location", ship.getLocations());
            shipsList.add(shipsMap);
        });
        return shipsList;
    }

    //--------------------------------------------------------------#games route GET ATTACKS
    public List<Object> AttacksOfGamePlayer(GamePlayer gamePlayer) {
        List<Object> listOfAttacks = new ArrayList<>();
        gamePlayer.getAttacks().stream().forEach(attack -> {
            Map<String, Object> attacksInfo = new HashMap<>();
            attacksInfo.put("turn", attack.getTurn());
            attacksInfo.put("attackLocations", attack.getAttackLocations());
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
        gameMap.put("LOGGED", loggedPlayer());
        gameMap.put("id", game.getGameId());
        gameMap.put("created", game.date.toString());
        gameMap.put("gamePlayers", GamePlayersOfGame(game));

        return gameMap;
    }
    //--------------------------------------------------------------Check next Turn
   Map<String,Object> checkNextTurn(Game game,GamePlayer gamePlayer,Authentication authentication) {
        List<Integer> myTurns = new ArrayList<>();
        List<Integer> enTurns= new ArrayList<>();
        Integer myShipNum = gamePlayer.getShips().size();
        Integer enShipNum = enGamePlayer(gamePlayer).getShips().size();




        game.gamePlayers.stream().forEach(gp->{
            if (gp.getPlayer().getUserName()==authentication.getName()){

                if (gp.getAttacks().size()>1){
                    gp.getAttacks().stream().forEach(atck-> {
                        myTurns.add(atck.getTurn());
                    });}
                else {myTurns.add(1);}
                }
            else {
                if (gp.getAttacks().size()>1){
                gp.getAttacks().stream().forEach(atck-> {
                    enTurns.add(atck.getTurn());
                });}
                else {enTurns.add(1);}}

    });
       Integer myMax=(Collections.max(myTurns));
       Integer enMax=(Collections.max(enTurns));

       Boolean enCanFire;
       Boolean selfCanFire;

       if(myMax==enMax)
       { enCanFire= true;
            selfCanFire=true;}
       else if(myMax<enMax){
           enCanFire= false;
           selfCanFire=true;
       }
       else {enCanFire= true;
           selfCanFire=false;}

       Map<String, Object> turnInfo = new HashMap<>();
       turnInfo.put("selfCanFire", selfCanFire );
       turnInfo.put("EnCanFire", enCanFire );
       turnInfo.put("round", myMax);
       turnInfo.put("myAtmTurn", myMax);
       turnInfo.put("EnAtmTurn", enMax);
       turnInfo.putAll(gameProgress(gamePlayer, authentication));
       return turnInfo;
    }
    //--------------------------------------------------------------Next Turn request
    @RequestMapping("/game_view/{gamePlayerId}/checkNext")
    public Map<String,Object> shotChecker(@PathVariable Long gamePlayerId,Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
        Map<String, Object> nextMap = new HashMap<>();
        nextMap.putAll(checkNextTurn(gamePlayer.getGame(), gamePlayer, authentication));
        return nextMap;
    }
    //--------------------------------------------------------------#games_view route for gamePlayer ID
    @RequestMapping("/game_view/{gamePlayerId}")
    public Object gameView(@PathVariable Long gamePlayerId, Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);
        if (gamePlayer.getPlayer().getUserName() == authentication.getName()){

            return showGamePlayerGame(gamePlayer, authentication);}

        else { return new ResponseEntity<>(doMap("error", "this is not your Gameplayer! cheater!"), HttpStatus.UNAUTHORIZED);}
    }

    //--------------------------------------------------------------#games_view route for gamePlayer ID GET SINGLE GAME
    public Map<String, Object> showGamePlayerGame(GamePlayer gamePlayer,Authentication authentication) {
        Map<String, Object> gameMap = new HashMap<>();

        gameMap.put("turnInfo", checkNextTurn(gamePlayer.getGame(),gamePlayer,authentication));
        gameMap.put("gmId", gamePlayer.getGame().getGameId());
        gameMap.put("gmPlyId", gamePlayer.getId());
        gameMap.put("created", gamePlayer.getGame().getDate().toString());
        gameMap.put("player", PlayerOfGamePlayer(gamePlayer));
        gameMap.put("ships", ShipsOfGamePlayer(gamePlayer));
        gameMap.put("attacks", AttacksOfGamePlayer(gamePlayer));

        gamePlayer.getGame().getGamePlayers().forEach(gamePlayerOfGame -> {
            if (gamePlayerOfGame.getId()!= gamePlayer.getId()) {
                gameMap.put("EnGmPlyId", gamePlayerOfGame.getId());
                gameMap.put("EnPlayer", PlayerOfGamePlayer(gamePlayerOfGame));
                gameMap.put("EnAttacks", AttacksOfGamePlayer(gamePlayerOfGame));
            }});

                gameMap.putAll(gameProgress(gamePlayer,authentication));

        return gameMap;
    }
    //--------------------------------------------------------------game Progress

    public  Map<String, Object> gameProgress(GamePlayer gamePlayer, Authentication authentication){
        Map<String, Object>  gameOverMap = new HashMap<>();
        List<Integer> myHits=new ArrayList<>();
        List<Integer> myAttacks=new ArrayList<>();
        List<Integer> enHits=new ArrayList<>();
        List<Integer> EnAttacks=new ArrayList<>();
        GamePlayer enPlayer = enGamePlayer(gamePlayer);
        Long gameId = gamePlayer.getGame().getGameId();
        Game game = gameRepository.findGameByGameId(gameId);



        List<Integer> myTurns = new ArrayList<>();
        List<Integer> enTurns= new ArrayList<>();

        game.gamePlayers.stream().forEach(gp->{
            if (gp.getPlayer().getUserName()==authentication.getName()){

                if (gp.getAttacks().size()>1){
                    gp.getAttacks().stream().forEach(atck-> {
                        myTurns.add(atck.getTurn());
                    });}
                else {myTurns.add(1);}
            }
            else {
                if (gp.getAttacks().size()>1){
                    gp.getAttacks().stream().forEach(atck-> {
                        enTurns.add(atck.getTurn());
                    });}
                else {enTurns.add(1);}}

        });
        Integer myMax=(Collections.max(myTurns));
        Integer enMax=(Collections.max(enTurns));

        if (gamePlayer.getAttacks().size()>0){
            gamePlayer.getAttacks().stream().forEach(atk->{
                atk.getAttackLocations().stream().forEach(pos->myAttacks.add(pos));});
        };

        game.getGamePlayers().forEach(gamePlayerOfGame -> {
            if (gamePlayerOfGame.getId()!= gamePlayer.getId()){



                if (gamePlayerOfGame.getShips().size()>0 && myAttacks.size()>0){
                    List<Integer> EnShips=new ArrayList<>();
                    gamePlayerOfGame.getShips().stream().forEach(ship->{
                        ship.getLocations().stream().forEach(pos->EnShips.add(pos)
                        );
                    });
                    Collection<Integer> similar = new HashSet<Integer>( EnShips );
                    similar.retainAll( myAttacks );
                    myHits.addAll(similar);
                }
                if (AttacksOfGamePlayer(gamePlayerOfGame).size()>0){

                    gamePlayerOfGame.getAttacks().stream().forEach(atck->{
                        atck.getAttackLocations().stream().forEach(pos->EnAttacks.add(pos));
                    });
                    List<Integer> myShipsPos=new ArrayList<>();
                    gamePlayer.getShips().stream().forEach(ship->{
                        ship.getLocations().stream().forEach(pos->myShipsPos.add(pos));
                    });

                    Collection<Integer> similar = new HashSet<Integer>( EnAttacks );
                    similar.retainAll( myShipsPos );
                    enHits.addAll(similar);
                }
                gameOverMap.put("EnHits", enHits);
                gameOverMap.put("myHits", myHits);
                System.out.println("MY HITS: " +myHits);
                System.out.println("MY HITS size: " +myHits.size());
                System.out.println(authentication.getName());
                System.out.println("MY TURN: "+myMax);
                System.out.println("EN HITS: " +enHits);
                System.out.println("EN HITS size: " +enHits.size());
                System.out.println(authentication.getName());
                System.out.println("EN TURN: "+enMax);



            }});
        if(myHits.size()==enHits.size() && myHits.size()==14 && enHits.size()==14 &&  myMax==enMax){
            System.out.println("TIE TIE TIE TIE TIE TIE TIE TIE TIE");
            System.out.println(authentication.getName());
            System.out.println("---------------------------------------------");
            if (gamePlayer.getGame().getScores().size()==0){
                Score score1=new Score(0.5,new Date());
                Score score2=new Score(0.5,new Date());
                gamePlayer.getGame().addScore(score1);
                gamePlayer.getPlayer().addScore(score1);
                enPlayer.getGame().addScore(score2);
                enPlayer.getPlayer().addScore(score2);
                scoreRepository.save(score1);
                scoreRepository.save(score2);
                gameRepository.save(gamePlayer.getGame());
                playerRepository.save(gamePlayer.getPlayer());
                playerRepository.save(enPlayer.getPlayer());}
            gameOverMap.put("gameOver", true);
            gameOverMap.put("gameResult", "it's a tie");
        }
//                else if ((myHits.size()==14 && enHits.size()<14 && myMax==enMax)||(myHits.size()<14 && enHits.size()==14)){

        else if (myHits.size()==14 && enHits.size()!=14 && myMax==enMax){
            System.out.println("IM A WARRIO IM A GONNA WINNA");
            System.out.println(authentication.getName());
            System.out.println("---------------------------------------------");
            if (gamePlayer.getGame().getScores().size()==0){
                Score score1=new Score(1.0,new Date());
                Score score2=new Score(0.0,new Date());
                gamePlayer.getGame().addScore(score1);
                gamePlayer.getPlayer().addScore(score1);
                enPlayer.getGame().addScore(score2);
                enPlayer.getPlayer().addScore(score2);
                scoreRepository.save(score1);
                scoreRepository.save(score2);
                gameRepository.save(gamePlayer.getGame());
                playerRepository.save(gamePlayer.getPlayer());
                playerRepository.save(enPlayer.getPlayer());}
            gameOverMap.put("gameOver", true);
            gameOverMap.put("gameResult", "you win");
        }
        else if (enHits.size()==14 &&  myHits.size()!=14  && myMax==enMax){
            System.out.println("NOOB NOOB OMG");
            System.out.println(authentication.getName());
            System.out.println("---------------------------------------------");
            if (gamePlayer.getGame().getScores().size()==0){
                Score score1=new Score(0.0,new Date());
                Score score2=new Score(1.0,new Date());
                gamePlayer.getGame().addScore(score1);
                gamePlayer.getPlayer().addScore(score1);
                enPlayer.getGame().addScore(score2);
                enPlayer.getPlayer().addScore(score2);
                scoreRepository.save(score1);
                scoreRepository.save(score2);
                gameRepository.save(gamePlayer.getGame());
                playerRepository.save(gamePlayer.getPlayer());
                playerRepository.save(enPlayer.getPlayer());}
            gameOverMap.put("gameOver", true);
            gameOverMap.put("gameResult", "you lose");
        }
//                }
        else { gameOverMap.put("gameOver", false);}

        return  gameOverMap;
    }
    //--------------------------------------------------------------get Enemy GamePlayer

    //--------------------------------------------------------------#ranking route
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/ranking")
    public List<HashMap<String, Object>> ScoreOfGamePlayer() {
        System.out.println("------------IN RANKING ROUTE");
        return playerRepository.findAll()
                .stream().map(player -> new HashMap<String, Object>() {{
                    put("UserName", player.getUserName());
                    put("scores", player.getScores()
                            .stream()
                            .map(score -> score.getScore()).collect(toList()));
                }}).collect(toList());
    }

    //--------------------------------------------------------------#logged Player
    public String loggedPlayer() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            return currentUserName;

        } else {
            return null;
        }
    }
    //--------------------------------------------------------------Enemy GamePlayer
    private GamePlayer enGamePlayer(GamePlayer gamePlayer){
        Map<String, GamePlayer> enGmPly = new HashMap<>();
        if(gamePlayer.getGame().getGamePlayers().size() == 2){
            gamePlayer.getGame().getGamePlayers()
                    .stream()
                    .forEach(gp -> {
                        if(gp.getId() != gamePlayer.getId()){
                            enGmPly.put("opponent", gp);
                        }
                    });
        }else{
            enGmPly.put("opponent", null);
        }

        return enGmPly.get("opponent");
    }

//--------------------------------------------------------------POST player

    @RequestMapping(path = "/players", method = RequestMethod.POST)
    public ResponseEntity<Object> register(
            @RequestParam String userName, @RequestParam String password) {
        if (userName.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>(doMap("error", "something is missing"), HttpStatus.UNAUTHORIZED);
        }
        if (playerRepository.findByUserName(userName) != null) {
            return new ResponseEntity<>(doMap("error", "user exists"), HttpStatus.UNAUTHORIZED);
        } else {
            Player newPlayer = playerRepository.save(new Player(userName, passwordEncoderCont().encode(password)));
            return new ResponseEntity<>(doMap("userName", newPlayer.getUserName()), HttpStatus.CREATED);
        }
    }


//--------------------------------------------------------------get Empty Game
    public List<Game> getEmptyGame() {
        List<Game> gamesList = new ArrayList<>();
        gameRepository.findAll().forEach(game -> {
             if (game.getGamePlayers().stream().count()<2){gamesList.add(game);}

        });
        return gamesList;
    }

//--------------------------------------------------------------Create & Join Game
@CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(path = "/lookForGame")
    public ResponseEntity<Object> createGame(Authentication authentication) {
        ArrayList<GamePlayer> listOne = new ArrayList<>();
        playerRepository.findByUserName(authentication.getName()).getGamePlayers().stream().forEach(gp -> listOne.add(gp));

        if (authentication.getName() == null) {
            return new ResponseEntity<>(doMap("error", "please login"), HttpStatus.UNAUTHORIZED);
        }
        if (getEmptyGame().stream().count() >0 &&
            getEmptyGame().get(0).getGamePlayers().retainAll(listOne) && authentication.getName() != null){
                 GamePlayer newGamePlayer = gamePlayerRepository.save(new GamePlayer(playerRepository.findByUserName(loggedPlayer()),getEmptyGame().get(0)));
                 return new ResponseEntity<>(doMap("newGmPly", newGamePlayer.getGame()), HttpStatus.CREATED);
                }

        if (getEmptyGame().stream().count() ==0 && authentication.getName() != null){
                System.out.println(authentication.getName() + " MACH NEUES GAME ALLA");
                Game newGame = gameRepository.save(new Game(new Date()));
                GamePlayer newGamePlayer = gamePlayerRepository.save(new GamePlayer(playerRepository.findByUserName(loggedPlayer()),newGame));
                return new ResponseEntity<>(doMap("newGm", newGame.getGameId()), HttpStatus.CREATED);
                }

        else {return new ResponseEntity<>(doMap("error", "spiel zu ende du hoden"), HttpStatus.UNAUTHORIZED);}
            };
//--------------------------------------------------------------Post Ships
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(path = "/game_view/{gamePlayerId}/ships", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> postShips(@PathVariable Long gamePlayerId,@RequestBody List<Ship> ships, Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);




        if (authentication.getName() == null) {
            return new ResponseEntity<>(doMap("error", "please login"), HttpStatus.UNAUTHORIZED);
        }
        ships.forEach(ship -> {
            gamePlayer.addShip(ship);
           gamePlayerRepository.save(gamePlayer);
            shipRepository.save(ship);

        });

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(path = "/game_view/{gamePlayerId}/attacks", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> postAttacks(@PathVariable Long gamePlayerId,@RequestBody List<Attack> attacks, Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRepository.findGamePlayerById(gamePlayerId);


        if (authentication.getName() == null) {
            return new ResponseEntity<>(doMap("error", "please login"), HttpStatus.UNAUTHORIZED);
        }
        attacks.forEach(attack -> {
            Attack fire = new Attack(attack.getTurn()+1, attack.getAttackLocations() );
            System.out.println("FIRE IN THE HOLE -<-<-<-<-<-<-<-<-<-<-<-<");
            System.out.println(attack.getTurn());
            System.out.println(fire.getTurn());
            System.out.println(attack.getAttackLocations());

            gamePlayer.addAttack(fire);
            attackRepository.save(fire);
            gamePlayerRepository.save(gamePlayer);


        });
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


        }




