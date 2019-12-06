package dromedario.bships;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class BshipsApplication {

	public static void main(String[] args) {
		SpringApplication.run(BshipsApplication.class, args);

	}

	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository,GameRepository gameRepository,GamePlayerRepository gamePlayerRepository, ShipRepository shipRepository, AttackRepository attackRepository) {
		return (args) -> {
//--------------------------------------------------------------create Players
			Player ply1= new Player("Bobo");
			Player ply2= new Player("Brain");
			Player ply3= new Player("ShinShan");
			Player ply4= new Player("Bonkers");
			Player ply5= new Player("Foghorn");
//--------------------------------------------------------------create Games
			Game gm1= new Game("Game 1",new Date());
			Game gm2= new Game("Game 2",new Date());
			Game gm3= new Game("Game 3",new Date());
			Game gm4= new Game("Game 4",new Date());
//--------------------------------------------------------------create GamePlayers
			GamePlayer gmPly1 = new GamePlayer(ply1, gm1);
			GamePlayer gmPly2 = new GamePlayer(ply2, gm1);
			GamePlayer gmPly3 = new GamePlayer(ply3, gm2);
			GamePlayer gmPly4 = new GamePlayer(ply4, gm2);
			GamePlayer gmPly5 = new GamePlayer(ply1, gm3);
			GamePlayer gmPly6 = new GamePlayer(ply3, gm3);
			GamePlayer gmPly7 = new GamePlayer(ply2, gm4);
			GamePlayer gmPly8 = new GamePlayer(ply4, gm4);

//--------------------------------------------------------------Save Players
			playerRepository.save(ply1);
			playerRepository.save(ply2);
			playerRepository.save(ply3);
			playerRepository.save(ply4);
			playerRepository.save(ply5);
//--------------------------------------------------------------Save Games
			gameRepository.save(gm1);
			gameRepository.save(gm2);
			gameRepository.save(gm3);
			gameRepository.save(gm4);
//--------------------------------------------------------------Save GamePlayers
			gamePlayerRepository.save(gmPly1);
			gamePlayerRepository.save(gmPly2);
			gamePlayerRepository.save(gmPly3);
			gamePlayerRepository.save(gmPly4);
			gamePlayerRepository.save(gmPly5);
			gamePlayerRepository.save(gmPly6);
			gamePlayerRepository.save(gmPly7);
			gamePlayerRepository.save(gmPly8);
//--------------------------------------------------------------Ship Locations GamePlayer 1
			List<String> locSubGmPly1 = new ArrayList<>();
			locSubGmPly1.add("A1");
			locSubGmPly1.add("A2");

			List<String> locDesGmPly1 = new ArrayList<>();
			locDesGmPly1.add("B3");
			locDesGmPly1.add("B4");
			locDesGmPly1.add("B5");

			List<String> locCruGmPly1 = new ArrayList<>();
			locCruGmPly1.add("C6");
			locCruGmPly1.add("C7");
			locCruGmPly1.add("C8");
			locCruGmPly1.add("C9");

			List<String> locBatGmPly1 = new ArrayList<>();
			locBatGmPly1.add("D5");
			locBatGmPly1.add("D4");
			locBatGmPly1.add("D3");
			locBatGmPly1.add("D2");
			locBatGmPly1.add("D1");
//--------------------------------------------------------------Ships Locations GamePlayer 2
			List<String> locSubGmPly2 = new ArrayList<>();
			locSubGmPly2.add("J10");
			locSubGmPly2.add("J09");

			List<String> locDesGmPly2 = new ArrayList<>();
			locDesGmPly2.add("I8");
			locDesGmPly2.add("I7");
			locDesGmPly2.add("I6");

			List<String> locCruGmPly2 = new ArrayList<>();
			locCruGmPly2.add("H5");
			locCruGmPly2.add("H4");
			locCruGmPly2.add("H3");
			locCruGmPly2.add("H2");

			List<String> locBatGmPly2 = new ArrayList<>();
			locBatGmPly2.add("G6");
			locBatGmPly2.add("G7");
			locBatGmPly2.add("G8");
			locBatGmPly2.add("G9");
			locBatGmPly2.add("G10");

//--------------------------------------------------------------create Ships GamePlayer 1
		Ship subGmPly1 = new Ship("Submarine",locSubGmPly1);
		Ship desGmPly1 = new Ship("Destroyer",locDesGmPly1);
		Ship cruGmPly1 = new Ship("Cruise Ship",locCruGmPly1);
		Ship batGmPly1 = new Ship("Battleship",locBatGmPly1);
//--------------------------------------------------------------create Ships GamePlayer 2
		Ship subGmPly2 = new Ship("Submarine",locSubGmPly2);
		Ship desGmPly2 = new Ship("Destroyer",locDesGmPly2);
		Ship cruGmPly2 = new Ship("Cruise Ship",locCruGmPly2);
		Ship batGmPly2 = new Ship("Battleship",locBatGmPly2);
//--------------------------------------------------------------add Ships to GamePlayer 1
			gmPly1.addShip(subGmPly1);
			gmPly1.addShip(desGmPly1);
			gmPly1.addShip(cruGmPly1);
			gmPly1.addShip(batGmPly1);
//--------------------------------------------------------------add Ships to GamePlayer 2
			gmPly2.addShip(subGmPly2);
			gmPly2.addShip(desGmPly2);
			gmPly2.addShip(cruGmPly2);
			gmPly2.addShip(batGmPly2);
//--------------------------------------------------------------save Ships of GamePlayer 1
			shipRepository.save(subGmPly1);
			shipRepository.save(desGmPly1);
			shipRepository.save(cruGmPly1);
			shipRepository.save(batGmPly1);
//--------------------------------------------------------------save Ships of GamePlayer 2
			shipRepository.save(subGmPly2);
			shipRepository.save(desGmPly2);
			shipRepository.save(cruGmPly2);
			shipRepository.save(batGmPly2);
//--------------------------------------------------------------create & save Attacks GamePlayer 1
			List<String> attackLocations1 = new ArrayList<>();
			List<String> attackLocations2 = new ArrayList<>();
			List<String> attackLocations3 = new ArrayList<>();

			attackLocations1.add("A1");
			attackLocations1.add("B2");
			attackLocations1.add("C3");

			attackLocations2.add("D4");
			attackLocations2.add("E5");
			attackLocations2.add("F6");

			attackLocations3.add("G7");
			attackLocations3.add("H8");
			attackLocations3.add("I9");

			Attack attack1 = new Attack(1, attackLocations1);
			Attack attack2 = new Attack(2, attackLocations2);
			Attack attack3 = new Attack(3, attackLocations3);

			gmPly1.addAttack(attack1);
			gmPly1.addAttack(attack2);
			gmPly1.addAttack(attack3);

			attackRepository.save(attack1);
			attackRepository.save(attack2);
			attackRepository.save(attack3);

			gamePlayerRepository.save(gmPly1);

//--------------------------------------------------------------create & save Attacks GamePlayer 2
			List<String> attackLocations4 = new ArrayList<>();
			List<String> attackLocations5 = new ArrayList<>();
			List<String> attackLocations6 = new ArrayList<>();

			attackLocations4.add("A10");
			attackLocations4.add("B9");
			attackLocations4.add("C8");

			attackLocations5.add("D7");
			attackLocations5.add("E6");
			attackLocations5.add("F5");

			attackLocations6.add("G4");
			attackLocations6.add("H3");
			attackLocations6.add("I2");

			Attack attack4 = new Attack(1, attackLocations4);
			Attack attack5 = new Attack(2, attackLocations5);
			Attack attack6 = new Attack(3, attackLocations6);

			gmPly2.addAttack(attack4);
			gmPly2.addAttack(attack5);
			gmPly2.addAttack(attack6);

			attackRepository.save(attack4);
			attackRepository.save(attack5);
			attackRepository.save(attack6);

			gamePlayerRepository.save(gmPly2);


		};
	}




}
