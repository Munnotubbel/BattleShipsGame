package dromedario.bships;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.*;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long gameId;
    Date date;
    private String gameName;
    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayers;

    public Game() {
    }

    public Game(String gameN, Date date) {
        this.gameName= gameN;
        this.date = date;
    }

//--------------------------------------------------------------ID
    public long getGameId() {
        return this.gameId;
    }

//--------------------------------------------------------------Date
    public Date getDate() {
        return this.date;
    }
//--------------------------------------------------------------GameName
    public String getGameName() {
        return this.gameName;
    }
//--------------------------------------------------------------GamePlayers
      public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

}
