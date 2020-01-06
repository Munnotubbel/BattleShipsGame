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
    Date date,gameStart, turnTimer;



    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayers;

    @OneToMany(mappedBy = "game", fetch = FetchType.EAGER)
    private Set<Score> scores = new HashSet<>();

    public Game() {
    }

    public Game(Date date) {
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

//--------------------------------------------------------------GamePlayers

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }


    //--------------------------------------------------------------Scores
    public void addScore(Score score){
        score.setGame(this);
        scores.add(score);
    }
    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public Set<Score> getScores() {
        return this.scores;
    }

    //--------------------------------------------------------------GameDuration


    public Date getGameStart() {
        return gameStart;
    }

    public void setGameStart(Date gameDuration) {
        this.gameStart = gameDuration;
    }

    //--------------------------------------------------------------TurnTimer


    public Date getTurnTimer() {
        return turnTimer;
    }

    public void setTurnTimer(Date turnTimer) {
        this.turnTimer = turnTimer;
    }
}


