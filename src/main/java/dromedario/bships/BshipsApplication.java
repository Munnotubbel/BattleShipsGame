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
			Game gm1= new Game(new Date());
			Game gm2= new Game(new Date());
			Game gm3= new Game(new Date());
			Game gm4= new Game(new Date());
			Game gm5= new Game(new Date());

			gm1.setGameStart(new Date());
			gm1.setTimerSetback(6);
			gm2.setGameStart(new Date());
			gm3.setGameStart(new Date());
			gm4.setGameStart(new Date());

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
			List<Integer> locSubGmPly1 = Arrays.asList(101,102);
			List<Integer> locDesGmPly1 = Arrays.asList(203, 204, 205);
			List<Integer> locCruGmPly1 = Arrays.asList(306, 307, 308, 309);
			List<Integer> locBatGmPly1 = Arrays.asList(401, 402, 403, 404, 405);

//--------------------------------------------------------------Ships Locations GamePlayer 2
			List<Integer> locSubGmPly2 = Arrays.asList(1009, 1010);
			List<Integer> locDesGmPly2 = Arrays.asList(906, 907, 908);
			List<Integer> locCruGmPly2 = Arrays.asList(802, 803, 804, 805);
			List<Integer> locBatGmPly2 = Arrays.asList(706, 707,708,709,710);

//--------------------------------------------------------------create Ships GamePlayer 1
		Ship subGmPly1 = new Ship("Submarine",locSubGmPly1,true);
		Ship desGmPly1 = new Ship("Destroyer",locDesGmPly1,true);
		Ship cruGmPly1 = new Ship("Cruise Ship",locCruGmPly1,true);
		Ship batGmPly1 = new Ship("Battleship",locBatGmPly1,true);

//--------------------------------------------------------------create Ships GamePlayer 2
		Ship subGmPly2 = new Ship("Submarine",locSubGmPly2,true);
		Ship desGmPly2 = new Ship("Destroyer",locDesGmPly2,true);
		Ship cruGmPly2 = new Ship("Cruise Ship",locCruGmPly2,true);
		Ship batGmPly2 = new Ship("Battleship",locBatGmPly2,true);

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
			List<Integer> attackLocations1 = Arrays.asList(1010, 1009, 1008);
			List<Integer> attackLocations2 = Arrays.asList(907, 906,905);
			List<Integer> attackLocations3 = Arrays.asList(804, 803, 802);
			List<Integer> attackLocations4 = Arrays.asList(706, 707,708);
			List<Integer> attackLocations5 = Arrays.asList(609, 610, 604);
//			List<Integer> attackLocations11 = Arrays.asList(101, 205, 601);

			Attack attack1 = new Attack(1, attackLocations1);
			Attack attack2 = new Attack(2, attackLocations2);
			Attack attack3 = new Attack(3, attackLocations3);
			Attack attack4 = new Attack(4, attackLocations4);
			Attack attack5 = new Attack(5, attackLocations5);
//			Attack attack11 = new Attack(6, attackLocations11);

			gmPly1.addAttack(attack1);
			gmPly1.addAttack(attack2);
			gmPly1.addAttack(attack3);
			gmPly1.addAttack(attack4);
			gmPly1.addAttack(attack5);
//			gmPly1.addAttack(attack11);

			attackRepository.save(attack1);
			attackRepository.save(attack2);
			attackRepository.save(attack3);
			attackRepository.save(attack4);
			attackRepository.save(attack5);
//			attackRepository.save(attack11);

			gamePlayerRepository.save(gmPly1);

//--------------------------------------------------------------create & save Attacks GamePlayer 2
			List<Integer> attackLocations6 = Arrays.asList(110, 209, 309);
			List<Integer> attackLocations7 = Arrays.asList(407,506, 605);
			List<Integer> attackLocations8 = Arrays.asList(604,703, 802);
			List<Integer> attackLocations9 = Arrays.asList(1001, 1002, 804);
			List<Integer> attackLocations10 = Arrays.asList(705, 606, 605);

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
//			Score score1 = new Score(1.0,new Date());
//			Score score2 = new Score(0.0,new Date());
			Score score3 = new Score(1.0,new Date());
			Score score4 = new Score(0.0,new Date());
			Score score5 = new Score(0.0,new Date());
			Score score6 = new Score(1.0,new Date());
			Score score7 = new Score(0.0,new Date());
			Score score8 = new Score(1.0,new Date());

//			gm1.addScore(score1);
//			gm1.addScore(score2);
			gm2.addScore(score3);
			gm2.addScore(score4);
			gm3.addScore(score5);
			gm3.addScore(score6);
			gm4.addScore(score7);
			gm4.addScore(score8);


//			ply1.addScore(score1);
//			ply2.addScore(score2);
			ply3.addScore(score3);
			ply4.addScore(score4);
			ply1.addScore(score5);
			ply3.addScore(score6);
			ply2.addScore(score7);
			ply4.addScore(score8);
//			scoreRepository.save(score1);
//			scoreRepository.save(score2);
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
			gmPly3.setScore(score3);
			gmPly4.setScore(score4);
			gmPly3.setScore(score5);
			gmPly4.setScore(score6);
			gmPly3.setScore(score7);
			gmPly4.setScore(score8);
			gamePlayerRepository.save(gmPly3);
			gamePlayerRepository.save(gmPly4);
			gamePlayerRepository.save(gmPly5);
			gamePlayerRepository.save(gmPly6);
			gamePlayerRepository.save(gmPly7);
			gamePlayerRepository.save(gmPly8);

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

					.antMatchers("/api/lookForGame").permitAll()
					.antMatchers("/api/players").permitAll()
					.antMatchers("/api/games").permitAll()
					.antMatchers("/api/game/*").permitAll()
					.antMatchers("/api/ranking").permitAll()
                    .antMatchers("/api/game-view/attacks").hasAuthority("USER")
                    .antMatchers("/api/game-view/ships").hasAuthority("USER")

                    .antMatchers("/api/game-view/**").hasAuthority("USER")
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