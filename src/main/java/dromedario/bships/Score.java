package dromedario.bships;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;


@Entity
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long scoreId;
    private Double score ;
    private Date endDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game game;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="gamePlayer_id")
    private GamePlayer gamePlayer;

    public Score() {}

    public Score(Double score, Date endDate) {
        this.score = score;
        this.endDate = endDate;
    }

    //--------------------------------------------------------------ID
    public long getId(){
        return this.scoreId;
    }
    //--------------------------------------------------------------Date of Game Over
    public void setEndDate(Date gmOvrDate) {
        this.endDate = gmOvrDate;
    }
    public Date getEndDate() {
        return endDate;
    }
    //--------------------------------------------------------------Player
    public void setPlayer(Player player){ this.player  = player; }
    public Player getPlayer() {
        return this.player;
    }
    //--------------------------------------------------------------GamePlayer
    public void setGamePlayer(GamePlayer gamePlayer){ this.gamePlayer  = gamePlayer; }
    public GamePlayer getGamePlayer() {
        return this.gamePlayer;
    }
    //--------------------------------------------------------------Game
    public void setGame(Game game){ this.game  = game; }
    public Game getGame() {
        return this.game;
    }
    //--------------------------------------------------------------Score
    public void setScore(Double score) {
        this.score = score;
    }
    public Double getScore() {
        return this.score;
    }



















}
