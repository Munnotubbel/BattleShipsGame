package dromedario.bships;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long playerId;
    private String userName;

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayers = new HashSet<>();

    public Player() {
    }

    public Player(String userN) {
        this.userName=userN;
    }

//--------------------------------------------------------------Id
    public long getId() {
        return this.playerId;
    }
//--------------------------------------------------------------UserName
    public String getUserName() {
        return this.userName;
    };

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }
}
