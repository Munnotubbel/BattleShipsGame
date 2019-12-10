package dromedario.bships;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;


@SpringBootApplication
public class BshipsApplication {

	public static void main(String[] args) {
		SpringApplication.run(BshipsApplication.class, args);


	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public CommandLineRunner initData(
			PlayerRepository playerRepository,
			GameRepository gameRepository,
			GamePlayerRepository gamePlayerRepository,
			ShipRepository shipRepository,
			AttackRepository attackRepository,
			ScoreRepository scoreRepository) {
		return (args) -> {
//--------------------------------------------------------------create Players
			Player ply1= new Player("Bobo",passwordEncoder().encode("12345"));
			Player ply2= new Player("Brain",passwordEncoder().encode("12345"));
			Player ply3= new Player("ShinShan",passwordEncoder().encode("12345"));
			Player ply4= new Player("Bonkers",passwordEncoder().encode("12345"));
			Player ply5= new Player("Foghorn",passwordEncoder().encode("12345"));
//--------------------------------------------------------------create Games
			Game gm1= new Game("Game 1",new Date());
			Game gm2= new Game("Game 2",new Date());
			Game gm3= new Game("Game 3",new Date());
			Game gm4= new Game("Game 4",new Date());
			Game gm5= new Game("Game 5",new Date());
//--------------------------------------------------------------create GamePlayers
			GamePlayer gmPly1 = new GamePlayer(ply1, gm1);
			GamePlayer gmPly2 = new GamePlayer(ply2, gm1);
			GamePlayer gmPly3 = new GamePlayer(ply3, gm2);
			GamePlayer gmPly4 = new GamePlayer(ply4, gm2);
			GamePlayer gmPly5 = new GamePlayer(ply1, gm3);
			GamePlayer gmPly6 = new GamePlayer(ply3, gm3);
			GamePlayer gmPly7 = new GamePlayer(ply2, gm4);
			GamePlayer gmPly8 = new GamePlayer(ply4, gm4);
			GamePlayer gmPly9 = new GamePlayer(ply5, gm5);
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
			gameRepository.save(gm5);
//--------------------------------------------------------------Save GamePlayers
			gamePlayerRepository.save(gmPly1);
			gamePlayerRepository.save(gmPly2);
			gamePlayerRepository.save(gmPly3);
			gamePlayerRepository.save(gmPly4);
			gamePlayerRepository.save(gmPly5);
			gamePlayerRepository.save(gmPly6);
			gamePlayerRepository.save(gmPly7);
			gamePlayerRepository.save(gmPly8);
			gamePlayerRepository.save(gmPly9);

//--------------------------------------------------------------Ship Locations GamePlayer 1
			List<String> locSubGmPly1 = Arrays.asList("A1","A2");
			List<String> locDesGmPly1 = Arrays.asList("B3", "B4", "B5");
			List<String> locCruGmPly1 = Arrays.asList("C6", "C7", "C8", "C9");
			List<String> locBatGmPly1 = Arrays.asList("D5", "D4", "D3", "D2","D1");

//--------------------------------------------------------------Ships Locations GamePlayer 2
			List<String> locSubGmPly2 = Arrays.asList("J10", "J9");
			List<String> locDesGmPly2 = Arrays.asList("I8", "I7", "I6");
			List<String> locCruGmPly2 = Arrays.asList("H5", "H4", "H3", "H2");
			List<String> locBatGmPly2 = Arrays.asList("G6", "G7","G8","G9","G10");

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
			List<String> attackLocations1 = Arrays.asList("J10", "J9", "I8");
			List<String> attackLocations2 = Arrays.asList("I7", "I6","H5");
			List<String> attackLocations3 = Arrays.asList("H4", "H3", "H2");
			List<String> attackLocations4 = Arrays.asList("G6", "G7","G8");
			List<String> attackLocations5 = Arrays.asList("G9", "G10", "G4");

			Attack attack1 = new Attack(1, attackLocations1);
			Attack attack2 = new Attack(2, attackLocations2);
			Attack attack3 = new Attack(3, attackLocations3);
			Attack attack4 = new Attack(4, attackLocations4);
			Attack attack5 = new Attack(5, attackLocations5);

			gmPly1.addAttack(attack1);
			gmPly1.addAttack(attack2);
			gmPly1.addAttack(attack3);
			gmPly1.addAttack(attack4);
			gmPly1.addAttack(attack5);

			attackRepository.save(attack1);
			attackRepository.save(attack2);
			attackRepository.save(attack3);
			attackRepository.save(attack4);
			attackRepository.save(attack5);

			gamePlayerRepository.save(gmPly1);

//--------------------------------------------------------------create & save Attacks GamePlayer 2
			List<String> attackLocations6 = Arrays.asList("A10", "B9", "C8");
			List<String> attackLocations7 = Arrays.asList("D7", "E6", "F5");
			List<String> attackLocations8 = Arrays.asList("G4", "H3", "I2");
			List<String> attackLocations9 = Arrays.asList("J1", "J2", "H4");
			List<String> attackLocations10 = Arrays.asList("G5", "F6", "E7");

			Attack attack6 = new Attack(1, attackLocations6);
			Attack attack7 = new Attack(2, attackLocations7);
			Attack attack8 = new Attack(3, attackLocations8);
			Attack attack9 = new Attack(4, attackLocations9);
			Attack attack10 = new Attack(5, attackLocations10);

			gmPly2.addAttack(attack6);
			gmPly2.addAttack(attack7);
			gmPly2.addAttack(attack8);
			gmPly2.addAttack(attack9);
			gmPly2.addAttack(attack10);

			attackRepository.save(attack6);
			attackRepository.save(attack7);
			attackRepository.save(attack8);
			attackRepository.save(attack9);
			attackRepository.save(attack10);

			gamePlayerRepository.save(gmPly2);
//--------------------------------------------------------------Winner Winner Chickendinner
			Score score1 = new Score(1.0,new Date());
			Score score2 = new Score(0.0,new Date());
			Score score3 = new Score(1.0,new Date());
			Score score4 = new Score(0.0,new Date());
			Score score5 = new Score(0.0,new Date());
			Score score6 = new Score(1.0,new Date());
			Score score7 = new Score(0.0,new Date());
			Score score8 = new Score(1.0,new Date());

			gm1.addScore(score1);
			gm1.addScore(score2);
			gm2.addScore(score3);
			gm2.addScore(score4);
			gm3.addScore(score5);
			gm3.addScore(score6);
			gm4.addScore(score7);
			gm4.addScore(score8);


			ply1.addScore(score1);
			ply2.addScore(score2);
			ply3.addScore(score3);
			ply4.addScore(score4);
			ply1.addScore(score5);
			ply3.addScore(score6);
			ply2.addScore(score7);
			ply4.addScore(score8);
			scoreRepository.save(score1);
			scoreRepository.save(score2);
			scoreRepository.save(score3);
			scoreRepository.save(score4);
			scoreRepository.save(score5);
			scoreRepository.save(score6);
			scoreRepository.save(score7);
			scoreRepository.save(score8);
			gameRepository.save(gm1);
			gameRepository.save(gm2);
			gameRepository.save(gm3);
			gameRepository.save(gm4);
			playerRepository.save(ply1);
			playerRepository.save(ply2);
			playerRepository.save(ply3);
			playerRepository.save(ply4);


		};
	}

	@Configuration

	class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

		@Autowired
		private PlayerRepository playerRepository;

		@Override
		public void init(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userName-> {
				System.out.println(userName);
				Player player = playerRepository.findByUserName(userName);
				if (player != null) {
					return new User(player.getUserName(), player.getPassword(),
							AuthorityUtils.createAuthorityList("USER"));
				} else {
					throw new UsernameNotFoundException("Unknown user: " + userName);
				}
			});
		}


	}

	@CrossOrigin(origins = "http://localhost:3000")
	@Configuration
	@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)

	class WebSecurityConfig extends WebSecurityConfigurerAdapter {
		@Autowired
		private WebApplicationContext applicationContext;
		private WebSecurityConfiguration webSecurityConfiguration;



		@CrossOrigin(origins = "http://localhost:3000")
		@Override
		protected void configure(HttpSecurity http) throws Exception {

			http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()).and()
					.authorizeRequests()
					.antMatchers("/web/players").permitAll()
					.antMatchers("/web/games").permitAll()
					.antMatchers("/web/ranking").permitAll()
					.antMatchers("/web/game-view/*").hasAuthority("USER")
					.antMatchers("/web/login").permitAll()
					.antMatchers("/web/**").permitAll()
					.antMatchers("/players").permitAll()

					.antMatchers("/api/players").permitAll()
					.antMatchers("/api/games").permitAll()
					.antMatchers("/api/game/*").permitAll()
					.antMatchers("/api/ranking").permitAll()
					.antMatchers("/api/game-view/*").hasAuthority("USER")
					.antMatchers("/api/**").permitAll()
					.antMatchers("/rest/*").permitAll()
					.anyRequest().authenticated()

					.and()
					.formLogin()
					.usernameParameter("userName")
					.passwordParameter("password")
					.loginPage("/api/login")
					.and()
					.logout()
					.logoutUrl("/api/logout");

			http.csrf().disable();
//
			http.exceptionHandling()
			.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
			http.exceptionHandling().authenticationEntryPoint((request, response, authentication) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED));
			http.formLogin().failureHandler((request, response, authentication) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED));
			http.formLogin().successHandler((request, response, authentication) -> clearAuthenticationAttributes(request));
			http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
		}


		private void clearAuthenticationAttributes(HttpServletRequest request) {
			HttpSession session = request.getSession(false);
			if (session != null) {
				session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
			}
		}


	}
}