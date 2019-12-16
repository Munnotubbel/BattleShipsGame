package dromedario.bships;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.*;

@Entity
public class GamePlayer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    Date date;
    private Integer turn ;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game game;
    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
    Set<Ship> ships = new HashSet<>();
    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
    Set<Attack> attacks = new HashSet<>();


    public GamePlayer() {
    };

    public GamePlayer(Player ply, Game gm ) {
        this.date = new Date();
        this.game= gm;
        this.player=ply;
        this.turn = 1;
    };

//---------------------------------------------------------------Game
    public Game getGame() {
        return game;
    }
    public void setGame(Game game) {
        this.game = game;
    }
//---------------------------------------------------------------Player
    public Player getPlayer() {
        return this.player;
    }
    public void setPlayer(Player player) {
        this.player = player;
    }
//----------------------------------------------------------------ID
    public long getId() {
        return this.id;
    }
//----------------------------------------------------------------Date
    public Date getDate() {
        return this.date;
    }
//----------------------------------------------------------------Ships
    public void addShip(Ship ship) {
        ship.setGamePlayer(this);
        ships.add(ship);
    }
    public Set<Ship> getShips() {
        return this.ships;
    }
//----------------------------------------------------------------Attacks
    public void addAttack(Attack attack) {
        attack.setGamePlayer(this); 
        attacks.add(attack);
    }
    public Set<Attack> getAttacks() {
        return this.attacks;
    }
    //----------------------------------------------------------------Turn
    public void nextTurn() {
        this.turn++;
    }
    public Integer getTurn() {
        return this.turn;
    }
//----------------------------------------------------------------Score
    public HashMap<String, Object> getGmPlyScore  (Game game){
        return player.getScores().stream()
                .filter(score -> score.getGame().equals(game))
                .map(score -> new HashMap<String, Object>(){{
                    put("rating", score.getScore());
                    put("ratingId", score.getId());
                }})
                .findFirst()
                .orElse(null);
    }


}
