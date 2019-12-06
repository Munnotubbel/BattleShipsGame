package dromedario.bships;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class GamePlayer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game game;
    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
    Set<Ship> ships = new HashSet<>();

    public GamePlayer() {
    };

    public GamePlayer(Player ply, Game gm ) {
        this.date = new Date();
        this.game= gm;
        this.player=ply;
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



}
