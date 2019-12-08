package dromedario.bships;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Attack {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private Integer turn ;

    @ElementCollection
    @Column(name="AttackLocation")
    private List<String> attackLocations = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="gamePlayer_id")
    private GamePlayer gamePlayer;



    public Attack(){};

    public Attack(Integer turn, List<String> attackLocations) {
        this.attackLocations = attackLocations;
        this.turn = turn;
    }
//--------------------------------------------------------------ID
    public long getId() {
        return id;
    }
//--------------------------------------------------------------Turn
    public Integer getTurn() {
        return turn;
    }
//--------------------------------------------------------------GamePlayers
    public void setGamePlayer(GamePlayer gamePlayer){
        this.gamePlayer  = gamePlayer;
    }
    public GamePlayer getGamePlayer() {
        return this.gamePlayer;
    }
//--------------------------------------------------------------Attack Locations
    public List<String> getAttackLocations(){
        return this.attackLocations;
    }


}
