package dromedario.bships;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Ship {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private String shipType ;


    @ElementCollection
    @Column(name="ShipLocation")
    private List<String> locations = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="gamePlayer_id")
    private GamePlayer gamePlayer;

    public Ship() {}

    public Ship(String ShipType, List<String> location) {
        this.shipType = ShipType;
        this.locations = location;
    }

//----------------------------------------------------------------ID
    public long getId(){
        return this.id;
    }
//----------------------------------------------------------------GamePlayers
    public void setGamePlayer(GamePlayer gamePlayer){
        this.gamePlayer = gamePlayer;
    }
    public GamePlayer getGamePlayer() {
        return this.gamePlayer;
    }
//----------------------------------------------------------------ShipType
    public void setType(String ShipType) {
        this.shipType = ShipType;
    }
    public String getShipType(){
        return this.shipType;
    }
//----------------------------------------------------------------Location
    public void setLocations(List<String> locations) {
        this.locations = locations;
    }
    public List<String> getLocations(){
        return this.locations;
    }










}